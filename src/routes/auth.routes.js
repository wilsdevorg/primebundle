const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

// ==============================
// REGISTER USER
// ==============================
router.post("/register", authController.register);

// ==============================
// LOGIN USER
// ==============================
router.post("/login", authController.login);

module.exports = router;
const TokenService = require("../services/token.service");

router.post("/refresh", async (req, res) => {
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

    const accessToken = TokenService.generateAccessToken(user);

    res.json({
      success: true,
      accessToken,
    });
  } catch (err) {
    res.status(401).json({
      success: false,
      message: "Invalid refresh token",
    });
  }
});
