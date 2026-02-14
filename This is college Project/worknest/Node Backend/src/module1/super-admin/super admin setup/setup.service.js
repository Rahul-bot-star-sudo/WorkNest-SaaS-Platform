// setup.service.js

// ✅ INSTANCE imports (NOT classes)
const systemRepository = require('../../../modules/system/system.repository');
const userRepository = require('../../../modules/user/user.repository');
const PasswordUtil = require('../../../modules/auth/utils/password.util');
const SetupConfig = require('./setup.config');

class SetupService {

  constructor() {
    // ✅ already-created instances reuse karo
    this.systemRepository = systemRepository;
    this.userRepository = userRepository;
  }

  async createSuperAdmin(dto) {

    // STEP 1: One-time setup guard
    const isCompleted = await this.systemRepository.isSetupCompleted();
    if (isCompleted) {
      throw new Error('Super Admin setup already completed');
    }

    // STEP 2: Input validation
    if (!dto.name) throw new Error('Name is required');
    if (!dto.email) throw new Error('Email is required');
    if (!dto.password) throw new Error('Password is required');

    // STEP 3: Email uniqueness check
    const existingUser = await this.userRepository.findByEmail(dto.email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    // STEP 4: Password validation
    PasswordUtil.checkStrength(dto.password);

    // STEP 5: Hash password
    const hashedPassword = await PasswordUtil.hash(dto.password);

    // STEP 6: Build super-admin user
    const superAdminUser = {
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      role: SetupConfig.SUPER_ADMIN_ROLE,
      status: SetupConfig.DEFAULT_STATUS,
      createdAt: new Date()
    };

    // STEP 7: Persist user
    await this.userRepository.save(superAdminUser);

    // STEP 8: Lock system setup
    await this.systemRepository.markSetupCompleted();

    // STEP 9: Response
    return {
      message: 'Super Admin setup completed successfully'
    };
  }
}

// ✅ export SERVICE INSTANCE
module.exports = new SetupService();
