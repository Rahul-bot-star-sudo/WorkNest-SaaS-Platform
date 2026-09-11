const db = require('../../config/db');

class TokenRepository {

  async saveRefreshToken({ token, userId, deviceInfo }) {
    await db.query(
      `
      INSERT INTO refresh_tokens (token, user_id, device_info, created_at)
      VALUES ($1, $2, $3, NOW())
      `,
      [token, userId, deviceInfo]
    );
  }

  async revokeToken(token) {
    await db.query(
      'DELETE FROM refresh_tokens WHERE token = $1',
      [token]
    );
  }

  async findValidToken(token) {
    const result = await db.query(
      'SELECT * FROM refresh_tokens WHERE token = $1',
      [token]
    );
    return result.rows[0];
  }
}

// 🔥 THIS LINE IS CRITICAL
module.exports = new TokenRepository();
