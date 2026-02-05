// RECEIVE request
// EXTRACT dto
// CALL service
// SEND response
// HANDLE error
// setup.controller.js
class SetupController {
  constructor(setupService) {
    this.setupService = setupService
  }

  async createSuperAdmin(req, res) {
    try {
      // STEP 1: Receive HTTP request

      // STEP 2: Extract name, email, password from req.body

      // STEP 3: Create SetupSuperAdminDto

      // STEP 4: Call setupService.createSuperAdmin(dto)

      // STEP 5: Send success response

    } catch (error) {
      // STEP 6: Handle error & send error response
    }
  }
}

module.exports = SetupController
