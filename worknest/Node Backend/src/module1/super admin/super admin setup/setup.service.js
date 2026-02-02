// setup.service.js
const SystemRepository = require('../system/system.repository')

class SetupService {

  constructor() {
    this.systemRepository = new SystemRepository()
  }

  async createSuperAdmin(dto) {

    // STEP-1: Guard clause – check if setup already completed
    const isSetupDone = await this.systemRepository.isSetupCompleted()

    if (isSetupDone) {
      throw new Error('Super Admin setup already completed')
    }

    // STEP-2 se aage ka logic baad me aayega
  }

}

module.exports = SetupService
