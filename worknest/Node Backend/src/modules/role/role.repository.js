// src/modules/role/role.repository.js

const db = require('../../config/db'); // pg Pool

class RoleRepository {
  async findByRoleCode(roleCode) {
    console.log('ROLE REPO HIT 👉', roleCode);

    const result = await db.query(
      'SELECT role_code, priority FROM roles WHERE role_code = $1',
      [roleCode]
    );

    return result.rows[0]; // ✅ VERY IMPORTANT
  }
}

module.exports = new RoleRepository();
