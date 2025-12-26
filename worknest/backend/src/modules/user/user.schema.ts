import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  email: { type: String, unique: true },
  password: String,
  role: String,
  status: String
})

export const UserModel = model('User', userSchema)
