// user.repository.js
const db = require('../database/db') 
// db.query(sql, params)

class UserRepository {

  // STEP 1: Find user by email
  async findByEmail(email) {
    const query = `
      SELECT id, name, email, password, role, status
      FROM users
      WHERE email = $1
      LIMIT 1
    `

    const result = await db.query(query, [email])

    return result.rows[0] || null
  }

  // STEP 2: Save user in database
  async save(user) {
    const query = `
      INSERT INTO users (name, email, password, role, status, created_at)
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING id
    `

    const values = [
      user.name,
      user.email,
      user.password,
      user.role,
      user.status
    ]

    const result = await db.query(query, values)
    return result.rows[0]
  }

  // OPTIONAL: Update login metadata
  async updateLoginMeta(userId) {
    const query = `
      UPDATE users
      SET last_login_at = NOW(),
          failed_attempts = 0
      WHERE id = $1
    `

    await db.query(query, [userId])
  }
}

module.exports = { UserRepository }
