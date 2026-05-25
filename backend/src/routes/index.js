const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const {
  User,
  DataBundle,
  SmmService,
  Order,
  Transaction,
  LoyaltyHistory,
  DailyReward,
  AffiliateCommission,
  ResellerSetting,
  ApiKey,
  Admin,
} = require("../models");

// Helper: get demo user
const getDemoUser = async () =>
  User.findOne({ where: { userId: "PLUG-DEMO-001" } });

// ==================== HEALTH & STATUS ====================
router.get("/health", async (req, res) => {
  try {
    const { SystemSetting } = require("../models");
    const setting = await SystemSetting.findOne({
      where: { key: "maintenanceMode" },
    });
    res.json({
      success: true,
      maintenanceMode: setting?.value || false,
      message: "PrimeBundle API is running",
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    res.json({ success: true, maintenanceMode: false, message: "Running" });
  }
});

// ==================== DATA BUNDLES ====================
router.get("/data/bundles", async (req, res, next) => {
  try {
    const bundles = await DataBundle.findAll({
      order: [
        ["network", "ASC"],
        ["price", "ASC"],
      ],
    });
    const grouped = {};
    bundles.forEach((b) => {
      const net = b.network;
      if (!grouped[net]) grouped[net] = [];
      grouped[net].push({
        id: b.bundleId,
        network: b.network,
        data: b.data,
        price: b.price,
        points: b.points,
        validity: b.validity,
      });
    });
    res.json({ success: true, data: grouped });
  } catch (err) {
    next(err);
  }
});

router.post("/data/purchase", async (req, res, next) => {
  try {
    const { bundleId, recipient } = req.body;
    const user = await getDemoUser();
    const bundle = await DataBundle.findOne({ where: { bundleId } });
    if (!bundle)
      return res
        .status(404)
        .json({ success: false, message: "Bundle not found" });
    if (user.walletBalance < bundle.price)
      return res
        .status(400)
        .json({ success: false, message: "Insufficient wallet balance" });

    const orderId = "ORD-" + String(Date.now()).slice(-6);
    const refId = "REF-" + String(Date.now()).slice(-6);
    const now = new Date().toISOString().replace("T", " ").substring(0, 16);

    await user.update({
      walletBalance: user.walletBalance - bundle.price,
      loyaltyPoints: user.loyaltyPoints + bundle.points,
      totalOrders: user.totalOrders + 1,
      successfulOrders: user.successfulOrders + 1,
    });

    await Order.create({
      orderId,
      UserId: user.id,
      type: "Data",
      network: bundle.network,
      recipient,
      amount: bundle.price,
      dataAmount: bundle.data,
      status: "successful",
      points: bundle.points,
      date: now,
    });
    await Transaction.create({
      txnId: "TXN-" + Date.now(),
      UserId: user.id,
      type: "debit",
      reference: refId,
      description: `${bundle.network} Data - ${bundle.data}`,
      amount: -bundle.price,
      status: "successful",
      date: now,
    });
    if (bundle.points > 0)
      await LoyaltyHistory.create({
        UserId: user.id,
        type: "earn",
        points: bundle.points,
        description: `${bundle.network} Data ${bundle.data} Purchase`,
        date: now,
      });

    res.json({
      success: true,
      data: {
        orderId,
        amount: bundle.price,
        newBalance: user.walletBalance,
        pointsEarned: bundle.points,
      },
    });
  } catch (err) {
    next(err);
  }
});

// ==================== SMM SERVICES ====================
router.get("/smm/services", async (req, res, next) => {
  try {
    const services = await SmmService.findAll({ order: [["category", "ASC"]] });
    res.json({
      success: true,
      data: services.map((s) => ({
        id: s.serviceId,
        name: s.name,
        category: s.category,
        minOrder: s.minOrder,
        maxOrder: s.maxOrder,
        pricePer1k: s.pricePer1k,
        description: s.description,
        deliveryTime: s.deliveryTime,
      })),
    });
  } catch (err) {
    next(err);
  }
});

router.post("/smm/order", async (req, res, next) => {
  try {
    const { serviceId, link, quantity } = req.body;
    const user = await getDemoUser();
    const service = await SmmService.findOne({ where: { serviceId } });
    if (!service)
      return res
        .status(404)
        .json({ success: false, message: "Service not found" });
    if (quantity < service.minOrder || quantity > service.maxOrder)
      return res.status(400).json({
        success: false,
        message: `Quantity must be ${service.minOrder}-${service.maxOrder}`,
      });

    const cost = (quantity / 1000) * service.pricePer1k;
    if (user.walletBalance < cost)
      return res
        .status(400)
        .json({ success: false, message: "Insufficient wallet balance" });

    const orderId = "ORD-" + String(Date.now()).slice(-6);
    const now = new Date().toISOString().replace("T", " ").substring(0, 16);

    await user.update({
      walletBalance: user.walletBalance - cost,
      totalOrders: user.totalOrders + 1,
    });
    await Order.create({
      orderId,
      UserId: user.id,
      type: "SMM",
      network: service.category,
      recipient: link,
      amount: cost,
      dataAmount: `${(quantity / 1000).toFixed(1)}K ${service.name.split(" ").pop()}`,
      status: "processing",
      points: 0,
      date: now,
    });
    await Transaction.create({
      txnId: "TXN-" + Date.now(),
      UserId: user.id,
      type: "debit",
      reference: "REF-" + Date.now(),
      description: `${service.name} - ${quantity}`,
      amount: -cost,
      status: "successful",
      date: now,
    });

    res.json({
      success: true,
      data: { orderId, cost, newBalance: user.walletBalance },
    });
  } catch (err) {
    next(err);
  }
});

// ==================== ORDERS ====================
router.get("/orders", async (req, res, next) => {
  try {
    const user = await getDemoUser();
    const orders = await Order.findAll({
      where: { UserId: user.id },
      order: [["id", "DESC"]],
    });
    res.json({
      success: true,
      data: orders.map((o) => ({
        id: o.orderId,
        type: o.type,
        network: o.network,
        recipient: o.recipient,
        amount: o.amount,
        dataAmount: o.dataAmount,
        status: o.status,
        points: o.points,
        date: o.date,
      })),
    });
  } catch (err) {
    next(err);
  }
});

router.get("/orders/:id", async (req, res, next) => {
  try {
    const order = await Order.findOne({ where: { orderId: req.params.id } });
    if (!order)
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    res.json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
});

// ==================== WALLET ====================
router.get("/wallet/balance", async (req, res, next) => {
  try {
    const user = await getDemoUser();
    res.json({ success: true, data: { balance: user.walletBalance } });
  } catch (err) {
    next(err);
  }
});

router.post("/wallet/topup", async (req, res, next) => {
  try {
    const { amount, method } = req.body;
    if (!amount || amount <= 0)
      return res
        .status(400)
        .json({ success: false, message: "Invalid amount" });
    const user = await getDemoUser();
    const now = new Date().toISOString().replace("T", " ").substring(0, 16);

    await user.update({
      walletBalance: user.walletBalance + parseFloat(amount),
    });
    await Transaction.create({
      txnId: "TXN-" + Date.now(),
      UserId: user.id,
      type: "credit",
      reference: "REF-" + Date.now(),
      description: `Wallet Top-up via ${method || "MoMo"}`,
      amount: parseFloat(amount),
      status: "successful",
      date: now,
    });

    res.json({
      success: true,
      data: { newBalance: user.walletBalance, amount: parseFloat(amount) },
    });
  } catch (err) {
    next(err);
  }
});

// ==================== PAYSTACK PAYMENT ====================
const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

// Get Paystack public key for frontend
router.get("/paystack/config", (req, res) => {
  res.json({
    success: true,
    data: { publicKey: process.env.PAYSTACK_PUBLIC_KEY },
  });
});

// Initialize Paystack transaction
router.post("/paystack/initialize", async (req, res, next) => {
  try {
    const { amount } = req.body;
    if (!amount || amount < 1)
      return res
        .status(400)
        .json({ success: false, message: "Minimum top-up is ₵1" });

    const user = await getDemoUser();
    const koboAmount = Math.round(parseFloat(amount) * 100); // Paystack expects amount in kobo (for GHS it's pesewas)
    const reference = "PSG-" + Date.now() + "-" + uuidv4().substring(0, 8);

    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email: user.email,
        amount: koboAmount,
        reference,
        metadata: {
          userId: user.userId,
          custom_fields: [
            {
              display_name: "User ID",
              variable_name: "user_id",
              value: user.userId,
            },
          ],
        },
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
          "Content-Type": "application/json",
        },
      },
    );

    res.json({
      success: true,
      data: {
        authorizationUrl: response.data.data.authorization_url,
        reference: response.data.data.reference,
        accessCode: response.data.data.access_code,
      },
    });
  } catch (err) {
    console.error(
      "Paystack initialize error:",
      err.response?.data || err.message,
    );
    next(err);
  }
});

