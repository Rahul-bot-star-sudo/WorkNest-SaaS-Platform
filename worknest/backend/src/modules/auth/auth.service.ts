import { RegisterDTO } from './dto/register.dto'
import { DEFAULT_ROLE } from './auth.config'

export class AuthService {
  registerUser(dto: RegisterDTO) {
    // STEP 1: validate
    if (!dto.email) throw new Error('Email required')
    if (!dto.password) throw new Error('Password required')

    // STEP 2: password strength
    if (dto.password.length < 8)
      throw new Error('Weak password')

    // STEP 3: create user (temporary, DB later)
    const user = {
      email: dto.email,
      role: DEFAULT_ROLE,
    }

    // STEP 4: return safe response
    return user
  }
}
