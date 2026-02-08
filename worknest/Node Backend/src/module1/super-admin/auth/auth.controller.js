const { AuthService } = require('./auth.service')

class AuthController {

  constructor() {
    this.authService = new AuthService()
  }

  async login(req, res) {
    try {
      // STEP 1: Receive HTTP request
      const { email, password } = req.body

      // STEP 2: Build login DTO (simple object)
      const dto = {
        email,
        password
      }

      // STEP 3: Call login service
      const result = await this.authService.login(dto)

      // STEP 4: Send success response
      return res.status(200).json({
        success: true,
        message: 'Login successful',
        data: result
      })

    } catch (error) {
      // STEP 5: Handle error response
      return res.status(401).json({
        success: false,
        message: error.message
      })
    }
  }
}

module.exports = { AuthController }
