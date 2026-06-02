const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { User } = require("../models");

class AuthService {
  // =========================
  // REGISTER USER
  // =========================
  static async register({ name, phone, password }) {
    const existing = await User.findOne({
      where: { phone },
    });

    if (existing) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      phone,
      password: hashedPassword,
      userId: `USR-${Date.now()}`,
      role: "user",
      tokenVersion: 0,
      walletBalance: 0,
      loyaltyPoints: 0,
    });

    return this.sanitizeUser(user);
  }

  // =========================
  // LOGIN USER
  // =========================
  static async login({ phone, password }) {
    const user = await User.findOne({
      where: { phone },
    });

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
  // SIGN JWT TOKEN
  // =========================
  static signToken(user) {
    return jwt.sign(
      {
        id: user.id,
        role: user.role,
        tokenVersion: user.tokenVersion || 0,
      },
      process.env.JWT_SECRET,
      {
        algorithm: "HS256",
        expiresIn: process.env.JWT_EXPIRES_IN || "15m",
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
        algorithms: ["HS256"],
        issuer: "primebundle-api",
        audience: "primebundle-client",
      });
    } catch (error) {
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

    if ((user.tokenVersion || 0) !== (decoded.tokenVersion || 0)) {
      throw new Error("Token expired (session invalidated)");
    }

    return this.sanitizeUser(user);
  }

  // =========================
  // SANITIZE USER
  // =========================
  static sanitizeUser(user) {
    return {
      id: user.id,
      name: user.name,
      email: user.email || null,
      phone: user.phone,
      role: user.role,
      userId: user.userId,
      walletBalance: user.walletBalance || 0,
      loyaltyPoints: user.loyaltyPoints || 0,
      createdAt: user.createdAt,
    };
  }

  // =========================
  // REVOKE TOKENS
  // =========================
  static async revokeTokens(userId) {
    const user = await User.findByPk(userId);

    if (!user) {
      throw new Error("User not found");
    }

    user.tokenVersion = (user.tokenVersion || 0) + 1;

    await user.save();

    return true;
  }
}

module.exports = AuthService;
