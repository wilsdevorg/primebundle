const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const TokenService = require("../services/token.service");
const { User } = require("../models");

const {
  loginLimiter,
  registerLimiter,
  refreshLimiter,
} = require("../middleware/rateLimiter");

// ==============================
// REGISTER USER
// ==============================
router.post("/register", registerLimiter, authController.register);

// ==============================
// LOGIN USER
// ==============================
router.post("/login", loginLimiter, authController.login);

// ==============================
// REFRESH ACCESS TOKEN
// ==============================
router.post("/refresh", refreshLimiter, async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token required",
      });
    }

    const stored = await TokenService.verifyRefreshToken(refreshToken);

    const user = await User.findByPk(stored.UserId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const accessToken = TokenService.generateAccessToken(user);

    res.json({
      success: true,
      accessToken,
    });
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Refresh token error:", err.message);
    }

    res.status(401).json({
      success: false,
      message: "Invalid or expired refresh token",
    });
  }
});

// ==============================
// LOGOUT USER
// ==============================
router.post("/logout", async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh token required",
      });
    }

    await TokenService.removeRefreshToken(refreshToken);

    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Logout error:", err.message);
    }

    res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
});

module.exports = router;
