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
exports.getUsers = async (req, res) => {
  try {
    const { role, search } = req.query; // 👈 NEW

    const users = await userService.getUsers(
      req.user,
      role,
      search
    );

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
exports.updateUserRole = async (req, res) => {
  try {
    const updated = await userService.updateUserRole(
      req.params.id,
      req.body.role
    );

    res.json({
      success: true,
      data: updated
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

exports.toggleUserStatus = async (req, res) => {
  await userService.toggleUserStatus(req.params.id);

  res.json({ success: true });
};

exports.deleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id);

  res.json({ success: true });
};
