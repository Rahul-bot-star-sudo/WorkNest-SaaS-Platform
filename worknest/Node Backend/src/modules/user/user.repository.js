const db = require('../../config/db');

class UserRepository {

  async findByEmail(email) {
    try {
      console.log('USER REPO: findByEmail CALLED WITH:', email);

      const result = await db.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );

      console.log('USER REPO RESULT ROWS:', result.rows);

      return result.rows[0];
    } catch (err) {
      console.error('USER REPO ERROR:', err);
      throw err; // VERY IMPORTANT
    }
  }

  async updateLoginMeta(userId) {
    await db.query(
      `
      UPDATE users
      SET last_login_at = NOW(),
          login_count = login_count + 1
      WHERE id = $1
      `,
      [userId]
    );
  }
}

module.exports = new UserRepository();
