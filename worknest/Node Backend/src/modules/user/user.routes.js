const express = require("express");
const router = express.Router();

const authMiddleware = require("../../middlewares/auth.middleware");
const userController = require("./user.controller");

router.post("/", authMiddleware, userController.createUser);

// ⚠️ Ye tabhi rakho jab controller me function ho
router.get("/", authMiddleware, userController.getUsers);
router.put("/:id/role", authMiddleware, userController.updateUserRole);
router.patch("/:id/status", authMiddleware, userController.toggleUserStatus);
router.delete("/:id", authMiddleware, userController.deleteUser);

module.exports = router;
