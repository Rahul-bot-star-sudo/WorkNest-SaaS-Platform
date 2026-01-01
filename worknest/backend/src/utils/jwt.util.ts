import jwt from 'jsonwebtoken'

export class JwtUtil {

  static generate(payload: {
    userId: string
    role: string
  }): string {

    const secret = process.env.JWT_SECRET || 'dev-secret'

    return jwt.sign(payload, secret, {
      expiresIn: '1h'
    })
  }
}
