const repository = require("./workspace.repository");

// ✅ Create Workspace (WITH COMPANY ISOLATION)
exports.createWorkspace = async (data, loggedInUser) => {
  const { name, typeId, manager_id } = data;

  if (!name || !typeId || !manager_id) {
    throw new Error("All fields are required");
  }

  // 🔎 Normalize company id (handle both companyId & company_id)
  const adminCompanyId =
    loggedInUser.companyId || loggedInUser.company_id;

  if (!adminCompanyId) {
    throw new Error("Admin company not found in token");
  }

  // 🔐 Ensure manager belongs to same company
  const managerCheck = await repository.checkManagerCompany(
    manager_id
  );

  if (!managerCheck) {
    throw new Error("Manager not found");
  }

  const managerCompanyId = managerCheck.company_id;

  // ✅ SAFE comparison (number to number)
  if (
    loggedInUser.role !== "SUPER_ADMIN" &&
    Number(managerCompanyId) !== Number(adminCompanyId)
  ) {
    throw new Error("Manager must belong to same company");
  }

  // ✅ Insert workspace
  const workspace = await repository.insertWorkspace(
    name,
    typeId,
    manager_id,
    loggedInUser.userId,
    adminCompanyId
  );

  return workspace;
};

// ✅ Get Workspaces (WITH COMPANY FILTER)
exports.getWorkspaces = async (loggedInUser) => {
  const adminCompanyId =
    loggedInUser.companyId || loggedInUser.company_id;

  return await repository.fetchWorkspaces(
    adminCompanyId,
    loggedInUser.role
  );
};

// ✅ Workspace Types
exports.getWorkspaceTypes = async () => {
  return await repository.fetchWorkspaceTypes();
};

// ✅ Delete Workspace (SECURE)
exports.deleteWorkspace = async (id, loggedInUser) => {
  const adminCompanyId =
    loggedInUser.companyId || loggedInUser.company_id;

  return await repository.deleteWorkspace(
    id,
    adminCompanyId,
    loggedInUser.role
  );
};

// ✅ Toggle Status (SECURE)
exports.toggleWorkspaceStatus = async (id, loggedInUser) => {
  const adminCompanyId =
    loggedInUser.companyId || loggedInUser.company_id;

  return await repository.toggleWorkspaceStatus(
    id,
    adminCompanyId,
    loggedInUser.role
  );
};

// ✅ Update Workspace (SECURE)
exports.updateWorkspace = async (id, data, loggedInUser) => {
  const { name, manager_id } = data;

  if (!name || !manager_id) {
    throw new Error("Name and Manager are required");
  }

  const adminCompanyId =
    loggedInUser.companyId || loggedInUser.company_id;

  return await repository.updateWorkspace(
    id,
    name,
    manager_id,
    adminCompanyId,
    loggedInUser.role
  );
};