const companyService = require("./company.service");
const pool = require("../../config/db"); // apna actual db file path check karo

exports.createCompany = async (req, res) => {
  try {
    const { name, email } = req.body;

    const result = await pool.query(
      "INSERT INTO companies (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );

    res.status(201).json({
      success: true,
      company: result.rows[0]
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
exports.getAllCompanies = async (req, res) => {
  try {

    let result;

    if (req.user.role === "SUPER_ADMIN") {
      result = await pool.query("SELECT * FROM companies");
    } else {
      result = await pool.query(
        "SELECT * FROM companies WHERE id = $1",
        [req.user.companyId]
      );
    }

    res.json({
      success: true,
      companies: result.rows
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};