const db = require("../../config/db");

// ✅ Insert Workspace (SECURE VERSION)
exports.insertWorkspace = async (
  name,
  typeId,
  manager_id,
  createdBy,
  companyId
) => {
  const result = await db.query(
    `INSERT INTO workspaces 
     (name, type_id, manager_id, created_by, company_id, created_at)
     VALUES ($1, $2, $3, $4, $5, NOW())
     RETURNING *`,
    [name, typeId, manager_id, createdBy, companyId]
  );

  return result.rows[0];
};

// ✅ Insert Workspace Users
exports.insertWorkspaceUser = async (workspaceId, userId) => {
  await db.query(
    `INSERT INTO workspace_users (workspace_id, user_id)
     VALUES ($1, $2)`,
    [workspaceId, userId]
  );
};

// ✅ Fetch Workspaces (WITH COMPANY ISOLATION)
exports.fetchWorkspaces = async (companyId, loggedInRole) => {
  let query = `
    SELECT 
        w.*,
        wt.name AS type_name,
        u.name AS manager_name
     FROM workspaces w
     JOIN workspace_types wt ON w.type_id = wt.id
     LEFT JOIN users u ON w.manager_id = u.id
  `;

  const values = [];
  let index = 1;

  if (loggedInRole !== "SUPER_ADMIN") {
    query += ` WHERE w.company_id = $${index}`;
    values.push(companyId);
  }

  const result = await db.query(query, values);
  return result.rows;
};

// ✅ Fetch Workspace Types
exports.fetchWorkspaceTypes = async () => {
  const result = await db.query(`SELECT * FROM workspace_types`);
  return result.rows;
};

// ✅ Delete Workspace (Secure)
exports.deleteWorkspace = async (id, companyId, loggedInRole) => {
  if (loggedInRole === "SUPER_ADMIN") {
    await db.query(`DELETE FROM workspaces WHERE id = $1`, [id]);
  } else {
    await db.query(
      `DELETE FROM workspaces WHERE id = $1 AND company_id = $2`,
      [id, companyId]
    );
  }
};

// ✅ Toggle Workspace Status (Secure)
exports.toggleWorkspaceStatus = async (id, companyId, loggedInRole) => {
  if (loggedInRole === "SUPER_ADMIN") {
    await db.query(
      `UPDATE workspaces
       SET status = CASE
          WHEN status = 'ACTIVE' THEN 'INACTIVE'
          ELSE 'ACTIVE'
       END
       WHERE id = $1`,
      [id]
    );
  } else {
    await db.query(
      `UPDATE workspaces
       SET status = CASE
          WHEN status = 'ACTIVE' THEN 'INACTIVE'
          ELSE 'ACTIVE'
       END
       WHERE id = $1 AND company_id = $2`,
      [id, companyId]
    );
  }
};

// ✅ Update Workspace (Secure)
exports.updateWorkspace = async (
  id,
  name,
  manager_id,
  companyId,
  loggedInRole
) => {
  let result;

  if (loggedInRole === "SUPER_ADMIN") {
    result = await db.query(
      `UPDATE workspaces
       SET name = $1,
           manager_id = $2
       WHERE id = $3
       RETURNING *`,
      [name, manager_id, id]
    );
  } else {
    result = await db.query(
      `UPDATE workspaces
       SET name = $1,
           manager_id = $2
       WHERE id = $3 AND company_id = $4
       RETURNING *`,
      [name, manager_id, id, companyId]
    );
  }

  return result.rows[0];
};

// ✅ Check Manager Company (ONLY ONE VERSION — OUTSIDE EVERYTHING)
exports.checkManagerCompany = async (managerId) => {
  const result = await db.query(
    `SELECT company_id FROM users WHERE id = $1`,
    [managerId]
  );

  return result.rows[0] || null;
};