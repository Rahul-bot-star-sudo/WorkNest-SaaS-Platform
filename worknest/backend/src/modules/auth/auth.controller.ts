// src/modules/auth/auth.controller.ts

/*
🧠 PURPOSE (Beginner Samjho)

Ye file HTTP request ko handle karti hai.

Yahan:
✅ request aati hai
✅ data nikala jata hai
✅ service ko diya jata hai
✅ response wapas bheja jata hai

❌ yahan password hash nahi hota
❌ yahan database ka kaam nahi hota
*/

import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'

export class AuthController {

  private authService = new AuthService()

  async register(req: any, res: any) {
    try {
      // STEP 1: Receive request
      // (req.body ke andar client ka data hota hai)

      // STEP 2: Extract email & password into DTO
      const dto: RegisterDto = {
        email: req.body.email,
        password: req.body.password
      }

      // STEP 3: Call authService.registerUser(dto)
      const user = await this.authService.registerUser(dto)

      // STEP 4: Send success response
      return res.status(201).json({
        message: 'User registered successfully',
        data: user
      })

    } catch (error: any) {

      // STEP 5: Handle error & send error response
      return res.status(400).json({
        message: error.message || 'Registration failed'
      })
    }
  }

}
