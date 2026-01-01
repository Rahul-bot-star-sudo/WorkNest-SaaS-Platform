// src/modules/auth/auth.service.ts

/*
🧠 PURPOSE (Beginner Samjho)

Ye file AUTH ka poora business logic handle karti hai.

REGISTER:
User create hota hai

LOGIN:
User verify hota hai + token milta hai
*/

import { AuthRepository } from './auth.repository'
import { PasswordUtil } from './utils/password.util'
import { AuthConfig } from './auth.config'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import { JwtUtil } from './utils/jwt.util'

export class AuthService {

  private authRepository = new AuthRepository()

  // ======================
  // LOGIN USER
  // ======================
  async loginUser(dto: LoginDto) {

    // STEP 1: Validate input
    if (!dto.email || !dto.password) {
      throw new Error('Email and password are required')
    }

    // STEP 2: Find user
    const user = await this.authRepository.findByEmail(dto.email)
    if (!user) {
      throw new Error('Invalid email or password')
    }

    // STEP 3: Compare password
    const isValid = await PasswordUtil.compare(
      dto.password,
      user.password
    )

    if (!isValid) {
      throw new Error('Invalid email or password')
    }

    // STEP 4: Check status
    if (user.status !== AuthConfig.DEFAULT_STATUS) {
      throw new Error('User account is inactive')
    }

    // STEP 5: Generate token
    const token = JwtUtil.generate({
      userId: user.id,
      role: user.role
    })

    // STEP 6: Return response
    return {
      token,
      user: {
        email: user.email,
        role: user.role,
        status: user.status
      }
    }
  }

  // ======================
  // REGISTER USER
  // ======================
  async registerUser(dto: RegisterDto) {

    // STEP 1: Validate input
    if (!dto.email || !dto.password) {
      throw new Error('Email and password are required')
    }

    // STEP 2: Check if email already exists
    const existingUser = await this.authRepository.findByEmail(dto.email)
    if (existingUser) {
      throw new Error('User with this email already exists')
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
