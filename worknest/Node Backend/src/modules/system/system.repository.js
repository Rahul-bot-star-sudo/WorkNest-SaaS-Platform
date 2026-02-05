// CHECK setup flag
// UPDATE setup flag
// system.repository.js
class SystemRepository {

  async isSetupCompleted() {
    // STEP 1: Read setup_completed flag from database
  }

  async markSetupCompleted() {
    // STEP 2: Update setup_completed flag to true
  }

}

module.exports = SystemRepository
