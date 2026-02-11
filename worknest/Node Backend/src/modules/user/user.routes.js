const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/auth.middleware");
const userController = require("./user.controller");

router.post("/", authMiddleware, userController.createUser);

// ⚠️ Ye tabhi rakho jab controller me function ho
router.get("/", authMiddleware, userController.getUsers);

module.exports = router;
