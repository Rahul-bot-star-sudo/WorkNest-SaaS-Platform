const pool = require("../../config/db");

exports.logActivity = async (userId, action, taskId = null) => {
  try {
    await pool.query(
      `INSERT INTO activity_logs (user_id, action, task_id)
       VALUES ($1, $2, $3)`,
      [userId, action, taskId]
    );
  } catch (error) {
    console.error("Activity Log Error:", error);
  }
};
exports.getTaskSummary = async () => {

  const result = await pool.query(`
    SELECT
      COUNT(*) AS total,
      COUNT(CASE WHEN status = 'DONE' THEN 1 END) AS completed,
      COUNT(CASE WHEN status = 'IN_PROGRESS' THEN 1 END) AS in_progress,
      COUNT(CASE WHEN status = 'TODO' THEN 1 END) AS todo,
      COUNT(CASE 
              WHEN due_date < CURRENT_DATE 
              AND status != 'DONE' 
              THEN 1 
            END) AS overdue
    FROM tasks
    WHERE is_deleted = FALSE
  `);

  return result.rows[0];
};
