const service = require("./project.service");

// ✅ Create Project
exports.createProject = async (req, res) => {
  try {

    const project = await service.createProject(
      req.body,
      req.user   // ✅ FULL USER OBJECT PASS KARNA HAI
    );

    res.status(201).json({
      success: true,
      data: project
    });

  } catch (error) {
    console.error("Create Project Error:", error);

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// ✅ Get Projects By Workspace
exports.getProjectsByWorkspace = async (req, res) => {
  try {

    const data = await service.getProjectsByWorkspace(
      req.params.workspaceId,
      req.user   // ✅ company filter ke liye zaroori
    );

    res.json({
      success: true,
      count: data.length,
      data
    });

  } catch (error) {
    console.error("Get Projects Error:", error);

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// ✅ Update Project Status
exports.updateProjectStatus = async (req, res) => {
  try {

    const updated = await service.updateProjectStatus(
      req.params.id,
      req.body.status,
      req.user   // ✅ company protection ke liye
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