// Verify Paystack payment and credit wallet
router.post("/paystack/verify", async (req, res, next) => {
  try {
    const { reference } = req.body;
    if (!reference)
      return res
        .status(400)
        .json({ success: false, message: "Reference is required" });

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
        },
      },
    );

    const { status, amount, reference: payRef } = response.data.data;

    if (status === "success") {
      const ghsAmount = amount / 100; // Convert from pesewas to GHS
      const user = await getDemoUser();
      const now = new Date().toISOString().replace("T", " ").substring(0, 16);

      await user.update({
        walletBalance: user.walletBalance + ghsAmount,
      });

      await Transaction.create({
        txnId: "TXN-" + Date.now(),
        UserId: user.id,
        type: "credit",
        reference: payRef,
        description: "Wallet Top-up via Paystack",
        amount: ghsAmount,
        status: "successful",
        date: now,
      });

      res.json({
        success: true,
        data: {
          amount: ghsAmount,
          newBalance: user.walletBalance,
          reference: payRef,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Payment verification failed",
        data: { status },
      });
    }
  } catch (err) {
    console.error("Paystack verify error:", err.response?.data || err.message);
    next(err);
  }
});

// ==================== LOYALTY ====================
router.get("/loyalty/history", async (req, res, next) => {
  try {
    const user = await getDemoUser();
    const history = await LoyaltyHistory.findAll({
      where: { UserId: user.id },
      order: [["id", "DESC"]],
    });
    res.json({ success: true, data: history });
  } catch (err) {
    next(err);
  }
});

