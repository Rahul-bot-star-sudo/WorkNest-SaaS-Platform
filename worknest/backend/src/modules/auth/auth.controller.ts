// src/modules/auth/auth.controller.ts

/*
🧠 PURPOSE

HTTP request handling only.

✅ request receive
✅ DTO prepare
✅ service call
✅ response return

❌ business logic nahi
❌ DB logic nahi
❌ token generation logic nahi
*/

import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'
import { AppError } from '../../utils/AppError'

export class AuthController {

  private authService = new AuthService()

  // 🔐 LOGIN
  async login(req: any, res: any, next: any) {
    try {
      const { email, password } = req.body

      if (!email || !password) {
        throw new AppError('Email and password are required', 400)
      }

      const result = await this.authService.loginUser({ email, password })

      return res.status(200).json({
        message: 'Login successful',
        data: result
      })
    } catch (error) {
      next(error) // 🔥 global error handler
    }
  }

  // 📝 REGISTER
  async register(req: any, res: any, next: any) {
    try {
      const dto: RegisterDto = {
        email: req.body.email,
        password: req.body.password
      }

      if (!dto.email || !dto.password) {
        throw new AppError('Email and password are required', 400)
      }

      const user = await this.authService.registerUser(dto)

      return res.status(201).json({
        message: 'User registered successfully',
        data: user
      })
    } catch (error) {
      next(error) // 🔥 global error handler
    }
  }

  // 🔁 REFRESH ACCESS TOKEN
  async refresh(req: any, res: any, next: any) {
    try {
      const { refreshToken } = req.body

      if (!refreshToken) {
        throw new AppError('Refresh token required', 400)
      }

      const result = await this.authService.refreshAccessToken(refreshToken)

      return res.status(200).json({
        message: 'Access token refreshed',
        data: result
      })
    } catch (error) {
      next(error) // 🔥 global error handler
    }
  }
}
