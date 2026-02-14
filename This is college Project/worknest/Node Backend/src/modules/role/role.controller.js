const roleService = require("./role.service");

exports.getCreatableRoles = async (req, res) => {
  try {
    const roles = await roleService.getCreatableRoles(req.user);

    return res.status(200).json({
      success: true,
      data: roles,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
