const { SystemRepository } = require('../../../modules/system/system.repository')
const { UserRepository } = require('../../../modules/user/user.repository')
const { PasswordUtil } = require('./utils/password.util')
const { SetupConfig } = require('./setup.config')

class SetupService {

  constructor() {
    this.systemRepository = new SystemRepository()
    this.userRepository = new UserRepository()
  }

  async createSuperAdmin(dto) {

    // STEP 1: Check if setup already completed (one-time guard)
    const isCompleted = await this.systemRepository.isSetupCompleted()
    if (isCompleted) {
      throw new Error('Super Admin setup already completed')
    }

    // STEP 2: Validate input
    if (!dto.name) {
      throw new Error('Name is required')
    }

    if (!dto.email) {
      throw new Error('Email is required')
    }

    if (!dto.password) {
      throw new Error('Password is required')
    }

    // STEP 3: Check if email already exists
    const existingUser = await this.userRepository.findByEmail(dto.email)
    if (existingUser) {
      throw new Error('Email already exists')
    }

    // STEP 4: Validate password strength
    PasswordUtil.checkStrength(dto.password)

    // STEP 5: Hash password
    const hashedPassword = await PasswordUtil.hash(dto.password)

    // STEP 6: Prepare super admin user object
    const superAdminUser = {
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      role: SetupConfig.SUPER_ADMIN_ROLE,
      status: SetupConfig.DEFAULT_STATUS,
      createdAt: new Date()
    }

    // STEP 7: Save super admin user to database
    await this.userRepository.save(superAdminUser)

    // STEP 8: Lock setup (mark setup as completed)
    await this.systemRepository.markSetupCompleted()

    // STEP 9: Return success response
    return {
      message: 'Super Admin setup completed successfully'
    }
  }
}

module.exports = { SetupService }
