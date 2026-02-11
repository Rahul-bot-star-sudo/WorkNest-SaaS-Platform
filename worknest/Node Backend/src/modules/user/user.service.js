const bcrypt = require("bcrypt");
const userRepository = require("./user.repository");
const roleRepository = require("../role/role.repository");

exports.createUser = async (data, loggedInUser) => {
  const { name, email, password, role_code } = data;

  // 1️⃣ Basic validation
  if (!name || !email || !password || !role_code) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    throw error;
  }

  // 2️⃣ Email normalization
  const normalizedEmail = email.toLowerCase().trim();

  const existingUser = await userRepository.findByEmail(normalizedEmail);
  if (existingUser) {
    const error = new Error("Email already exists");
    error.statusCode = 409;
    throw error;
  }

  // 3️⃣ Role validation
  const selectedRole = await roleRepository.findByCode(role_code);
  if (!selectedRole) {
    const error = new Error("Invalid role selected");
    error.statusCode = 400;
    throw error;
  }

  // 4️⃣ Fetch logged-in user role from DB
  const loggedInUserRole = await roleRepository.findByCode(
    loggedInUser.role
  );

  if (!loggedInUserRole) {
    const error = new Error("Logged-in role not found");
    error.statusCode = 403;
    throw error;
  }

  // 🔐 5️⃣ Correct RBAC Check
  if (selectedRole.priority >= loggedInUserRole.priority) {
    const error = new Error(
      "You cannot create user with equal or higher authority"
    );
    error.statusCode = 403;
    throw error;
  }

  // 6️⃣ Password hashing
  const hashedPassword = await bcrypt.hash(password, 10);

  // 7️⃣ Create user
  const newUser = await userRepository.createUser({
    name: name.trim(),
    email: normalizedEmail,
    password: hashedPassword,
    role: selectedRole.role_code,
  });

  return newUser;
};

exports.getUsers = async (loggedInUser) => {

  const loggedInUserRole = await roleRepository.findByCode(
    loggedInUser.role
  );

  if (!loggedInUserRole) {
    const error = new Error("Logged-in role not found");
    error.statusCode = 403;
    throw error;
  }

  const users = await userRepository.findUsersLowerThanPriority(
    loggedInUserRole.priority
  );

  return users;
};
