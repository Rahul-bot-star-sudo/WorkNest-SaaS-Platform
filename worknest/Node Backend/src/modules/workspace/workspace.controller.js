const service = require("./workspace.service");

exports.createWorkspace = async (req, res) => {
  try {
    const workspace = await service.createWorkspace(
      req.body,
      req.user.userId
    );

    return res.status(201).json({
      success: true,
      data: workspace
    });

  } catch (error) {

    // 🔥 PostgreSQL Unique Constraint Error
    if (error.code === "23505") {
      return res.status(400).json({
        success: false,
        message: "Workspace already exists"
      });
    }

    console.error("Workspace Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error creating workspace"
    });
  }
};

exports.getWorkspaces = async (req, res) => {
  try {
    const data = await service.getWorkspaces();

    return res.json({
      success: true,
      data
    });

  } catch (error) {
    console.error("Get Workspaces Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching workspaces"
    });
  }
};

exports.getWorkspaceTypes = async (req, res) => {
  try {
    const data = await service.getWorkspaceTypes();

    return res.json({
      success: true,
      data
    });

  } catch (error) {
    console.error("Get Workspace Types Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error fetching workspace types"
    });
  }
};
