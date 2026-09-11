import jwt from 'jsonwebtoken'

export function authMiddleware(req: any, res: any, next: any) {

  // STEP 1: Read Authorization header
  const authHeader = req.headers.authorization

  // STEP 2: IF token missing → 401
  if (!authHeader) {
    return res.status(401).json({ message: 'Token missing' })
  }

  // STEP 3: Extract token (Bearer <token>)
  const token = authHeader.split(' ')[1]

  try {
    // STEP 4: Verify token
    const payload: any = jwt.verify(token, process.env.JWT_SECRET!)

    // STEP 5: Attach user to request
    req.user = {
      userId: payload.userId,
      role: payload.role
    }

    // STEP 6: Continue
    next()

  } catch (error) {
    // STEP 7: Invalid token
    return res.status(401).json({ message: 'Invalid token' })
  }
}
