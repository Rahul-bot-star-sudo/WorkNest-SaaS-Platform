// src/modules/user/user.repository.js

const db = require("../../config/db");

class UserRepository {
  async findByEmail(email) {
    const result = await db.query(
      `SELECT id, name, email, password, role,
              last_login_at, login_count, created_at
       FROM users
       WHERE email = $1`,
      [email]
    );

    return result.rows[0] || null;
  }

  async createUser({ name, email, password, role }) {
  const result = await db.query(
    `INSERT INTO users (name, email, password, role, status)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING id, name, email, role, status, created_at`,
    [name, email, password, role, "ACTIVE"]
  );

  return result.rows[0];
}


  async updateLoginMeta(userId) {
    await db.query(
      `UPDATE users
       SET last_login_at = NOW(),
           login_count = COALESCE(login_count, 0) + 1
       WHERE id = $1`,
      [userId]
    );
  }
}

module.exports = new UserRepository();
