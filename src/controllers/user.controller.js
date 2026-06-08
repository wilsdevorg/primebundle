const UserService = require("../services/user.service");

const getAllUsers = async (req, res, next) => {
  try {
    const users = await UserService.getAllUsers();

    return res.json({
      success: true,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};

const getProfile = async (req, res) => {
  return res.json({
    success: true,
    data: req.user,
  });
};

module.exports = {
  getAllUsers,
  getProfile,
};
