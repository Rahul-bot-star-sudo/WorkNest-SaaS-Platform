// src/modules/auth/auth.repository.ts

/*
🧠 PURPOSE (Beginner Samjho)

Ye file sirf DATABASE se baat karti hai.

Yahan:
❌ koi business rule nahi
❌ koi validation nahi
❌ koi password logic nahi

✅ sirf:
1. User ko email se dhundhna
2. User ko database me save karna
*/

import { UserModel } from './models/user.model'

export class AuthRepository {

  // STEP 1: Query database for user by email
  async findByEmail(email: string) {

    // 🔹 MongoDB me user search karo email ke base par
    // 🔹 Agar user mila → object return hoga
    // 🔹 Agar nahi mila → null return hoga

    return await UserModel.findOne({ email })
  }

  // STEP 2: Save user in database
  async save(user: any) {

    // 🔹 Naya MongoDB document banao
    const newUser = new UserModel(user)

    // 🔹 Database me permanently save karo
    const savedUser = await newUser.save()

    return savedUser
  }

}
