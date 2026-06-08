const { User } = require("./src/models");

async function promote() {
  const user = await User.findByPk(2); // Admin User ID

  if (!user) {
    console.log("User not found");
    process.exit();
  }

  user.role = "admin";
  await user.save();

  console.log("User promoted to admin");
  process.exit();
}

promote();
