const bcrypt = require('bcrypt');

class PasswordUtil {

  static async compare(plain, hashed) {
    console.log('PASSWORD UTIL CALLED');
    console.log('PLAIN:', plain);
    console.log('HASH:', hashed);

    const result = await bcrypt.compare(plain, hashed);
    console.log('BCRYPT COMPARE RESULT:', result);

    return result;
  }

  static async hash(plain) {
    return bcrypt.hash(plain, 10);
  }

  static checkStrength(password) {
    if (password.length < 6) {
      throw new Error('Password too weak');
    }
  }
}

module.exports = PasswordUtil;
