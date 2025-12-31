// src/modules/auth/utils/password.util.ts

/*
🧠 PURPOSE (Beginner Samjho)

Ye file sirf PASSWORD se related kaam karti hai:
1. Password strong hai ya nahi check karna
2. Password ko secure form me convert (hash) karna

👉 Security ka code yahin isolate hota hai
👉 Service / Controller clean rehte hain
*/

import * as bcrypt from 'bcrypt'

export class PasswordUtil {

  // STEP 1 + STEP 2: Check password strength
  static checkStrength(password: string): void {

    // STEP 1: Check password length
    if (password.length < 8) {
      throw new Error('Password must be at least 8 characters long')
    }

    // STEP 2: Check complexity (simple version for beginner)
    const hasNumber = /\d/.test(password)
    const hasLetter = /[a-zA-Z]/.test(password)

    if (!hasNumber || !hasLetter) {
      throw new Error('Password must contain letters and numbers')
    }
  }

  // STEP 3: Hash password using bcrypt
  static async hash(password: string): Promise<string> {

    const saltRounds = 10

    // bcrypt password ko unreadable bana deta hai
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    return hashedPassword
  }

}
