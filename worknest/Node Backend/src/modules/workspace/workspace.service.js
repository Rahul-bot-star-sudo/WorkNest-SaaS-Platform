const repository = require("./workspace.repository");

exports.createWorkspace = async (data, userId) => {
 const { name, typeId, userIds = [] } = data;

  const workspace = await repository.insertWorkspace(
    name,
    typeId,
    userId
  );

  for (let userId of userIds) {
    await repository.insertWorkspaceUser(workspace.id, userId);
  }

  return workspace;
};

exports.getWorkspaces = async () => {
  return await repository.fetchWorkspaces();
};

exports.getWorkspaceTypes = async () => {
  return await repository.fetchWorkspaceTypes();
};
