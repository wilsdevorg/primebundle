const { User } = require("../models");

class UserService {
  static async getAllUsers() {
    return await User.findAll({
      order: [["id", "ASC"]],
    });
  }

  static async getUserById(id) {
    return await User.findByPk(id);
  }
}

module.exports = UserService;
