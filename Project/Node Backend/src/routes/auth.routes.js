const router = require("express").Router();

const AuthController = require("../modules/auth/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const roleMiddleware = require("../middlewares/role.middleware");

router.post(
  "/login",
  AuthController.login
);

router.post(
  "/register",
  authMiddleware,
  roleMiddleware(90),
  AuthController.registerUser
);

router.post(
  "/refresh-token",
  AuthController.refreshToken
);

module.exports = router;
