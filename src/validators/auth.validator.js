const { z } = require("zod");

// =========================
// REGISTER VALIDATION
// =========================
const registerSchema = z.object({
  name: z.string().min(2, "Name is too short"),

  phone: z
    .string()
    .min(10, "Phone number is too short"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
});

// =========================
// LOGIN VALIDATION
// =========================
const loginSchema = z.object({
  phone: z
    .string()
    .min(10, "Phone number is too short"),

  password: z
    .string()
    .min(6, "Password required"),
});

module.exports = {
  registerSchema,
  loginSchema,
};