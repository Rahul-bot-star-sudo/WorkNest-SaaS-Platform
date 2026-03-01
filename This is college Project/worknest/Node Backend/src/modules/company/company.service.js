const db = require("../../config/db");

class CompanyService {

  async getAllCompanies(user) {

    // SUPER_ADMIN → sab companies
    if (user.role === "SUPER_ADMIN") {
      const result = await db.query(
        "SELECT id, name, email, created_at FROM companies ORDER BY id ASC"
      );
      return result.rows;
    }

    // ADMIN → sirf apni company
    const result = await db.query(
      "SELECT id, name, email, created_at FROM companies WHERE id = $1",
      [user.companyId]
    );

    return result.rows;
  }

}

module.exports = new CompanyService();