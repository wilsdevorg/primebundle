const axios = require("axios");

const plugbundle = axios.create({
  baseURL: process.env.PLUGBUNDLE_BASE_URL,
  headers: {
    "X-Api-Key": process.env.PLUGBUNDLE_API_KEY,
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

module.exports = plugbundle;
