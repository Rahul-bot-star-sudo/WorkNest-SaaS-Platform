// CHECK setup allowed
// VALIDATE input
// ENSURE email unique
// ENSURE password strong
// HASH password
// ASSIGN SUPER_ADMIN role
// SAVE user
// LOCK setup
// RETURN response
// setup.service.js
class SetupService {
  constructor(userRepository, systemRepository, passwordUtil) {
    this.userRepository = userRepository
    this.systemRepository = systemRepository
    this.passwordUtil = passwordUtil
  }

  async createSuperAdmin(dto) {

    // STEP 1: Check if setup already completed (one-time guard)

    // STEP 2: Validate input (name, email, password)

    // STEP 3: Check if email already exists

    // STEP 4: Validate password strength

    // STEP 5: Hash password securely

    // STEP 6: Prepare super admin user object
    //         (role = SUPER_ADMIN, status = ACTIVE)

    // STEP 7: Save super admin user to database

    // STEP 8: Lock setup (mark setup as completed)

    // STEP 9: Return success response
  }
}

module.exports = SetupService
