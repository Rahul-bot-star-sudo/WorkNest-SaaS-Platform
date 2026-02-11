const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/auth.middleware");
const userController = require("./user.controller");

router.post("/", authMiddleware, userController.createUser);

module.exports = router;
