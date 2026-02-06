const express = require('express')
const router = express.Router()
const { AuthController } = require('../module1/super-admin/auth/auth.controller')

const authController = new AuthController()

router.post(
  '/auth/login',
  authController.login.bind(authController)
)

module.exports = router
