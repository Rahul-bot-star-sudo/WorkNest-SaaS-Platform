// src/modules/auth/dto/register.dto.ts

/*
🧠 PURPOSE (Beginner Samjho)

Ye file sirf ye batati hai:
Register karte time
- email aayega (text)
- password aayega (text)

Yahan:
❌ koi logic nahi
❌ koi validation nahi
✅ sirf data ka shape (contract)
*/

export class RegisterDto {

  // email input from client
  email!: string

  // password input from client
  password!: string
}