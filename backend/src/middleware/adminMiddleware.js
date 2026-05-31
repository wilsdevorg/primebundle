const jwt = require("jsonwebtoken");

const { User } = require("../models");

const adminMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access required",
      });
    }

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};

module.exports = adminMiddleware;
