// src/middlewares/error.middleware.ts

import { Request, Response, NextFunction } from 'express'
import { AppError } from '../utils/AppError'

export function errorMiddleware(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  // unknown / programming error
  return res.status(500).json({
    status: 'error',
    message: 'Internal Server Error'
  })
}
