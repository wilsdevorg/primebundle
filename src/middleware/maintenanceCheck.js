const { SystemSetting } = require("../models");

const ADMIN_PREFIX = "/api/admin/";

const maintenanceCheck = async (req, res, next) => {
  try {
    if (req.originalUrl.startsWith(ADMIN_PREFIX)) {
      return next();
    }

    const setting = await SystemSetting.findOne({
      where: {
        key: "maintenanceMode",
      },
    });

    const maintenanceEnabled =
      setting &&
      (setting.value === true ||
        setting.value === "true" ||
        setting.value === 1 ||
        setting.value === "1");

    if (maintenanceEnabled) {
      return res.status(503).json({
        success: false,
        message:
          "System is currently in maintenance mode. Please try again later.",
        maintenanceMode: true,
      });
    }

    next();
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Maintenance check error:", error);
    }

    next();
  }
};

module.exports = maintenanceCheck;
