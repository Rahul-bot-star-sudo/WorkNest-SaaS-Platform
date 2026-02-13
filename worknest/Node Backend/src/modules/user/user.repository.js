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

  // 🔥 NEW FUNCTION ADD HERE
  async findUsersLowerThanPriority(priority) {

    const query = `
      SELECT u.id, u.name, u.email, u.role, r.priority
      FROM users u
      JOIN roles r ON u.role = r.role_code
      WHERE r.priority < $1
      ORDER BY r.priority ASC
    `;

    const result = await db.query(query, [priority]);

    return result.rows;
  }
  async findUsersWithFilter(priority, role, search) {

  let query = `
    SELECT u.id, u.name, u.email, u.role, r.priority
    FROM users u
    JOIN roles r ON u.role = r.role_code
    WHERE r.priority < $1
  `;

  const values = [priority];
  let index = 2;

  // 🔹 Role filter
  if (role) {
    query += ` AND u.role = $${index}`;
    values.push(role);
    index++;
  }

  // 🔹 Search filter
  if (search) {
    query += ` AND u.name ILIKE $${index}`;
    values.push(`%${search}%`);
    index++;
  }

  query += ` ORDER BY r.priority ASC`;

  const result = await db.query(query, values);

  return result.rows;
}
// 🔥 Update Role
async updateUserRole(id, role) {
  const result = await db.query(
    `UPDATE users
     SET role = $1
     WHERE id = $2
     RETURNING id, name, email, role, status`,
    [role, id]
  );

  return result.rows[0];
}

// 🔥 Toggle Status
async toggleUserStatus(id) {
  await db.query(
    `UPDATE users
     SET status = CASE
        WHEN status = 'ACTIVE' THEN 'INACTIVE'
        ELSE 'ACTIVE'
     END
     WHERE id = $1`,
    [id]
  );
}

// 🔥 Delete User
async deleteUser(id) {
  await db.query(
    `DELETE FROM users WHERE id = $1`,
    [id]
  );
}

}


module.exports = new UserRepository();
