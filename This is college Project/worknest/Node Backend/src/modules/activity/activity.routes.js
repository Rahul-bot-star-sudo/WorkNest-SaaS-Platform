const express = require("express");
const router = express.Router();

const controller = require("./activity.controller");
const authMiddleware = require("../../middlewares/auth.middleware");
const allowRoles = require("../../middlewares/role.middleware");

router.get(
  "/",
  authMiddleware,
  allowRoles(["ADMIN", "MANAGER"]),
  controller.getActivities
);
router.get(
  "/summary",
  authMiddleware,
  allowRoles(["ADMIN", "MANAGER"]),
  controller.getTaskSummary
);

module.exports = router;
