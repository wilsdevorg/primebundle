const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

const TokenService = require("../services/token.service");

const { User } = require("../models");

// ==============================
// REGISTER USER
// ==============================
router.post("/register", authController.register);

// ==============================
// LOGIN USER
// ==============================
router.post("/login", authController.login);

// ==============================
// REFRESH ACCESS TOKEN
// ==============================
router.post("/refresh", async (req, res) => {
  try {
    // =========================
    // GET REFRESH TOKEN
    // =========================
    const { refreshToken } = req.body;

    // =========================
    // VALIDATE TOKEN EXISTS
    // =========================
    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token required",
      });
    }

    // =========================
    // VERIFY REFRESH TOKEN
    // =========================
    const stored = await TokenService.verifyRefreshToken(refreshToken);

    // =========================
    // FIND USER
    // =========================
    const user = await User.findByPk(stored.UserId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // =========================
    // GENERATE NEW ACCESS TOKEN
    // =========================
    const accessToken = TokenService.generateAccessToken(user);

    // =========================
    // RESPONSE
    // =========================
    res.json({
      success: true,
      accessToken,
    });
  } catch (err) {
    console.error("Refresh token error:", err.message);

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

    // =========================
    // DELETE REFRESH TOKEN
    // =========================
    await TokenService.removeRefreshToken(refreshToken);

    res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (err) {
    console.error("Logout error:", err.message);

    res.status(500).json({
      success: false,
      message: "Logout failed",
    });
  }
});

module.exports = router;
