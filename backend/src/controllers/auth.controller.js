const AuthService = require("../services/auth.service");

// REGISTER
exports.register = async (req, res, next) => {
  try {
    const user = await AuthService.register(req.body);

    res.json({
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// LOGIN
exports.login = async (req, res, next) => {
  try {
    const result = await AuthService.login(req.body);

    res.json({
      success: true,
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
