import { UserModel } from './user.schema'

export const userRepository = {

  async findByEmail(email: string) {
    // SINGLE document
    return UserModel.findOne({ email })
  },

  async save(user: any) {
    // 🔥 IMPORTANT: user OBJECT hona chahiye, array nahi
    const createdUser = new UserModel(user)
    return createdUser.save()
  }
}
