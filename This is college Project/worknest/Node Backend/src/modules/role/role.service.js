const roleRepository = require("./role.repository");

exports.getCreatableRoles = async (loggedInUser) => {
  const currentPriority = loggedInUser.priority;

  const roles = await roleRepository.findRolesHigherThan(currentPriority);

  return roles;
};
