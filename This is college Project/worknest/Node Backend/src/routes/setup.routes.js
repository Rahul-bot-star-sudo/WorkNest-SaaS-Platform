const express = require('express')
const router = express.Router()
const { SetupController } = require('../module1/super-admin/super admin setup/setup.controller')

const setupController = new SetupController()

router.post(
  '/setup/super-admin',
  setupController.createSuperAdmin.bind(setupController)
)

module.exports = router
