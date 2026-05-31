const AuthService = require("../services/auth.service");

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const user = await AuthService.getUserFromToken(token);

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: err.message || "Unauthorized",
    });
  }
};
