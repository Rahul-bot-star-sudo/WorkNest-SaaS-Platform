const bcrypt = require("bcrypt");
const userRepository = require("./user.repository");
const roleRepository = require("../role/role.repository");

exports.createUser = async (data, currentUser) => {

  console.log("Incoming Data:", data); // 👈 temporary debug

  const role = data.role_code;   // 👈 DIRECT use this
  const { name, email, password, companyId } = data;

  if (!role) {
    throw new Error("Role is required");
  }

  // Only SUPER_ADMIN can create ADMIN
  if (role === "ADMIN" && currentUser.role !== "SUPER_ADMIN") {
    const error = new Error("Only Super Admin can create Admin");
    error.statusCode = 403;
    throw error;
  }

  let finalCompanyId;

  if (currentUser.role === "SUPER_ADMIN") {
    finalCompanyId = companyId;
  } else {
    finalCompanyId = currentUser.companyId;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  return await userRepository.create({
    name,
    email,
    password: hashedPassword,
    role,                // 👈 now correct
    company_id: finalCompanyId,
    status: "ACTIVE"
  });
};
exports.getUsers = async (loggedInUser, role, search) => {

  const loggedInUserRole = await roleRepository.findByCode(
    loggedInUser.role
  );

  if (!loggedInUserRole) {
    const error = new Error("Logged-in role not found");
    error.statusCode = 403;
    throw error;
  }

  const users = await userRepository.findUsersWithFilter(
    loggedInUserRole.priority,
    role,
    search,
    loggedInUser.companyId,   // 👈 pass companyId
    loggedInUser.role         // 👈 pass role
  );

  return users;
};
exports.updateUserRole = async (id, role) => {
  return await userRepository.updateUserRole(id, role);
};

exports.toggleUserStatus = async (id) => {
  return await userRepository.toggleUserStatus(id);
};

exports.deleteUser = async (id) => {
  return await userRepository.deleteUser(id);
};
