// setup.routes.js

const express = require('express');
const router = express.Router();

// ✅ INSTANCE import (NO new)
const setupController = require('../module1/super-admin/super admin setup/setup.controller');

router.post(
  '/super-admin',
  setupController.createSuperAdmin.bind(setupController)
);

module.exports = router;
