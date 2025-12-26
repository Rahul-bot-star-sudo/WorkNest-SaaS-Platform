import { Request, Response } from 'express'
import { AuthService } from './auth.service'

export class AuthController {
  private authService: AuthService

  constructor() {
    this.authService = new AuthService()
  }

  register(req: Request, res: Response) {
    try {
      const { email, password } = req.body

      const result = this.authService.registerUser({
        email,
        password,
      })

      res.status(201).json(result)
    } catch (error: any) {
      res.status(400).json({ message: error.message })
    }
  }
}
