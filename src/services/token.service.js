const jwt = require("jsonwebtoken");
const { RefreshToken } = require("../models");

class TokenService {
  // =========================
  // ACCESS TOKEN
  // =========================
  static generateAccessToken(user) {
    return jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
        issuer: "primebundle-api",
        audience: "primebundle-client",
      },
    );
  }

  // =========================
  // REFRESH TOKEN
  // =========================
  static async generateRefreshToken(user) {
    const token = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_REFRESH_SECRET,
      {
        expiresIn: "7d",
      },
    );

    await RefreshToken.create({
      UserId: user.id,
      token,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return token;
  }

  // =========================
  // VERIFY REFRESH TOKEN
  // =========================
  static async verifyRefreshToken(token) {
    const stored = await RefreshToken.findOne({
      where: {
        token,
        revoked: false,
      },
    });

    if (!stored) {
      throw new Error("Invalid refresh token");
    }

    jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    return stored;
  }

  // =========================
  // REVOKE TOKEN
  // =========================
  static async revokeToken(token) {
    const stored = await RefreshToken.findOne({
      where: { token },
    });

    if (stored) {
      stored.revoked = true;
      await stored.save();
    }
  }
}

module.exports = TokenService;
