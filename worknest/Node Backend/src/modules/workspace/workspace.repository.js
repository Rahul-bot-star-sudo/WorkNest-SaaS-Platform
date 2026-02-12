const db = require("../../config/db");

exports.insertWorkspace = async (name, typeId, createdBy) => {
  const result = await db.query(
    `INSERT INTO workspaces (name, type_id, created_by)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [name, typeId, createdBy]
  );

  return result.rows[0];
};

exports.insertWorkspaceUser = async (workspaceId, userId) => {
  await db.query(
    `INSERT INTO workspace_users (workspace_id, user_id)
     VALUES ($1, $2)`,
    [workspaceId, userId]
  );
};

exports.fetchWorkspaces = async () => {
  const result = await db.query(
    `SELECT w.*, wt.name AS type_name
     FROM workspaces w
     JOIN workspace_types wt ON w.type_id = wt.id`
  );

  return result.rows;
};

exports.fetchWorkspaceTypes = async () => {
  const result = await db.query(
    `SELECT * FROM workspace_types`
  );

  return result.rows;
};
