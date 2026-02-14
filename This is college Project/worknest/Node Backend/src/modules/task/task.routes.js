const express = require("express");
const router = express.Router();

const controller = require("./task.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const allowRoles = require("../../middlewares/role.middleware");
router.get(
  "/summary",
  authMiddleware,
  controller.getTaskSummary
);

router.post(
  "/",
  authMiddleware,
  allowRoles(["MANAGER", "ADMIN"]),
  controller.createTask
);
router.get(
  "/project/:projectId",
  authMiddleware,
  allowRoles(["MANAGER", "ADMIN"]),
  controller.getTasksByProject
);
router.patch(
  "/:id",
  authMiddleware,
  allowRoles(["MANAGER", "ADMIN","EMPLOYEE","INTERN"]),
  controller.updateTask
);
router.delete(
  "/:id",
  authMiddleware,
  allowRoles(["MANAGER", "ADMIN"]),
  controller.deleteTask
);

router.get(
  "/my-tasks",
  authMiddleware,
  controller.getMyTasks
);

module.exports = router;
