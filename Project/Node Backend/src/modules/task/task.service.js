const pool = require("../../config/db");

// ✅ Create Task (Company Safe)
exports.createTask = async (data, loggedInUser) => {

  const { title, description, project_id, assigned_to, due_date } = data;

  if (!title || !project_id) {
    throw new Error("Title and Project are required");
  }

  const companyId = loggedInUser.companyId;

  // 🔐 Ensure project belongs to same company
  const projectCheck = await pool.query(
    "SELECT company_id FROM projects WHERE id = $1",
    [project_id]
  );

  if (
    projectCheck.rows.length === 0 ||
    projectCheck.rows[0].company_id !== companyId
  ) {
    throw new Error("Project does not belong to your company");
  }

  const result = await pool.query(
    `INSERT INTO tasks
     (title, description, project_id, assigned_to, due_date, created_by, company_id)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      title,
      description || null,
      project_id,
      assigned_to || null,
      due_date || null,
      loggedInUser.userId,
      companyId
    ]
  );

  return result.rows[0];
};


// ✅ Get Tasks By Project (Company Safe)
exports.getTasksByProject = async (projectId, loggedInUser) => {

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
     WHERE t.project_id = $1
     AND t.company_id = $2`,
    [projectId, loggedInUser.companyId]
  );

  return result.rows;
};


// ✅ Update Task (Company Safe)
exports.updateTask = async (taskId, data, loggedInUser) => {

  const { status, priority } = data;

  const result = await pool.query(
    `UPDATE tasks
     SET status = $1,
         priority = $2
     WHERE id = $3
     AND company_id = $4
     RETURNING *`,
    [status, priority, taskId, loggedInUser.companyId]
  );

  if (result.rows.length === 0) {
    throw new Error("Task not found or access denied");
  }

  return result.rows[0];
};


// ✅ Delete Task (Company Safe)
exports.deleteTask = async (taskId, loggedInUser) => {

  const result = await pool.query(
    `DELETE FROM tasks
     WHERE id = $1
     AND company_id = $2
     RETURNING *`,
    [taskId, loggedInUser.companyId]
  );

  if (result.rows.length === 0) {
    throw new Error("Task not found or access denied");
  }
};


// ✅ Get My Tasks (Company Safe)
exports.getMyTasks = async (loggedInUser) => {

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
     WHERE t.assigned_to = $1
     AND t.company_id = $2`,
    [loggedInUser.userId, loggedInUser.companyId]
  );

  return result.rows;
};


// ✅ Task Summary (Company Safe)
exports.getTaskSummary = async (loggedInUser) => {

  const result = await pool.query(`
    SELECT
      COUNT(*) AS total,
      COUNT(CASE WHEN status = 'DONE' THEN 1 END) AS completed,
      COUNT(CASE WHEN status = 'IN_PROGRESS' THEN 1 END) AS in_progress,
      COUNT(CASE WHEN status = 'TODO' THEN 1 END) AS todo
    FROM tasks
    WHERE company_id = $1
  `, [loggedInUser.companyId]);

  return result.rows[0];
};