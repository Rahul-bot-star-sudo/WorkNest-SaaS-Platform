const service = require("./task.service");
const activityService = require("../activity/activity.service");

// ✅ Create Task
exports.createTask = async (req, res) => {
  try {

    const task = await service.createTask(
      req.body,
      req.user   // ✅ FULL USER OBJECT
    );

    // Log activity
    await activityService.logActivity(
      req.user.userId,
      `Created task "${task.title}"`,
      task.id
    );

    if (req.body.assigned_to) {
      await activityService.logActivity(
        req.user.userId,
        `Assigned task to user ID ${req.body.assigned_to}`,
        task.id
      );
    }

    res.status(201).json({
      success: true,
      data: task
    });

  } catch (error) {
    console.error("Create Task Error:", error);

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// ✅ Get Tasks By Project
exports.getTasksByProject = async (req, res) => {
  try {

    const data = await service.getTasksByProject(
      req.params.projectId,
      req.user   // ✅ company filter
    );

    res.json({
      success: true,
      count: data.length,
      data
    });

  } catch (error) {
    console.error("Get Tasks Error:", error);

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// ✅ Update Task
exports.updateTask = async (req, res) => {
  try {

    const updated = await service.updateTask(
      req.params.id,
      req.body,
      req.user   // ✅ company protection
    );

    if (req.body.status) {
      await activityService.logActivity(
        req.user.userId,
        `Updated task status to ${req.body.status}`,
        req.params.id
      );
    }

    if (req.body.assigned_to) {
      await activityService.logActivity(
        req.user.userId,
        `Assigned task to user ID ${req.body.assigned_to}`,
        req.params.id
      );
    }

    if (req.body.priority) {
      await activityService.logActivity(
        req.user.userId,
        `Updated task priority to ${req.body.priority}`,
        req.params.id
      );
    }

    res.json({
      success: true,
      data: updated
    });

  } catch (error) {
    console.error("Update Task Error:", error);

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// ✅ Delete Task
exports.deleteTask = async (req, res) => {
  try {

    await service.deleteTask(
      req.params.id,
      req.user   // ✅ company protection
    );

    await activityService.logActivity(
      req.user.userId,
      `Deleted task`,
      req.params.id
    );

    res.json({
      success: true,
      message: "Task deleted successfully"
    });

  } catch (error) {
    console.error("Delete Task Error:", error);

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// ✅ Get My Tasks
exports.getMyTasks = async (req, res) => {
  try {

    const tasks = await service.getMyTasks(
      req.user   // ✅ company safe
    );

    res.json({
      success: true,
      count: tasks.length,
      data: tasks
    });

  } catch (error) {
    console.error("Get My Tasks Error:", error);

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};


// ✅ Task Summary
exports.getTaskSummary = async (req, res) => {
  try {

    const summary = await service.getTaskSummary(
      req.user   // ✅ company filter
    );

    res.json({
      success: true,
      data: summary
    });

  } catch (error) {
    console.error("SUMMARY ERROR:", error);

    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};