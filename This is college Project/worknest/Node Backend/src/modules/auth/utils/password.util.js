const bcrypt = require('bcrypt');

class PasswordUtil {

  static async compare(plain, hashed) {
 
    const result = await bcrypt.compare(plain, hashed);
   
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
