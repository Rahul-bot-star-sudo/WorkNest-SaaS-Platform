const { SetupService } = require('./setup.service')

class SetupController {

  constructor() {
    // controller khud service create karega
    this.setupService = new SetupService()
  }

  async createSuperAdmin(req, res) {
    try {
      // STEP 1: Receive HTTP request
      const body = req.body

      // STEP 2: Extract name, email, password
      const { name, email, password } = body

      // STEP 3: Create DTO (simple object)
      const dto = {
        name,
        email,
        password
      }

      // STEP 4: Call service
      const result = await this.setupService.createSuperAdmin(dto)

      // STEP 5: Send success response
      return res.status(201).json(result)

    } catch (error) {
      // STEP 6: Handle error & send error response
      return res.status(400).json({
        message: error.message
      })
    }
  }
}

module.exports = { SetupController }