router.post("/loyalty/redeem", async (req, res, next) => {
  try {
    const { points } = req.body;
    const user = await getDemoUser();
    if (points > user.loyaltyPoints)
      return res
        .status(400)
        .json({ success: false, message: "Insufficient points" });
    const amount = (points * 0.055).toFixed(2);
    const now = new Date().toISOString().replace("T", " ").substring(0, 16);

    await user.update({
      loyaltyPoints: user.loyaltyPoints - points,
      walletBalance: user.walletBalance + parseFloat(amount),
    });
    await LoyaltyHistory.create({
      UserId: user.id,
      type: "redeem",
      points: -points,
      description: "Points redeemed to wallet",
      date: now,
    });
    await Transaction.create({
      txnId: "TXN-" + Date.now(),
      UserId: user.id,
      type: "credit",
      reference: "REF-" + Date.now(),
      description: "Loyalty points redemption",
      amount: parseFloat(amount),
      status: "successful",
      date: now,
    });

    res.json({
      success: true,
      data: {
        redeemed: points,
        amount,
        newBalance: user.walletBalance,
        remainingPoints: user.loyaltyPoints,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.post("/loyalty/daily-claim", async (req, res, next) => {
  try {
    const { day } = req.body;
    const user = await getDemoUser();
    const reward = await DailyReward.findOne({
      where: { UserId: user.id, day },
    });
    if (!reward)
      return res
        .status(404)
        .json({ success: false, message: "Reward not found" });
    if (reward.claimed)
      return res
        .status(400)
        .json({ success: false, message: "Already claimed" });

    const now = new Date().toISOString().replace("T", " ").substring(0, 16);
    await reward.update({ claimed: true });
    await user.update({ loyaltyPoints: user.loyaltyPoints + reward.points });
    await LoyaltyHistory.create({
      UserId: user.id,
      type: "bonus",
      points: reward.points,
      description: `Day ${day} daily reward`,
      date: now,
    });

    res.json({
      success: true,
      data: { day, points: reward.points, totalPoints: user.loyaltyPoints },
    });
  } catch (err) {
    next(err);
  }
});

// ==================== AFFILIATE ====================
router.get("/affiliate/commissions", async (req, res, next) => {
  try {
    const user = await getDemoUser();
    const commissions = await AffiliateCommission.findAll({
      where: { UserId: user.id },
      order: [["id", "DESC"]],
    });
    res.json({ success: true, data: commissions });
  } catch (err) {
    next(err);
  }
});

// ==================== TRANSACTIONS ====================
router.get("/transactions", async (req, res, next) => {
  try {
    const user = await getDemoUser();
    const transactions = await Transaction.findAll({
      where: { UserId: user.id },
      order: [["id", "DESC"]],
    });
    res.json({
      success: true,
      data: transactions.map((t) => ({
        id: t.txnId,
        type: t.type,
        reference: t.reference,
        description: t.description,
        amount: t.amount,
        status: t.status,
        date: t.date,
      })),
    });
  } catch (err) {
    next(err);
  }
});

// ==================== RESELLER ====================
router.get("/reseller/settings", async (req, res, next) => {
  try {
    const user = await getDemoUser();
    let settings = await ResellerSetting.findOne({
      where: { UserId: user.id },
    });
    if (!settings)
      settings = await ResellerSetting.create({
        UserId: user.id,
        storeName: "",
        markup: 10,
        isActive: false,
      });
    res.json({ success: true, data: settings });
  } catch (err) {
    next(err);
  }
});

router.put("/reseller/settings", async (req, res, next) => {
  try {
    const user = await getDemoUser();
    const { storeName, storeDescription, markup, isActive, theme } = req.body;
    let settings = await ResellerSetting.findOne({
      where: { UserId: user.id },
    });
    if (!settings) settings = await ResellerSetting.create({ UserId: user.id });
    await settings.update({
      storeName,
      storeDescription,
      markup,
      isActive,
      theme,
    });
    res.json({ success: true, data: settings });
  } catch (err) {
    next(err);
  }
});

// ==================== API PORTAL ====================
router.get("/portal/keys", async (req, res, next) => {
  try {
    const user = await getDemoUser();
    const keys = await ApiKey.findAll({ where: { UserId: user.id } });
    res.json({
      success: true,
      data: keys.map((k) => ({
        id: k.id,
        key: k.key,
        name: k.name,
        isActive: k.isActive,
        lastUsed: k.lastUsed,
        requestCount: k.requestCount,
      })),
    });
  } catch (err) {
    next(err);
  }
});

router.post("/portal/keys", async (req, res, next) => {
  try {
    const user = await getDemoUser();
    const { name } = req.body;
    const key = await ApiKey.create({
      UserId: user.id,
      key: "tpk_" + uuidv4().replace(/-/g, "").substring(0, 32),
      name: name || "New API Key",
    });
    res.json({ success: true, data: key });
  } catch (err) {
    next(err);
  }
});

// ==================== USER PROFILE ====================
router.get("/user/profile", async (req, res, next) => {
  try {
    const user = await getDemoUser();
    res.json({ success: true, data: user });
  } catch (err) {
    next(err);
  }
});

// ==================== ADMIN ROUTES ====================
const { SystemSetting } = require("../models");

router.get("/admin/settings/system", async (req, res, next) => {
  try {
    let setting = await SystemSetting.findOne({
      where: { key: "maintenanceMode" },
    });
    if (!setting) {
      setting = await SystemSetting.create({
        key: "maintenanceMode",
        value: false,
      });
    }
    res.json({ success: true, data: { maintenanceMode: setting.value } });
  } catch (err) {
    next(err);
  }
});

router.put("/admin/settings/system", async (req, res, next) => {
  try {
    const { maintenanceMode } = req.body;
    let setting = await SystemSetting.findOne({
      where: { key: "maintenanceMode" },
    });
    if (!setting) {
      setting = await SystemSetting.create({
        key: "maintenanceMode",
        value: !!maintenanceMode,
      });
    } else {
      await setting.update({ value: !!maintenanceMode });
    }
    res.json({ success: true, data: { maintenanceMode: setting.value } });
  } catch (err) {
    next(err);
  }
});

// ---- Store Settings (General, Notifications, Security) ----
router.get("/admin/settings/store", async (req, res, next) => {
  try {
    let setting = await SystemSetting.findOne({
      where: { key: "storeSettings" },
    });
    if (!setting) {
      const defaults = {
        storeName: "PrimeBundle",
        storeUrl: "https://primebundle.com",
        currency: "GHS (₵)",
        adminEmail: "admin@primebundle.com",
        notifications: {
          newOrders: true,
          failedTransactions: true,
          lowBalance: false,
          weeklyReports: true,
        },
      };
      setting = await SystemSetting.create({
        key: "storeSettings",
        value: defaults,
      });
    }
    res.json({ success: true, data: setting.value });
  } catch (err) {
    next(err);
  }
});

router.put("/admin/settings/store", async (req, res, next) => {
  try {
    const {
      storeName,
      storeUrl,
      currency,
      adminEmail,
      password,
      notifications,
    } = req.body;

    // Input validation
    const errors = [];
    if (
      !storeName ||
      typeof storeName !== "string" ||
      storeName.trim().length === 0
    ) {
      errors.push("Store name is required");
    } else if (storeName.trim().length > 100) {
      errors.push("Store name must be 100 characters or less");
    }
    if (
      storeUrl &&
      typeof storeUrl === "string" &&
      storeUrl.trim().length > 0
    ) {
      try {
        new URL(storeUrl.trim());
      } catch {
        errors.push("Store URL is not a valid URL");
      }
    }
    if (
      !adminEmail ||
      typeof adminEmail !== "string" ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminEmail.trim())
    ) {
      errors.push("A valid admin email is required");
    }
    if (
      password &&
      typeof password === "string" &&
      password.length > 0 &&
      password.length < 6
    ) {
      errors.push("Password must be at least 6 characters");
    }
    if (errors.length > 0) {
      return res
        .status(422)
        .json({ success: false, message: errors.join(". "), errors });
    }

    let setting = await SystemSetting.findOne({
      where: { key: "storeSettings" },
    });
    const newValue = {
      storeName: storeName.trim(),
      storeUrl: storeUrl ? storeUrl.trim() : "",
      currency: currency || "GHS (₵)",
      adminEmail: adminEmail.trim(),
      notifications: notifications || {
        newOrders: true,
        failedTransactions: true,
        lowBalance: false,
        weeklyReports: true,
      },
    };
    if (!setting) {
      setting = await SystemSetting.create({
        key: "storeSettings",
        value: newValue,
      });
    } else {
      await setting.update({ value: newValue });
    }

    // Update admin password if provided - find by current store settings email or first admin
    if (
      password &&
      typeof password === "string" &&
      password.trim().length > 0
    ) {
      // Try to find admin by the previous email stored in settings, or by the new email
      const previousEmail = setting.value?.adminEmail || adminEmail;
      let admin = await Admin.findOne({
        where: { email: previousEmail.trim() },
      });
      if (!admin) {
        // Fallback: get the first super admin
        admin = await Admin.findOne({ where: { role: "Super Admin" } });
      }
      if (admin) {
        await admin.update({
          password: password.trim(),
          email: adminEmail.trim(),
        });
      }
    } else if (adminEmail) {
      // Even without password change, update admin email if it changed
      const previousEmail = setting.value?.adminEmail;
      if (previousEmail && previousEmail !== adminEmail.trim()) {
        const admin = await Admin.findOne({ where: { email: previousEmail } });
        if (admin) {
          await admin.update({ email: adminEmail.trim() });
        }
      }
    }

    res.json({
      success: true,
      data: setting.value,
      message: "Settings saved successfully",
    });
  } catch (err) {
    next(err);
  }
});

router.post("/admin/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ where: { email, password } });
    if (!admin)
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    await admin.update({
      lastLogin: new Date().toISOString().replace("T", " ").substring(0, 16),
    });
    res.json({
      success: true,
      data: {
        name: admin.name,
        email: admin.email,
        role: admin.role,
        avatar: admin.avatar,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.get("/admin/stats", async (req, res, next) => {
  try {
    const totalUsers = await User.count();
    const totalOrders = await Order.count();
    const totalRevenue = await Order.sum("amount", {
      where: { status: "successful" },
    });
    const pendingOrders = await Order.count({
      where: { status: "processing" },
    });
    res.json({
      success: true,
      data: {
        totalUsers,
        totalOrders,
        totalRevenue: totalRevenue || 0,
        pendingOrders,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.get("/admin/orders", async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      order: [["id", "DESC"]],
      include: [{ model: User, attributes: ["name", "email", "userId"] }],
    });
    res.json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
});

router.get("/admin/users", async (req, res, next) => {
  try {
    const users = await User.findAll({ order: [["id", "ASC"]] });
    res.json({ success: true, data: users });
  } catch (err) {
    next(err);
  }
});

router.get("/admin/transactions", async (req, res, next) => {
  try {
    const transactions = await Transaction.findAll({
      order: [["id", "DESC"]],
      include: [{ model: User, attributes: ["name", "email"] }],
    });
    res.json({ success: true, data: transactions });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
