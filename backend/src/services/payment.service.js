const axios = require("axios");

class PaymentService {
  // =========================
  // INITIATE PAYMENT
  // =========================
  static async initializePayment({ email, amount, reference }) {
    const response = await axios.post(
      "https://api.paystack.co/transaction/initialize",
      {
        email,
        amount: Math.round(amount * 100), // convert to kobo/pesewas
        reference,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data.data;
  }

  // =========================
  // VERIFY PAYMENT
  // =========================
  static async verifyPayment(reference) {
    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      },
    );

    return response.data.data;
  }
}

module.exports = PaymentService;
