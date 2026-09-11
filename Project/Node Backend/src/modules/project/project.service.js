const pool = require("../../config/db");

// ✅ Create Project (Company Safe)
exports.createProject = async (data, loggedInUser) => {

  const { name, description, workspace_id, owner_id } = data;

  if (!name || !workspace_id) {
    throw new Error("Name and Workspace are required");
  }

  const companyId = Number(loggedInUser.companyId);

  // 🔐 Check workspace belongs to same company
  const workspaceCheck = await pool.query(
    "SELECT company_id FROM workspaces WHERE id = $1",
    [workspace_id]
  );

  if (workspaceCheck.rows.length === 0) {
    throw new Error("Workspace not found");
  }

  const workspaceCompanyId = Number(workspaceCheck.rows[0].company_id);

  if (workspaceCompanyId !== companyId) {
    throw new Error("Workspace does not belong to your company");
  }

  const result = await pool.query(
    `INSERT INTO projects 
     (name, description, workspace_id, owner_id, created_by, company_id)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [
      name,
      description || null,
      workspace_id,
      owner_id || null,
      loggedInUser.userId,
      companyId
    ]
  );

  return result.rows[0];
};

// ✅ Get Projects By Workspace (Company Safe)
exports.getProjectsByWorkspace = async (workspaceId, loggedInUser) => {

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
     WHERE p.workspace_id = $1
     AND p.company_id = $2`,
    [workspaceId, loggedInUser.companyId]
  );

  return result.rows;
};

// ✅ Update Project Status (Company Safe)
exports.updateProjectStatus = async (projectId, status, loggedInUser) => {

  const result = await pool.query(
    `UPDATE projects 
     SET status = $1 
     WHERE id = $2 AND company_id = $3
     RETURNING *`,
    [status, projectId, loggedInUser.companyId]
  );

  if (result.rows.length === 0) {
    throw new Error("Project not found or access denied");
  }

  return result.rows[0];
};