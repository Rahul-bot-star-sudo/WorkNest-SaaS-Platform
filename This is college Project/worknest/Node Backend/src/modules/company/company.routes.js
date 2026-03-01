const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middlewares/auth.middleware");
const roleMiddleware = require("../../middlewares/role.middleware");
const companyController = require("./company.controller");

router.post(
  "/",
  authMiddleware,
  roleMiddleware(["SUPER_ADMIN"]),
  companyController.createCompany
);

router.get(
  "/",
  authMiddleware,
  roleMiddleware(["SUPER_ADMIN"]),
  companyController.getAllCompanies
);

module.exports = router;