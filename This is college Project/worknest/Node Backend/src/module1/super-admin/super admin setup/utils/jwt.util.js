const jwt = require('jsonwebtoken')

class JwtUtil {
  static sign(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '1h'
    })
  }
}

module.exports = { JwtUtil }
