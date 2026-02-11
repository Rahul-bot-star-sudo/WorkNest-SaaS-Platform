const userService = require("./user.service");

exports.createUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body, req.user);

    return res.status(201).json({
      success: true,
      data: newUser,
    });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
