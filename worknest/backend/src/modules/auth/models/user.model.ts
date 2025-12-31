// src/modules/auth/models/user.model.ts

/*
🧠 PURPOSE (Beginner Samjho)

Ye file MongoDB ko batati hai:
User ka data database me kaise store hoga

Yahan:
❌ koi logic nahi
❌ koi validation logic nahi
✅ sirf data ka structure
*/

import mongoose from 'mongoose'

// STEP 1: User ka structure define karo
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  }
})

// STEP 2: Model create karo (MongoDB collection = users)
export const UserModel = mongoose.model('User', userSchema)
