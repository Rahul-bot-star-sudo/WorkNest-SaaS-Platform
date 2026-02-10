// STEP 3: LOGIN BUSINESS FLOW (CORE FILE)

const UserRepository = require('../user/user.repository');
const RoleRepository = require('../role/role.repository'); // ✅ ADD THIS
const PasswordUtil = require('./utils/password.util');
const JwtUtil = require('./utils/jwt.util');
const TokenRepository = require('./token.repository');
const { ACTIVE_STATUS } = require('./auth.config');

class AuthService {

  async login(dto) {
    console.log('AUTH SERVICE ENTERED');

    // STEP 3.1: Input validation
    if (!dto.email || !dto.password) {
      throw new Error('Invalid credentials');
    }

    // STEP 3.2: Fetch user from DB
    const user = await UserRepository.findByEmail(dto.email);

    // STEP 3.3: User existence check
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // STEP 3.4: Status check
    if (user.status !== ACTIVE_STATUS) {
      throw new Error('Account inactive');
    }

    // STEP 3.5: Password compare
    const isValid = await PasswordUtil.compare(
      dto.password,
      user.password
    );

    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    // 🔹 STEP 3.5.1: FETCH ROLE DETAILS (IMPORTANT FIX)
    const role = await RoleRepository.findByRoleCode(user.role);

    if (!role) {
      throw new Error('Role not found');
    }

    // STEP 3.6: Generate access token
    const accessToken = JwtUtil.signAccessToken({
      userId: user.id,
      role: role.role_code
    });

    // STEP 3.7: Generate refresh token
    const refreshToken = JwtUtil.signRefreshToken({
      userId: user.id
    });

    // STEP 3.8: Store refresh token
    await TokenRepository.saveRefreshToken({
      token: refreshToken,
      userId: user.id,
      deviceInfo: dto.deviceInfo || null
    });

    // STEP 3.9: Update login metadata
    await UserRepository.updateLoginMeta(user.id);

    // STEP 3.10: RETURN FINAL RESPONSE (FIXED)
    return {
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: {
          role_code: role.role_code,
          priority: role.priority
        }
      }
    };
  }
}

module.exports = new AuthService();
