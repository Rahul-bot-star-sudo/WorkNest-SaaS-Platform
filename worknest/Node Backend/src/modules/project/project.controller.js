const service = require("./project.service");

exports.createProject = async (req, res) => {
  try {
    const project = await service.createProject(
      req.body,
      req.user.userId
    );

    res.status(201).json({
      success: true,
      data: project
    });

  } catch (error) {
    console.error("Create Project Error:", error);
    res.status(500).json({
      success: false,
      message: "Error creating project"
    });
  }
};
exports.getProjectsByWorkspace = async (req, res) => {
  try {
    const data = await service.getProjectsByWorkspace(
      req.params.workspaceId
    );

    res.json({
      success: true,
      count: data.length,
      data
    });

  } catch (error) {
    console.error("Get Projects Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching projects"
    });
  }
};
exports.updateProjectStatus = async (req, res) => {
  try {
    const updated = await service.updateProjectStatus(
      req.params.id,
      req.body.status
    );

    res.json({
      success: true,
      data: updated
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating status"
    });
  }
};
