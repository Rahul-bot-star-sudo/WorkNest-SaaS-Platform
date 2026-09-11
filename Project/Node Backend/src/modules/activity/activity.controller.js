const pool = require("../../config/db");

exports.getActivities = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT a.id,
             u.name AS user_name,
             a.action,
             a.created_at
      FROM activity_logs a
      JOIN users u ON u.id = a.user_id
      ORDER BY a.created_at DESC
      LIMIT 50
    `);

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching activities"
    });
  }
};
exports.getTaskSummary = async (req, res) => {
  try {

    const summary = await service.getTaskSummary();

    res.json({
      success: true,
      data: summary
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching task summary"
    });
  }
};
