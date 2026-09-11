// src/modules/auth/auth.service.ts

/*
🧠 PURPOSE

AUTH ka poora business logic yahan hota hai.

REGISTER:
- user create
- password hash
- role + status assign

LOGIN:
- credentials verify
- access + refresh token generate
*/

import { AuthRepository } from './auth.repository'
import { PasswordUtil } from '../../utils/password.util'
import { AuthConfig } from './auth.config'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { AppError } from '../../utils/AppError'
import { generateAccessToken, generateRefreshToken } from '../../utils/token.util'
import jwt from 'jsonwebtoken'

export class AuthService {

  private authRepository = new AuthRepository()

  // ======================
  // LOGIN USER
  // ======================
  async loginUser(dto: LoginDto) {

    // STEP 1: Validate input
    if (!dto.email || !dto.password) {
      throw new AppError('Email and password are required', 400)
    }

    // STEP 2: Find user
    const user = await this.authRepository.findByEmail(dto.email)
    if (!user) {
      throw new AppError('Invalid email or password', 401)
    }

    // STEP 3: Compare password
    const isValid = await PasswordUtil.compare(
      dto.password,
      user.password
    )

    if (!isValid) {
      throw new AppError('Invalid email or password', 401)
    }

    // STEP 4: Check status
    if (user.status !== AuthConfig.DEFAULT_STATUS) {
      throw new AppError('User account is inactive', 403)
    }

    // STEP 5: Prepare token payload
    const payload = {
      userId: user.id,
      role: user.role
    }

    // STEP 6: Generate tokens
    const accessToken = generateAccessToken(payload)
    const refreshToken = generateRefreshToken(payload)

    // 🔥 FUTURE: save refreshToken in DB (rotation / logout)

    // STEP 7: Return response
    return {
      accessToken,
      refreshToken,
      user: {
        email: user.email,
        role: user.role,
        status: user.status
      }
    }
  }

  // ======================
  // REFRESH ACCESS TOKEN
  // ======================
  async refreshAccessToken(refreshToken: string) {

    if (!refreshToken) {
      throw new AppError('Refresh token required', 400)
    }

    try {
      const decoded: any = jwt.verify(
        refreshToken,
        process.env.JWT_SECRET!
      )

      const newAccessToken = generateAccessToken({
        userId: decoded.userId,
        role: decoded.role
      })

      return { accessToken: newAccessToken }

    } catch (error) {
      throw new AppError('Invalid refresh token', 401)
    }
  }

  // ======================
  // REGISTER USER
  // ======================
  async registerUser(dto: RegisterDto) {

    // STEP 1: Validate input
    if (!dto.email || !dto.password) {
      throw new AppError('Email and password are required', 400)
    }

    // STEP 2: Check if email already exists
    const existingUser = await this.authRepository.findByEmail(dto.email)
    if (existingUser) {
      throw new AppError('User with this email already exists', 409)
    }

    // STEP 3: Check password strength
    PasswordUtil.checkStrength(dto.password)

    // STEP 4: Hash password
    const hashedPassword = await PasswordUtil.hash(dto.password)

    // STEP 5: Prepare user object
    const user = {
      email: dto.email,
      password: hashedPassword,
      role: AuthConfig.DEFAULT_ROLE,
      status: AuthConfig.DEFAULT_STATUS
    }

    // STEP 6: Save user
    const savedUser = await this.authRepository.save(user)

    // STEP 7: Return safe response
    return {
      email: savedUser.email,
      role: savedUser.role,
      status: savedUser.status
    }
  }
}
