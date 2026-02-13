const pool = require("../../config/db");

exports.createTask = async (data, userId) => {

  const { title, description, project_id, assigned_to, due_date } = data;

  const result = await pool.query(
    `INSERT INTO tasks
     (title, description, project_id, assigned_to, due_date, created_by)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [title, description, project_id, assigned_to, due_date, userId]
  );

  return result.rows[0];
};
exports.getTasksByProject = async (projectId) => {

  const result = await pool.query(
    `SELECT 
        t.id,
        t.title,
        t.description,
        t.status,
        t.priority,
        t.due_date,
        u.name AS assigned_name
     FROM tasks t
     LEFT JOIN users u ON t.assigned_to = u.id
     WHERE t.project_id = $1`,
    [projectId]
  );

  return result.rows;
};
exports.updateTask = async (taskId, data) => {

  const { status, priority } = data;

  const result = await pool.query(
    `UPDATE tasks
     SET status = $1,
         priority = $2
     WHERE id = $3
     RETURNING *`,
    [status, priority, taskId]
  );

  return result.rows[0];
};
exports.deleteTask = async (taskId) => {
  await pool.query(
    "DELETE FROM tasks WHERE id = $1",
    [taskId]
  );
};
exports.getMyTasks = async (userId) => {

  const result = await pool.query(
    `SELECT 
        t.id,
        t.title,
        t.description,
        t.status,
        t.priority,
        t.due_date,
        p.name AS project_name
     FROM tasks t
     LEFT JOIN projects p ON t.project_id = p.id
     WHERE t.assigned_to = $1`,
    [userId]
  );

  return result.rows;
};
exports.getTaskSummary = async () => {

  const result = await pool.query(`
    SELECT
      COUNT(*) AS total,
      COUNT(CASE WHEN status = 'DONE' THEN 1 END) AS completed,
      COUNT(CASE WHEN status = 'IN_PROGRESS' THEN 1 END) AS in_progress,
      COUNT(CASE WHEN status = 'TODO' THEN 1 END) AS todo
    FROM tasks
  `);

  return result.rows[0];
};
