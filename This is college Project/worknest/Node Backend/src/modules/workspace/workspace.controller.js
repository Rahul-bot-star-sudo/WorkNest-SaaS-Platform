const service = require("./workspace.service");
const pool = require("../../config/db");

// ✅ Create Workspace
exports.createWorkspace = async (req, res) => {
  try {
    const workspace = await service.createWorkspace(
      req.body,
      req.user
    );

    return res.status(201).json({
      success: true,
      data: workspace
    });

  } catch (error) {
    if (error.code === "23505") {
      return res.status(400).json({
        success: false,
        message: "Workspace already exists"
      });
    }

    console.error("Workspace Error:", error);

    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// ✅ Get Workspaces
exports.getWorkspaces = async (req, res) => {
  try {
    const data = await service.getWorkspaces(req.user);

    return res.status(200).json({
      success: true,
      data
    });

  } catch (error) {
    console.error("Get Workspaces Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ✅ Get Workspace Types
exports.getWorkspaceTypes = async (req, res) => {
  try {
    const data = await service.getWorkspaceTypes();

    res.json({
      success: true,
      data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ✅ Delete Workspace
exports.deleteWorkspace = async (req, res) => {
  try {
    await service.deleteWorkspace(
      req.params.id,
      req.user
    );

    res.json({
      success: true,
      message: "Workspace deleted successfully"
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// ✅ Toggle Status
exports.toggleWorkspaceStatus = async (req, res) => {
  try {
    await service.toggleWorkspaceStatus(
      req.params.id,
      req.user
    );

    res.json({
      success: true,
      message: "Workspace status updated"
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// ✅ Update Workspace
exports.updateWorkspace = async (req, res) => {
  try {
    const updated = await service.updateWorkspace(
      req.params.id,
      req.body,
      req.user
    );

    res.json({
      success: true,
      data: updated
    });

  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// ✅ My Workspaces
exports.getMyWorkspaces = async (req, res) => {
  try {
    const managerId = req.user.userId;

    const result = await pool.query(
      "SELECT * FROM workspaces WHERE manager_id = $1",
      [managerId]
    );

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};