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
router.get("/test", (req, res) => {
  res.json({
    success: true,
    message: "Plugbundle routes working",
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
