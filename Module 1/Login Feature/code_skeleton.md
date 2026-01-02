Perfect 👍
Neeche **LOGIN algo map ka EXACT CODE SKELETON** de raha hoon —
👉 **sirf structure + function names**
👉 **andar logic nahi**
👉 **comments = algorithm steps**
👉 Tum baad me **sirf logic fill** karoge

---

# 🔐 LOGIN FEATURE — CODE SKELETON (Algo Map → Code)

---

## 1️⃣ `login.dto.ts` (Input Contract)

```ts
// 📦 LOGIN DTO
// Algorithm Input Definition

export class LoginDto {
  email: string
  password: string
}
```

---

## 2️⃣ `auth.controller.ts` (API Wiring Only)

```ts
// 🎯 Controller Layer
// Responsibility: HTTP → Service call

import { loginUser } from './auth.service'

export async function loginController(req, res) {
  try {
    const result = await loginUser(req.body)
    res.status(200).json(result)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}
```

---

## 3️⃣ `auth.service.ts` 🧠 (MAIN ALGORITHM OWNER)

```ts
// 🧠 Service Layer
// Responsibility: Business Logic + Algorithm Flow

import { findUserByEmail } from './user.repository'
import { comparePassword } from './utils/password.util'
import { generateJWT } from './utils/jwt.util'

export async function loginUser(dto) {

  // STEP 1: VALIDATE_INPUT
  // IF email or password missing → THROW error

  // STEP 2: FETCH_USER_BY_EMAIL
  // user = findUserByEmail(dto.email)
  // IF user not found → THROW error

  // STEP 3: VERIFY_PASSWORD
  // isValid = comparePassword(dto.password, user.password)
  // IF false → THROW error

  // STEP 4: CHECK_USER_STATUS
  // IF user.status !== 'ACTIVE' → THROW error

  // STEP 5: GENERATE_JWT
  // token = generateJWT({ userId, role })

  // STEP 6: PREPARE_SAFE_RESPONSE
  // remove password field

  // STEP 7: RETURN RESPONSE
}
```

---

## 4️⃣ `user.repository.ts` (DB Access Only)

```ts
// 🗄️ Repository Layer
// Responsibility: Database interaction

export async function findUserByEmail(email: string) {

  // STEP: Query database using email
  // RETURN user OR null

}
```

---

## 5️⃣ `password.util.ts` (Security Utility)

```ts
// 🔐 Password Utility
// Responsibility: Password comparison

export async function comparePassword(
  plainPassword: string,
  hashedPassword: string
) {

  // STEP: bcrypt.compare(plain, hashed)
  // RETURN true or false

}
```

---

## 6️⃣ `jwt.util.ts` (Token Utility)

```ts
// 🪙 JWT Utility
// Responsibility: Token generation

export function generateJWT(payload: {
  userId: string
  role: string
}) {

  // STEP: jwt.sign(payload, secret, options)
  // RETURN token

}
```

---

## 🧠 FINAL ALGO MAP → CODE CONNECTION

```
DTO
 ↓
Controller
 ↓
Service (Algorithm Owner)
 ↓
Repository (DB)
 ↓
Utils (bcrypt, JWT)
 ↓
Response
```

---

## ✅ IMPORTANT (READ THIS)

✔ Ye **company-grade skeleton** hai
✔ Isme **kuchh bhi extra nahi**
✔ Tum ise kisi bhi backend me reuse kar sakte ho
✔ **Algorithm → Code mapping crystal clear**

---

### 🔥 NEXT STEP (tum decide karo)

1️⃣ Is skeleton me **logic fill karna**
2️⃣ **REGISTER + LOGIN combine flow**
3️⃣ **JWT verify middleware skeleton**
4️⃣ **Angular login integration skeleton**

Bas bolo: **NEXT 🔥**
