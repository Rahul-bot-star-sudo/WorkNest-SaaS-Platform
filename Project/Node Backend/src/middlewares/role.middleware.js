const allowRoles = (allowedRoles) => {
  return (req, res, next) => {

    const userRole =
      req.user?.role?.role_code || req.user?.role;

    if (!allowedRoles
          .map(r => r.toUpperCase())
          .includes(userRole?.toUpperCase())
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied",
      });
    }

    next();
  };
};

module.exports = allowRoles;
