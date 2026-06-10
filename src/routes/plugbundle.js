const express = require("express");
const axios = require("axios");

const router = express.Router();

const api = axios.create({
  baseURL: process.env.PLUGBUNDLE_BASE_URL,
  headers: {
    "X-Api-Key": process.env.PLUGBUNDLE_API_KEY,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

// Test route
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Plugbundle routes working",
  });
});

// Debug API key (temporary)
router.get("/debug-key", (req, res) => {
  const key = process.env.PLUGBUNDLE_API_KEY || "";

  res.json({
    exists: !!key,
    startsWithDbk: key.startsWith("dbk_"),
    length: key.length,
    first8: key.substring(0, 8),
    last8: key.substring(Math.max(0, key.length - 8)),
  });
});

// Get reseller profile
router.get("/profile", async (req, res) => {
  try {
    const response = await api.get("/me");

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
});

// Get all available packages
router.get("/packages", async (req, res) => {
  try {
    const response = await api.get("/packages");

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
});

// Place order
router.post("/buy-data", async (req, res) => {
  try {
    const { package_id, customer_name, customer_email, phone_number } =
      req.body;

    const response = await api.post("/orders", {
      package_id,
      customer_name,
      customer_email,
      phone_number,
    });

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
});

// Get order status
router.get("/order/:reference", async (req, res) => {
  try {
    const { reference } = req.params;

    const response = await api.get(`/orders/${reference}`);

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
});

// Refresh order status
router.post("/order/:reference/sync", async (req, res) => {
  try {
    const { reference } = req.params;

    const response = await api.post(`/orders/${reference}/sync-status`);

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error(error.response?.data || error.message);

    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
});

module.exports = router;
