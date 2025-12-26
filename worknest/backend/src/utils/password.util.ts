import bcrypt from 'bcrypt'

export function isStrongPassword(password: string): boolean {
  return password.length >= 8
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10)
}
