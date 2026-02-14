const service = require("./workspace.service");
const pool = require("../../config/db");

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

exports.deleteWorkspace = async (req, res) => {
  try {
    await service.deleteWorkspace(req.params.id);

    return res.json({
      success: true,
      message: "Workspace deleted successfully"
    });

  } catch (error) {
    console.error("Delete Workspace Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error deleting workspace"
    });
  }
};

exports.toggleWorkspaceStatus = async (req, res) => {
  try {
    await service.toggleWorkspaceStatus(req.params.id);

    return res.json({
      success: true,
      message: "Workspace status updated"
    });

  } catch (error) {
    console.error("Toggle Status Error:", error);

    return res.status(500).json({
      success: false,
      message: "Error updating status"
    });
  }
};

exports.updateWorkspace = async (req, res) => {
  try {
    const updated = await service.updateWorkspace(
      req.params.id,
      req.body
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
exports.getMyWorkspaces = async (req, res) => {
  try {
    console.log("REQ.USER:", req.user);

    const managerId = req.user.userId;   // abhi ye hi rakho

    console.log("Manager ID Used:", managerId);

    const result = await pool.query(
      "SELECT * FROM workspaces WHERE manager_id = $1",
      [managerId]
    );

    console.log("DB RESULT:", result.rows);

    res.json({
      success: true,
      count: result.rows.length,
      data: result.rows
    });

  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
exports.updateProjectOwner = async (req, res) => {
  try {

    const updated = await service.updateProjectOwner(
      req.params.id,
      req.body.owner_id
    );

    res.json({
      success: true,
      data: updated
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
