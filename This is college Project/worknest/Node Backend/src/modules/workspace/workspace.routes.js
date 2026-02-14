const express = require("express");
const router = express.Router();

const controller = require("./workspace.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const allowRoles = require("../../middlewares/role.middleware");

router.post(
  "/",
  authMiddleware,
  allowRoles(["ADMIN"]),
  controller.createWorkspace
);

router.get(
  "/",
  authMiddleware,
  allowRoles(["ADMIN"]),
  controller.getWorkspaces
);

router.get(
  "/types",
  authMiddleware,
  controller.getWorkspaceTypes
);

router.delete("/:id", authMiddleware, controller.deleteWorkspace);

router.patch("/:id/status", authMiddleware, controller.toggleWorkspaceStatus);

router.put("/:id", authMiddleware, controller.updateWorkspace);

router.get(
  "/my-workspaces",
  authMiddleware,
  allowRoles(["MANAGER"]),
  controller.getMyWorkspaces
);
router.patch(
  "/:id/owner",
  authMiddleware,
  allowRoles(["MANAGER", "ADMIN"]),
  controller.updateProjectOwner
);

module.exports = router;
