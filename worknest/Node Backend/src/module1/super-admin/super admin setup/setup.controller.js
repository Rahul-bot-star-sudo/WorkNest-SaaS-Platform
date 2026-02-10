// setup.controller.js

// ✅ INSTANCE import (NO destructuring)
const setupService = require('./setup.service');

class SetupController {

  constructor() {
    // ✅ already-created service instance use karo
    this.setupService = setupService;
  }

  async createSuperAdmin(req, res) {
    try {
      // STEP 1: Receive HTTP request
      const { name, email, password } = req.body;

      // STEP 2: Build DTO
      const dto = { name, email, password };

      // STEP 3: Call service
      const result = await this.setupService.createSuperAdmin(dto);

      // STEP 4: Send success response
      return res.status(201).json({
        success: true,
        message: result.message
      });

    } catch (error) {
      // STEP 5: Error response
      return res.status(400).json({
        success: false,
        message: error.message
      });
    }
  }
}

// ✅ CONTROLLER INSTANCE EXPORT
module.exports = new SetupController();
