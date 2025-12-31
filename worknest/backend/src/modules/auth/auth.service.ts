// src/modules/auth/auth.service.ts

/*
🧠 PURPOSE (Beginner Samjho)

Ye file poora REGISTER flow control karti hai.

User ka data aata hai
↓
Rules check hote hain
↓
Password secure hota hai
↓
User database me save hota hai
↓
Safe response wapas jata hai
*/

import { AuthRepository } from './auth.repository'
import { PasswordUtil } from './utils/password.util'
import { AuthConfig } from './auth.config'
import { RegisterDto } from './dto/register.dto'



export class AuthService {

  private authRepository = new AuthRepository()

  async registerUser(dto: RegisterDto) {

    // STEP 1: Validate input (email, password)
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

    // STEP 5: Prepare user object (role, status)
    const user = {
      email: dto.email,
      password: hashedPassword,
      role: AuthConfig.DEFAULT_ROLE,
      status: AuthConfig.DEFAULT_STATUS
    }

    // STEP 6: Save user to database
    const savedUser = await this.authRepository.save(user)

    // STEP 7: Remove sensitive fields
    const safeUser = {
  email: savedUser.email,
  role: savedUser.role,
  status: savedUser.status
}
    // STEP 8: Return safe response
    return savedUser
  }

}
