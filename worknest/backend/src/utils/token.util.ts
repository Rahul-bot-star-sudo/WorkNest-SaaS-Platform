// src/utils/token.util.ts
import jwt from 'jsonwebtoken'

export function generateAccessToken(payload: any) {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '15m'
  })
}

export function generateRefreshToken(payload: any) {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '7d'
  })
}
