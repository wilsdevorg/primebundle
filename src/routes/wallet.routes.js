const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const walletController = require("../controllers/wallet.controller");

// GET BALANCE
router.get("/balance", authMiddleware, walletController.getBalance);

// CREDIT WALLET
router.post("/credit", authMiddleware, walletController.credit);

module.exports = router;
