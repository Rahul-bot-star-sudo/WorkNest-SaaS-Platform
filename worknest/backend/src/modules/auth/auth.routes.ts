// src/modules/auth/auth.routes.ts

/*
🧠 PURPOSE (Beginner Samjho)

Ye file sirf URL ko controller se jodti hai.

Yahan:
❌ business logic nahi
❌ password logic nahi
❌ database logic nahi

✅ sirf:
POST /register  →  AuthController.register
*/

import { Router } from 'express'
import { AuthController } from './auth.controller'

const router = Router()
const authController = new AuthController()

// ✅ controller ka instance banao (MISSING THA)
const controller = new AuthController()
// POST /register
router.post('/register', (req, res) => {
  authController.register(req, res)
})
router.post('/login', controller.login.bind(controller))


export default router
