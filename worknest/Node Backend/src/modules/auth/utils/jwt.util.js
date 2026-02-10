const jwt = require('jsonwebtoken');
const {
  ACCESS_TOKEN_EXPIRY,
  REFRESH_TOKEN_EXPIRY
} = require('../auth.config');

class JwtUtil {

  static signAccessToken(payload) {
    if (!process.env.JWT_ACCESS_SECRET) {
      throw new Error('JWT_ACCESS_SECRET is missing');
    }

    return jwt.sign(
      payload,
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRY }
    );
  }

  static signRefreshToken(payload) {
    if (!process.env.JWT_REFRESH_SECRET) {
      throw new Error('JWT_REFRESH_SECRET is missing');
    }

    return jwt.sign(
      payload,
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRY }
    );
  }
}

module.exports = JwtUtil;
