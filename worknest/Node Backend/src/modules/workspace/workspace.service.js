const repository = require("./workspace.repository");
exports.createWorkspace = async (data, loggedInUserId) => {
  const { name, typeId, manager_id } = data;

  if (!name || !typeId || !manager_id) {
    throw new Error("All fields are required");
  }

  const workspace = await repository.insertWorkspace(
    name,
    typeId,
    manager_id,
    loggedInUserId
  );

  return workspace;
};

exports.getWorkspaces = async () => {
  return await repository.fetchWorkspaces();
};

exports.getWorkspaceTypes = async () => {
  return await repository.fetchWorkspaceTypes();
};

exports.deleteWorkspace = async (id) => {
  return await repository.deleteWorkspace(id);
};

exports.toggleWorkspaceStatus = async (id) => {
  return await repository.toggleWorkspaceStatus(id);
};
exports.updateWorkspace = async (id, data) => {
  const { name, manager_id } = data;

  if (!name || !manager_id) {
    throw new Error("Name and Manager are required");
  }

  return await repository.updateWorkspace(id, name, manager_id);
};

