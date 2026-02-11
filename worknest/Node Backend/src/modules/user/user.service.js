const bcrypt = require("bcrypt");
const userRepository = require("./user.repository");
const roleRepository = require("../role/role.repository");

exports.createUser = async (data, loggedInUser) => {
  const { name, email, password, role_code } = data;

  if (!name || !email || !password || !role_code) {
    throw new Error("All fields are required");
  }

  const existingUser = await userRepository.findByEmail(email);
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const selectedRole = await roleRepository.findByCode(role_code);
  if (!selectedRole) {
    throw new Error("Invalid role");
  }

  // 🔐 CRITICAL RBAC CHECK
  if (selectedRole.priority >= loggedInUser.priority) {
    throw new Error("You cannot create this role");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await userRepository.createUser({
  name,
  email,
  password: hashedPassword,
  role: selectedRole.role_code   // ✅ FIXED
});


  return newUser;
};
