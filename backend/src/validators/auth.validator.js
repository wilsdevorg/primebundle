const { z } = require("zod");

// ======================
// REGISTER VALIDATION
// ======================
const registerSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  phone: z.string().optional(),
});

// ======================
// LOGIN VALIDATION
// ======================
const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password required"),
});

module.exports = {
  registerSchema,
  loginSchema,
};
