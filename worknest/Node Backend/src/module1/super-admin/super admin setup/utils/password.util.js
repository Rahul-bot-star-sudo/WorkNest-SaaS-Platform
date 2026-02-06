const bcrypt = require('bcrypt')

class PasswordUtil {

  // STEP 1 & 2: Check password strength
  static checkStrength(password) {
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long')
    }

    const hasNumber = /\d/.test(password)
    if (!hasNumber) {
      throw new Error('Password must contain at least one number')
    }

    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
    if (!hasSpecialChar) {
      throw new Error('Password must contain at least one special character')
    }
  }

  // STEP 3: Hash password
  static async hash(password) {
    const saltRounds = 10
    return bcrypt.hash(password, saltRounds)
  }

  // ✅ STEP 4: Compare password (LOGIN KE LIYE)
  static async compare(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword)
  }
}

module.exports = { PasswordUtil }
