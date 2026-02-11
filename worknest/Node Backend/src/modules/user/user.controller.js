const userService = require("./user.service");

exports.createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body, req.user);

    return res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    return res.status(error.statusCode || 400).json({
      success: false,
      message: error.message,
    });
  }
};

// 👇 Agar route me GET laga hai to ye hona hi chahiye
exports.getUsers = async (req, res) => {
  try {
    const users = await userService.getUsers(req.user);

    return res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    return res.status(error.statusCode || 400).json({
      success: false,
      message: error.message,
    });
  }
};
