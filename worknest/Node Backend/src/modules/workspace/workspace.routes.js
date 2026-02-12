const express = require("express");
const router = express.Router();

const controller = require("./workspace.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const allowRoles = require("../../middlewares/role.middleware");

router.post(
  "/",
  authMiddleware,
  allowRoles("ADMIN"),
  controller.createWorkspace
);

router.get(
  "/",
  authMiddleware,
  allowRoles("ADMIN"),
  controller.getWorkspaces
);

router.get(
  "/types",
  authMiddleware,
  controller.getWorkspaceTypes
);

module.exports = router;
