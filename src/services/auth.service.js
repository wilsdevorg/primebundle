const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models");

class AuthService {
  // =========================
  // REGISTER USER
  // =========================
  static async register({ name, email, password, phone }) {
    const existing = await User.findOne({ where: { email } });

    if (existing) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12); // 🔥 stronger hashing

    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      userId: "USR-" + Date.now(),
      role: "user",
      tokenVersion: 0, // 🔥 enables forced logout later
      joinDate: new Date().toISOString(),
    });

    return this.sanitizeUser(user);
  }

  // =========================
  // LOGIN USER
  // =========================
  static async login({ email, password }) {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Invalid credentials");
    }

    const token = this.signToken(user);

    return {
      user: this.sanitizeUser(user),
      token,
    };
  }

  // =========================
  // SIGN JWT TOKEN (HARDENED)
  // =========================
  static signToken(user) {
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role,
        tokenVersion: user.tokenVersion || 0, // 🔥 security control
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
        issuer: "primebundle-api",
        audience: "primebundle-client",
      },
    );
  }

  // =========================
  // VERIFY TOKEN
  // =========================
  static verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET, {
        issuer: "primebundle-api",
        audience: "primebundle-client",
      });
    } catch (err) {
      throw new Error("Invalid or expired token");
    }
  }

  // =========================
  // GET USER FROM TOKEN
  // =========================
  static async getUserFromToken(token) {
    const decoded = this.verifyToken(token);

    const user = await User.findByPk(decoded.id);

    if (!user) {
      throw new Error("User not found");
    }

    // 🔥 token version check (prevents reused tokens after logout-all)
    if (user.tokenVersion !== decoded.tokenVersion) {
      throw new Error("Token expired (session invalidated)");
    }

    return this.sanitizeUser(user);
  }

  // =========================
  // SANITIZE USER OUTPUT
  // =========================
  static sanitizeUser(user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      userId: user.userId,
      walletBalance: user.walletBalance,
      loyaltyPoints: user.loyaltyPoints,
      createdAt: user.createdAt,
    };
  }

  // =========================
  // FORCE LOGOUT ALL SESSIONS
  // =========================
  static async revokeTokens(userId) {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error("User not found");
    }

    user.tokenVersion += 1; // 🔥 invalidates all old tokens
    await user.save();

    return true;
  }
}

module.exports = AuthService;
