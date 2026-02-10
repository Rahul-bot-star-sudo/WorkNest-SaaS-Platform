// system.repository.js
const db = require('../database/db')

class SystemRepository {

  // STEP 1: Check if setup already completed
  async isSetupCompleted() {
    const query = `
      SELECT value
      FROM system_settings
      WHERE key = 'setup_completed'
      LIMIT 1
    `

    const result = await db.query(query)

    // Agar record nahi mila → setup not completed
    if (result.rows.length === 0) {
      return false
    }

    return result.rows[0].value === true
  }

  // STEP 2: Mark setup as completed
  async markSetupCompleted() {
    const query = `
      INSERT INTO system_settings (key, value)
      VALUES ('setup_completed', true)
      ON CONFLICT (key)
      DO UPDATE SET value = true
    `

    await db.query(query)
  }
}

module.exports = new SystemRepository();