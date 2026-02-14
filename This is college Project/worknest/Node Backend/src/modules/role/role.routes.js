const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/auth.middleware");
const roleController = require("./role.controller");

router.get("/creatable", authMiddleware, roleController.getCreatableRoles);

module.exports = router;
