const { SystemSetting } = require("../models");

const maintenanceCheck = async (req, res, next) => {
  try {
    // Allow admin routes to pass through so admin can turn off maintenance mode
    if (req.path.startsWith("/admin")) {
      return next();
    }

    const setting = await SystemSetting.findOne({
      where: { key: "maintenanceMode" },
    });

    if (setting && setting.value === true) {
      return res.status(503).json({
        success: false,
        message:
          "System is currently in maintenance mode. Please try again later.",
        maintenanceMode: true,
      });
    }

    next();
  } catch (error) {
    console.error("Maintenance check error:", error);
    next();
  }
};

module.exports = maintenanceCheck;
