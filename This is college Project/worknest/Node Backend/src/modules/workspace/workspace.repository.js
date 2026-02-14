const db = require("../../config/db");

// ✅ Insert Workspace (UPDATED)
exports.insertWorkspace = async (name, typeId, manager_id, createdBy) => {
  const result = await db.query(
    `INSERT INTO workspaces 
     (name, type_id, manager_id, created_by, created_at)
     VALUES ($1, $2, $3, $4, NOW())
     RETURNING *`,
    [name, typeId, manager_id, createdBy]
  );

  return result.rows[0];
};

// ✅ Insert Workspace Users (unchanged)
exports.insertWorkspaceUser = async (workspaceId, userId) => {
  await db.query(
    `INSERT INTO workspace_users (workspace_id, user_id)
     VALUES ($1, $2)`,
    [workspaceId, userId]
  );
};

// ✅ Fetch Workspaces (UPDATED with Manager JOIN)
exports.fetchWorkspaces = async () => {
  const result = await db.query(
    `SELECT 
        w.*,
        wt.name AS type_name,
        u.name AS manager_name
     FROM workspaces w
     JOIN workspace_types wt ON w.type_id = wt.id
     LEFT JOIN users u ON w.manager_id = u.id`
  );

  return result.rows;
};

// ✅ Fetch Workspace Types (unchanged)
exports.fetchWorkspaceTypes = async () => {
  const result = await db.query(
    `SELECT * FROM workspace_types`
  );

  return result.rows;
};
exports.deleteWorkspace = async (id) => {
  await db.query(
    `DELETE FROM workspaces WHERE id = $1`,
    [id]
  );
};

exports.toggleWorkspaceStatus = async (id) => {
  await db.query(
    `UPDATE workspaces
     SET status = CASE
        WHEN status = 'ACTIVE' THEN 'INACTIVE'
        ELSE 'ACTIVE'
     END
     WHERE id = $1`,
    [id]
  );
};

exports.updateWorkspace = async (id, name, manager_id) => {
  const result = await db.query(
    `UPDATE workspaces
     SET name = $1,
         manager_id = $2
     WHERE id = $3
     RETURNING *`,
    [name, manager_id, id]
  );

  return result.rows[0];
};
