const express = require("express");
const router = express.Router();

const controller = require("./project.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const allowRoles = require("../../middlewares/role.middleware");

router.post(
  "/",
  authMiddleware,
  allowRoles(["MANAGER", "ADMIN"]),
  controller.createProject
);
router.get(
  "/workspace/:workspaceId",
  authMiddleware,
  allowRoles(["MANAGER", "ADMIN"]),
  controller.getProjectsByWorkspace
);
router.patch(
  "/:id/status",
  authMiddleware,
  allowRoles(["MANAGER", "ADMIN"]),
  controller.updateProjectStatus
);


module.exports = router;
