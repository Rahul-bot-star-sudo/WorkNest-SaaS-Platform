import { Request, Response } from 'express'
import { registerUser } from './auth.service'

export async function registerController(req: Request, res: Response) {
  try {
    console.log('REGISTER API HIT', req.body)

    const result = await registerUser(req.body)

    // 🔥 RESPONSE MUST BE RETURNED
    return res.status(201).json(result)

  } catch (err: any) {
    console.error('REGISTER ERROR:', err)

    return res.status(400).json({
      message: err.message || 'Registration failed'
    })
  }
}
