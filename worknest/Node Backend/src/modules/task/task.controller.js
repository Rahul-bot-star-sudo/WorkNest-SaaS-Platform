const service = require("./task.service");
const activityService = require("../activity/activity.service");

exports.createTask = async (req, res) => {
  try {

    const task = await service.createTask(
      req.body,
      req.user.userId
    );

    // Log activity for task creation
    await activityService.logActivity(
      req.user.userId,
      `Created task "${task.title}"`,
      task.id
    );

    // Log activity for initial task assignment (if assigned to someone)
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
    res.status(500).json({
      success: false,
      message: "Error creating task"
    });
  }
};

exports.getTasksByProject = async (req, res) => {
  try {

    const data = await service.getTasksByProject(
      req.params.projectId
    );

    res.json({
      success: true,
      count: data.length,
      data
    });

  } catch (error) {
    console.error("Get Tasks Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching tasks"
    });
  }
};

exports.updateTask = async (req, res) => {
  try {

    const updated = await service.updateTask(
      req.params.id,
      req.body
    );

    // Log activity for status change
    if (req.body.status) {
      await activityService.logActivity(
        req.user.userId,
        `Updated task status to ${req.body.status}`,
        req.params.id
      );
    }

    // Log activity for assignment change
    if (req.body.assigned_to) {
      await activityService.logActivity(
        req.user.userId,
        `Assigned task to user ID ${req.body.assigned_to}`,
        req.params.id
      );
    }

    // Log general update if no specific field is being updated
    if (!req.body.status && !req.body.assigned_to && req.body.priority) {
      await activityService.logActivity(
        req.user.userId,
        `Updated task priority to ${req.body.priority}`,
        req.params.id
      );
    }

    // Fallback for other updates
    if (!req.body.status && !req.body.assigned_to && !req.body.priority) {
      await activityService.logActivity(
        req.user.userId,
        `Updated task`,
        req.params.id
      );
    }

    res.json({
      success: true,
      data: updated
    });

  } catch (error) {
    console.error("Update Task Error:", error);
    res.status(500).json({
      success: false,
      message: "Error updating task"
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    
    // First get task details to log the title
    const task = await service.getTaskById(req.params.id);
    
    await service.deleteTask(req.params.id);

    // Log activity for task deletion with task title
    await activityService.logActivity(
      req.user.userId,
      `Deleted task "${task?.title || 'Unknown'}"`,
      req.params.id
    );

    res.json({
      success: true,
      message: "Task deleted successfully"
    });

  } catch (error) {
    console.error("Delete Task Error:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting task"
    });
  }
};

exports.getMyTasks = async (req, res) => {
  try {

    const tasks = await service.getMyTasks(req.user.userId);

    res.json({
      success: true,
      count: tasks.length,
      data: tasks
    });

  } catch (error) {
    console.error("Get My Tasks Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching my tasks"
    });
  }
};exports.getTaskSummary = async (req, res) => {
  try {

    const summary = await service.getTaskSummary();

    res.json({
      success: true,
      data: summary
    });

  } catch (error) {

    console.error("SUMMARY ERROR:", error);  // 👈 ADD THIS

    res.status(500).json({
      success: false,
      message: "Error fetching task summary"
    });
  }
};
