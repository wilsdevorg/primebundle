const {
  sequelize,
  User,
  DataBundle,
  SmmService,
  Order,
  Transaction,
  LoyaltyHistory,
  DailyReward,
  AffiliateCommission,
  Admin,
  ApiKey,
  ResellerSetting,
} = require("../models");
const { v4: uuidv4 } = require("uuid");

const seed = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("📦 Database synced (tables recreated)");

    // Seed Admin
    await Admin.create({
      name: "Admin User",
      email: "admin@primebundle.com",
      password: "admin123",
      role: "Super Admin",
      avatar: "AU",
      lastLogin: "2025-05-20 22:30",
    });
    console.log("✅ Admin seeded");

    // Seed Demo User
    const user = await User.create({
      userId: "PLUG-DEMO-001",
      name: "Demo User",
      email: "demo@primebundle.com",
      phone: "0201234567",
      walletBalance: 0.9,
      loyaltyPoints: 555,
      totalOrders: 44,
      successfulOrders: 43,
      joinDate: "January 2025",
      tier: "Gold",
      avatar: "DU",
      referralCode: "PLUG-DEMO-001",
      affiliateBalance: 0.0,
      totalReferrals: 0,
      totalEarned: 0.0,
    });
    console.log("✅ Demo user seeded");

    // Seed Data Bundles
    const bundles = [
      {
        bundleId: "mtn-1",
        network: "MTN",
        data: "1 GB",
        price: 4.7,
        points: 5,
        validity: "1 Day",
      },
      {
        bundleId: "mtn-2",
        network: "MTN",
        data: "2 GB",
        price: 9.9,
        points: 10,
        validity: "2 Days",
      },
      {
        bundleId: "mtn-3",
        network: "MTN",
        data: "3 GB",
        price: 14.5,
        points: 20,
        validity: "3 Days",
      },
      {
        bundleId: "mtn-4",
        network: "MTN",
        data: "5 GB",
        price: 22.0,
        points: 30,
        validity: "7 Days",
      },
      {
        bundleId: "mtn-5",
        network: "MTN",
        data: "10 GB",
        price: 40.0,
        points: 50,
        validity: "30 Days",
      },
      {
        bundleId: "mtn-6",
        network: "MTN",
        data: "20 GB",
        price: 75.0,
        points: 100,
        validity: "30 Days",
      },
      {
        bundleId: "mtn-exp-1",
        network: "MTN Express",
        data: "1 GB",
        price: 4.5,
        points: 5,
        validity: "1 Day",
      },
      {
        bundleId: "mtn-exp-2",
        network: "MTN Express",
        data: "2 GB",
        price: 9.5,
        points: 10,
        validity: "2 Days",
      },
      {
        bundleId: "mtn-exp-3",
        network: "MTN Express",
        data: "5 GB",
        price: 21.0,
        points: 25,
        validity: "7 Days",
      },
      {
        bundleId: "at-1",
        network: "AirtelTigo",
        data: "1 GB",
        price: 4.2,
        points: 5,
        validity: "1 Day",
      },
      {
        bundleId: "at-2",
        network: "AirtelTigo",
        data: "2 GB",
        price: 8.9,
        points: 10,
        validity: "2 Days",
      },
      {
        bundleId: "at-3",
        network: "AirtelTigo",
        data: "3 GB",
        price: 13.0,
        points: 15,
        validity: "3 Days",
      },
      {
        bundleId: "at-4",
        network: "AirtelTigo",
        data: "5 GB",
        price: 20.0,
        points: 25,
        validity: "7 Days",
      },
      {
        bundleId: "tel-1",
        network: "Telecel",
        data: "1 GB",
        price: 4.0,
        points: 5,
        validity: "1 Day",
      },
      {
        bundleId: "tel-2",
        network: "Telecel",
        data: "2 GB",
        price: 8.5,
        points: 10,
        validity: "2 Days",
      },
      {
        bundleId: "tel-3",
        network: "Telecel",
        data: "5 GB",
        price: 19.0,
        points: 25,
        validity: "7 Days",
      },
      {
        bundleId: "tel-4",
        network: "Telecel",
        data: "10 GB",
        price: 35.0,
        points: 45,
        validity: "30 Days",
      },
    ];
    await DataBundle.bulkCreate(bundles);
    console.log("✅ Data bundles seeded");

    // Seed SMM Services
    const smmServices = [
      {
        serviceId: "smm-1",
        name: "YouTube Subscribers",
        category: "YouTube",
        minOrder: 100,
        maxOrder: 10000,
        pricePer1k: 15.0,
        description: "High quality YouTube subscribers",
        deliveryTime: "1-3 days",
      },
      {
        serviceId: "smm-2",
        name: "YouTube Views",
        category: "YouTube",
        minOrder: 500,
        maxOrder: 100000,
        pricePer1k: 2.5,
        description: "Real YouTube views",
        deliveryTime: "1-2 days",
      },
      {
        serviceId: "smm-3",
        name: "YouTube Likes",
        category: "YouTube",
        minOrder: 50,
        maxOrder: 50000,
        pricePer1k: 5.0,
        description: "YouTube video likes",
        deliveryTime: "1-2 days",
      },
      {
        serviceId: "smm-4",
        name: "Instagram Followers",
        category: "Instagram",
        minOrder: 100,
        maxOrder: 50000,
        pricePer1k: 8.0,
        description: "Quality Instagram followers",
        deliveryTime: "1-3 days",
      },
      {
        serviceId: "smm-5",
        name: "Instagram Likes",
        category: "Instagram",
        minOrder: 50,
        maxOrder: 100000,
        pricePer1k: 3.0,
        description: "Instagram post likes",
        deliveryTime: "0-6 hours",
      },
      {
        serviceId: "smm-6",
        name: "TikTok Followers",
        category: "TikTok",
        minOrder: 100,
        maxOrder: 50000,
        pricePer1k: 10.0,
        description: "TikTok profile followers",
        deliveryTime: "1-3 days",
      },
      {
        serviceId: "smm-7",
        name: "TikTok Views",
        category: "TikTok",
        minOrder: 500,
        maxOrder: 1000000,
        pricePer1k: 1.5,
        description: "TikTok video views",
        deliveryTime: "0-12 hours",
      },
      {
        serviceId: "smm-8",
        name: "Twitter Followers",
        category: "Twitter",
        minOrder: 100,
        maxOrder: 25000,
        pricePer1k: 12.0,
        description: "Twitter/X followers",
        deliveryTime: "1-5 days",
      },
      {
        serviceId: "smm-9",
        name: "Twitter Likes",
        category: "Twitter",
        minOrder: 50,
        maxOrder: 50000,
        pricePer1k: 4.0,
        description: "Twitter post likes",
        deliveryTime: "0-12 hours",
      },
      {
        serviceId: "smm-10",
        name: "Facebook Page Likes",
        category: "Facebook",
        minOrder: 100,
        maxOrder: 50000,
        pricePer1k: 6.0,
        description: "Facebook page likes",
        deliveryTime: "1-3 days",
      },
      {
        serviceId: "smm-11",
        name: "Telegram Members",
        category: "Telegram",
        minOrder: 100,
        maxOrder: 100000,
        pricePer1k: 5.0,
        description: "Telegram group/channel members",
        deliveryTime: "1-5 days",
      },
      {
        serviceId: "smm-12",
        name: "Spotify Plays",
        category: "Spotify",
        minOrder: 1000,
        maxOrder: 1000000,
        pricePer1k: 3.0,
        description: "Spotify track plays",
        deliveryTime: "1-3 days",
      },
    ];
    await SmmService.bulkCreate(smmServices);
    console.log("✅ SMM services seeded");

    // Seed Orders
    const orders = [
      {
        orderId: "ORD-001",
        UserId: user.id,
        type: "Data",
        network: "MTN",
        recipient: "024XXXXXX1",
        amount: 14.5,
        dataAmount: "3 GB",
        status: "successful",
        points: 20,
        date: "2025-05-18 14:30",
      },
      {
        orderId: "ORD-002",
        UserId: user.id,
        type: "Data",
        network: "MTN",
        recipient: "024XXXXXX2",
        amount: 9.9,
        dataAmount: "2 GB",
        status: "successful",
        points: 10,
        date: "2025-05-17 09:15",
      },
      {
        orderId: "ORD-003",
        UserId: user.id,
        type: "Data",
        network: "AirtelTigo",
        recipient: "027XXXXXX3",
        amount: 4.2,
        dataAmount: "1 GB",
        status: "successful",
        points: 5,
        date: "2025-05-16 18:45",
      },
      {
        orderId: "ORD-004",
        UserId: user.id,
        type: "Data",
        network: "Telecel",
        recipient: "050XXXXXX4",
        amount: 19.0,
        dataAmount: "5 GB",
        status: "processing",
        points: 25,
        date: "2025-05-19 08:00",
      },
      {
        orderId: "ORD-005",
        UserId: user.id,
        type: "SMM",
        network: "Instagram",
        recipient: "@user1",
        amount: 8.0,
        dataAmount: "1K Followers",
        status: "successful",
        points: 0,
        date: "2025-05-15 12:00",
      },
      {
        orderId: "ORD-006",
        UserId: user.id,
        type: "Data",
        network: "MTN",
        recipient: "024XXXXXX5",
        amount: 4.7,
        dataAmount: "1 GB",
        status: "successful",
        points: 5,
        date: "2025-05-14 16:20",
      },
      {
        orderId: "ORD-007",
        UserId: user.id,
        type: "Data",
        network: "MTN Express",
        recipient: "024XXXXXX6",
        amount: 9.5,
        dataAmount: "2 GB",
        status: "failed",
        points: 0,
        date: "2025-05-13 10:30",
      },
      {
        orderId: "ORD-008",
        UserId: user.id,
        type: "Data",
        network: "AirtelTigo",
        recipient: "027XXXXXX7",
        amount: 20.0,
        dataAmount: "5 GB",
        status: "successful",
        points: 25,
        date: "2025-05-12 07:45",
      },
      {
        orderId: "ORD-009",
        UserId: user.id,
        type: "SMM",
        network: "YouTube",
        recipient: "@channel1",
        amount: 15.0,
        dataAmount: "1K Subscribers",
        status: "processing",
        points: 0,
        date: "2025-05-19 06:00",
      },
      {
        orderId: "ORD-010",
        UserId: user.id,
        type: "Data",
        network: "Telecel",
        recipient: "050XXXXXX8",
        amount: 35.0,
        dataAmount: "10 GB",
        status: "successful",
        points: 45,
        date: "2025-05-11 14:10",
      },
    ];
    await Order.bulkCreate(orders);
    console.log("✅ Orders seeded");

    // Seed Transactions
    const transactions = [
      {
        txnId: "TXN-001",
        UserId: user.id,
        type: "credit",
        reference: "REF-001",
        description: "Reseller profit",
        amount: 1.2,
        status: "pending",
        date: "2025-05-19 10:00",
      },
      {
        txnId: "TXN-002",
        UserId: user.id,
        type: "debit",
        reference: "REF-002",
        description: "MTN Data Purchase - 3GB",
        amount: -14.5,
        status: "successful",
        date: "2025-05-18 14:30",
      },
      {
        txnId: "TXN-003",
        UserId: user.id,
        type: "debit",
        reference: "REF-003",
        description: "MTN Data Purchase - 2GB",
        amount: -9.9,
        status: "successful",
        date: "2025-05-17 09:15",
      },
      {
        txnId: "TXN-004",
        UserId: user.id,
        type: "credit",
        reference: "REF-004",
        description: "Wallet Top-up via Paystack",
        amount: 20.0,
        status: "successful",
        date: "2025-05-16 12:00",
      },
      {
        txnId: "TXN-005",
        UserId: user.id,
        type: "debit",
        reference: "REF-005",
        description: "AirtelTigo Data - 1GB",
        amount: -4.2,
        status: "successful",
        date: "2025-05-16 18:45",
      },
      {
        txnId: "TXN-006",
        UserId: user.id,
        type: "credit",
        reference: "REF-006",
        description: "Loyalty points redemption",
        amount: 5.55,
        status: "successful",
        date: "2025-05-15 08:30",
      },
      {
        txnId: "TXN-007",
        UserId: user.id,
        type: "debit",
        reference: "REF-007",
        description: "Telecel Data - 5GB",
        amount: -19.0,
        status: "pending",
        date: "2025-05-19 08:00",
      },
      {
        txnId: "TXN-008",
        UserId: user.id,
        type: "credit",
        reference: "REF-008",
        description: "Wallet Top-up via MoMo",
        amount: 50.0,
        status: "successful",
        date: "2025-05-14 09:00",
      },
      {
        txnId: "TXN-009",
        UserId: user.id,
        type: "debit",
        reference: "REF-009",
        description: "Instagram Followers - 1K",
        amount: -8.0,
        status: "successful",
        date: "2025-05-15 12:00",
      },
      {
        txnId: "TXN-010",
        UserId: user.id,
        type: "debit",
        reference: "REF-010",
        description: "MTN Data - 1GB",
        amount: -4.7,
        status: "successful",
        date: "2025-05-14 16:20",
      },
    ];
    await Transaction.bulkCreate(transactions);
    console.log("✅ Transactions seeded");

    // Seed Loyalty History
    const loyaltyHistory = [
      {
        UserId: user.id,
        type: "earn",
        points: 20,
        description: "MTN Data 3GB Purchase",
        date: "2025-05-18 14:30",
      },
      {
        UserId: user.id,
        type: "earn",
        points: 10,
        description: "MTN Data 2GB Purchase",
        date: "2025-05-17 09:15",
      },
      {
        UserId: user.id,
        type: "earn",
        points: 5,
        description: "AirtelTigo Data 1GB Purchase",
        date: "2025-05-16 18:45",
      },
      {
        UserId: user.id,
        type: "redeem",
        points: -100,
        description: "Points redeemed to wallet",
        date: "2025-05-15 08:30",
      },
      {
        UserId: user.id,
        type: "earn",
        points: 25,
        description: "Telecel Data 5GB Purchase",
        date: "2025-05-12 07:45",
      },
      {
        UserId: user.id,
        type: "earn",
        points: 5,
        description: "MTN Data 1GB Purchase",
        date: "2025-05-14 16:20",
      },
      {
        UserId: user.id,
        type: "earn",
        points: 45,
        description: "Telecel Data 10GB Purchase",
        date: "2025-05-11 14:10",
      },
      {
        UserId: user.id,
        type: "earn",
        points: 25,
        description: "AirtelTigo Data 5GB Purchase",
        date: "2025-05-10 09:00",
      },
      {
        UserId: user.id,
        type: "bonus",
        points: 50,
        description: "Weekly reward bonus",
        date: "2025-05-09 00:00",
      },
      {
        UserId: user.id,
        type: "earn",
        points: 30,
        description: "MTN Data 5GB Purchase",
        date: "2025-05-08 11:30",
      },
    ];
    await LoyaltyHistory.bulkCreate(loyaltyHistory);
    console.log("✅ Loyalty history seeded");

    // Seed Daily Rewards
    const dailyRewards = [
      { UserId: user.id, day: 1, points: 5, claimed: true },
      { UserId: user.id, day: 2, points: 10, claimed: true },
      { UserId: user.id, day: 3, points: 15, claimed: false },
      { UserId: user.id, day: 4, points: 20, claimed: false },
      { UserId: user.id, day: 5, points: 30, claimed: false },
      { UserId: user.id, day: 6, points: 40, claimed: false },
      { UserId: user.id, day: 7, points: 50, claimed: false },
    ];
    await DailyReward.bulkCreate(dailyRewards);
    console.log("✅ Daily rewards seeded");

    // Seed Affiliate Commissions
    const commissions = [
      {
        UserId: user.id,
        referredUserId: "PLUG-USR-002",
        level: 1,
        amount: 2.5,
        date: "2025-05-10 14:00",
      },
      {
        UserId: user.id,
        referredUserId: "PLUG-USR-003",
        level: 1,
        amount: 1.8,
        date: "2025-05-08 09:30",
      },
      {
        UserId: user.id,
        referredUserId: "PLUG-USR-004",
        level: 2,
        amount: 0.75,
        date: "2025-05-05 16:20",
      },
    ];
    await AffiliateCommission.bulkCreate(commissions);
    console.log("✅ Affiliate commissions seeded");

    // Seed API Key
    await ApiKey.create({
      UserId: user.id,
      key: "tpk_" + uuidv4().replace(/-/g, "").substring(0, 32),
      name: "Default API Key",
      isActive: true,
      requestCount: 0,
    });
    console.log("✅ API key seeded");

    console.log("\n🎉 Database seeded successfully!");
    console.log("👤 Admin: admin@primebundle.com / admin123");
    console.log("👤 Demo User: demo@primebundle.com");

    await sequelize.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
};

seed();
