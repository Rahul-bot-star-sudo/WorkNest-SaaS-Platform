const service = require("./workspace.service");

exports.createWorkspace = async (req, res) => {
  try {
    // 🔥 Correct field from JWT
    const workspace = await service.createWorkspace(
      req.body,
      req.user.userId
    );

    res.status(201).json({
      success: true,
      data: workspace
    });

  } catch (error) {
    console.error("Workspace Error:", error);  // Debug ke liye
    res.status(500).json({
      success: false,
      message: "Error creating workspace"
    });
  }
};

exports.getWorkspaces = async (req, res) => {
  try {
    const data = await service.getWorkspaces();

    res.json({
      success: true,
      data
    });

  } catch (error) {
    console.error("Get Workspaces Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching workspaces"
    });
  }
};

exports.getWorkspaceTypes = async (req, res) => {
  try {
    const data = await service.getWorkspaceTypes();

    res.json({
      success: true,
      data
    });

  } catch (error) {
    console.error("Get Workspace Types Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching workspace types"
    });
  }
};
