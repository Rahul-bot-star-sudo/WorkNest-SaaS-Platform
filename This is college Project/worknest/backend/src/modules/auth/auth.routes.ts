// src/modules/auth/auth.routes.ts

/*
🧠 PURPOSE

Ye file sirf URL ko controller se connect karti hai.

❌ Business logic nahi
❌ DB logic nahi
❌ Password / JWT logic nahi

✅ Sirf routing + controller binding
*/

import { Router } from 'express'
import { AuthController } from './auth.controller'

const router = Router()

// ✅ Single controller instance (BEST PRACTICE)
const authController = new AuthController()

// 📝 REGISTER
// POST /auth/register
router.post(
  '/register',
  authController.register.bind(authController)
)

// 🔐 LOGIN
// POST /auth/login
router.post(
  '/login',
  authController.login.bind(authController)
)

// 🔁 REFRESH ACCESS TOKEN
// POST /auth/refresh
router.post(
  '/refresh',
  authController.refresh.bind(authController)
)

export default router
