const UserRepository = require('../user/user.repository');
const RoleRepository = require('../role/role.repository');
const PasswordUtil = require('./utils/password.util');
const JwtUtil = require('./utils/jwt.util');
const TokenRepository = require('./token.repository');

class AuthService {

  async login(dto) {
    console.log('AUTH SERVICE ENTERED');

    if (!dto.email || !dto.password) {
      throw new Error('Invalid credentials');
    }

    const user = await UserRepository.findByEmail(dto.email);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValid = await PasswordUtil.compare(
      dto.password,
      user.password
    );

    if (!isValid) {
      throw new Error('Invalid credentials');
    }

    const role = await RoleRepository.findByCode(user.role);


    if (!role) {
      throw new Error('Role not found');
    }

    const accessToken = JwtUtil.signAccessToken({
  userId: user.id,
  role: role.role_code,
  priority: role.priority   // 👈 ADD THIS LINE
});


    const refreshToken = JwtUtil.signRefreshToken({
      userId: user.id
    });

    await TokenRepository.saveRefreshToken({
      token: refreshToken,
      userId: user.id,
      deviceInfo: dto.deviceInfo || null
    });

    await UserRepository.updateLoginMeta(user.id);

    return {
      accessToken,
      refreshToken,
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
