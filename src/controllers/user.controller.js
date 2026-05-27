const UserService = require("../services/user.service");

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await UserService.getAllUsers();

    res.json({
      success: true,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

exports.getProfile = async (req, res) => {
  res.json({
    success: true,
    data: req.user,
  });
};
