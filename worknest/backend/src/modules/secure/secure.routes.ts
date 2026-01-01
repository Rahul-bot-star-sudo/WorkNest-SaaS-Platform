// src/modules/secure/secure.routes.ts

/*
🧠 PURPOSE
Protected routes define karta hai

Flow:
Client → JWT auth → Role check → Controller
*/

import { Router } from 'express'
import { authMiddleware } from '../../middlewares/auth.middleware'
import { roleMiddleware } from '../../middlewares/role.middleware'
import { SecureController } from './secure.controller'

const router = Router()

// ✅ Single controller instance
const secureController = new SecureController()

// GET /secure/data
router.get(
  '/data',
  authMiddleware,                   // STEP 1: JWT verification
  roleMiddleware(['MEMBER', 'ADMIN']), // STEP 2: Role authorization
  secureController.getSecureData.bind(secureController) // STEP 3: Controller
)

export default router
