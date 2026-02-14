const pool = require("../../config/db");

exports.createProject = async (data, userId) => {
  const { name, description, workspace_id, owner_id } = data;

  const result = await pool.query(
    `INSERT INTO projects 
     (name, description, workspace_id, owner_id, created_by)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [name, description, workspace_id, owner_id, userId]
  );

  return result.rows[0];
};
exports.getProjectsByWorkspace = async (workspaceId) => {
  const result = await pool.query(
    `SELECT 
        p.id,
        p.name,
        p.description,
        p.status,
        p.created_at,
        u.name AS owner_name
     FROM projects p
     LEFT JOIN users u ON p.owner_id = u.id
     WHERE p.workspace_id = $1`,
    [workspaceId]
  );

  return result.rows;
};

exports.updateProjectStatus = async (projectId, status) => {
  const result = await pool.query(
    "UPDATE projects SET status = $1 WHERE id = $2 RETURNING *",
    [status, projectId]
  );

  return result.rows[0];
};
