const { UserRepository } = require('../../../modules/user/user.repository')
const { PasswordUtil } = require('../super admin setup/utils/password.util')
const { JwtUtil } = require('../super admin setup/utils/jwt.util')
const { AuthConfig } = require('./auth.config')


class AuthService {

  constructor() {
    this.userRepository = new UserRepository()
  }

  async login(dto) {

    // STEP 1: Validate input
    if (!dto.email || !dto.password) {
      throw new Error('Email and password are required')
    }

    // STEP 2: Find user by email
    const user = await this.userRepository.findByEmail(dto.email)

    // STEP 3: Handle invalid credentials (generic)
    if (!user) {
      throw new Error('Invalid email or password')
    }

    // STEP 4: Compare password
    const isPasswordValid = await PasswordUtil.compare(
      dto.password,
      user.password
    )

    // STEP 5: Handle invalid credentials (generic)
    if (!isPasswordValid) {
      throw new Error('Invalid email or password')
    }

    // STEP 6: Check user status
    if (user.status !== AuthConfig.ACTIVE_STATUS) {
      throw new Error('User account is inactive')
    }

    // STEP 7: Generate JWT (userId + role)
    const token = JwtUtil.sign({
      userId: user.id,
      role: user.role
    })

    // STEP 8: Post-login updates (optional but recommended)
    await this.userRepository.updateLoginMeta(user.id)

    // STEP 9: Prepare safe user response
    const safeUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    }

    // STEP 10: Return result
    return {
      token,
      user: safeUser
    }
  }
}

module.exports = { AuthService }
