const db = require("../../config/db");

class RoleRepository {
  async findByCode(roleCode) {
    const result = await db.query(
      `SELECT id, role_code, priority
       FROM roles
       WHERE role_code = $1`,
      [roleCode]
    );

    return result.rows[0] || null;
  }

  async findRolesHigherThan(priority) {
    const result = await db.query(
      `SELECT id, role_code, priority
       FROM roles
       WHERE priority < $1
       ORDER BY priority ASC`,
      [priority]
    );

    return result.rows;
  }
}

module.exports = new RoleRepository();
