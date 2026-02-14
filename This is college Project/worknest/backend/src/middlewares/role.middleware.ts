export function roleMiddleware(allowedRoles: string[]) {

  return function (req: any, res: any, next: any) {

    // STEP 1: Read user
    const user = req.user

    // STEP 2: IF user missing → 401
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    // STEP 3: Check role
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: 'Forbidden' })
    }

    // STEP 4: Allow request
    next()
  }
}
