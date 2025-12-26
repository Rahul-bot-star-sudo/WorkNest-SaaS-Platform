import bcrypt from 'bcryptjs'
import { userRepository } from '../user/user.repository'

export async function registerUser(dto: any) {
  const { email, password } = dto

  if (!email || !password) {
    throw new Error('Email and password required')
  }

  const existingUser = await userRepository.findByEmail(email)
  if (existingUser) {
    throw new Error('Email already exists')
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const savedUser = await userRepository.save({
    email,
    password: hashedPassword,
    role: 'MEMBER',
    status: 'ACTIVE'
  })

  // ✅ savedUser is SINGLE document now
  return {
    email: savedUser.email,
    role: savedUser.role,
    status: savedUser.status
  }
}
