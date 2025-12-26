Perfect 👍
Ab main **exact wahi cheez** de raha hoon jo tum maang rahe ho:

> **ALGORITHM → FILE MAP → CODE SKELETON (with file names)**
> 👉 Sirf **structure + comments**, **NO logic**
> 👉 Jisse tum **direct algorithm → code** convert kar sako

---

## 🧠 HIGH-LEVEL FLOW (Mental Model)

```
ALGORITHM
   ↓
FILE MAP
   ↓
CODE SKELETON
```

---

# 🗂️ REGISTER FEATURE – FILE-WISE CODE SKELETON

---

## 1️⃣ `src/modules/auth/dto/register.dto.ts`

### 🧠 Algorithm

```
DEFINE email as string
DEFINE password as string
``` 

### 🦴 Code Skeleton

```ts
// register.dto.ts
export class RegisterDto {
  // email input from client
  email: string

  // password input from client
  password: string
}
```

📌 **Note**

* No logic
* No validation
* Only **contract**

---

## 2️⃣ `src/modules/auth/auth.controller.ts`

### 🧠 Algorithm

```
RECEIVE request
EXTRACT dto
CALL service
SEND response
HANDLE error
```

### 🦴 Code Skeleton

```ts
// auth.controller.ts
export class AuthController {

  async register(req, res) {
    try {
      // STEP 1: Receive request

      // STEP 2: Extract email & password into DTO

      // STEP 3: Call authService.registerUser(dto)

      // STEP 4: Send success response

    } catch (error) {
      // STEP 5: Handle error & send error response
    }
  }

}
```

📌 **Yahan kya nahi hoga**

* ❌ password hash
* ❌ DB query
* ❌ IF business rules

---

## 3️⃣ `src/modules/auth/auth.service.ts` ⭐⭐⭐

### 🧠 Algorithm (MAIN)

```
VALIDATE input
ENSURE email unique
ENSURE password strong
HASH password
ASSIGN role
SET status
SAVE user
RETURN safe response
```

### 🦴 Code Skeleton

```ts
// auth.service.ts
export class AuthService {

  async registerUser(dto) {

    // STEP 1: Validate input (email, password)

    // STEP 2: Check if email already exists

    // STEP 3: Check password strength

    // STEP 4: Hash password

    // STEP 5: Prepare user object (role, status)

    // STEP 6: Save user to database

    // STEP 7: Remove sensitive fields

    // STEP 8: Return safe response
  }

}
```

📌 **Ye file sabse important hai**
👉 Yahin tum **backend engineer** bante ho

---

## 4️⃣ `src/modules/auth/utils/password.util.ts`

### 🧠 Algorithm

```
CHECK password strength
HASH password
```

### 🦴 Code Skeleton

```ts
// password.util.ts
export class PasswordUtil {

  static checkStrength(password: string) {
    // STEP 1: Check password length
    // STEP 2: Check complexity
  }

  static hash(password: string) {
    // STEP 3: Hash password using bcrypt
  }

}
```

📌 **Security isolated here** ✔

---

## 5️⃣ `src/modules/auth/auth.config.ts`

### 🧠 Algorithm

```
DEFAULT_ROLE = MEMBER
```

### 🦴 Code Skeleton

```ts
// auth.config.ts
export const AuthConfig = {
  // default role assigned during registration
  DEFAULT_ROLE: 'MEMBER',

  // default user status
  DEFAULT_STATUS: 'ACTIVE'
}
```

📌 **Hard-coded values yahan allowed**
📌 Service clean rahegi

---

## 6️⃣ `src/modules/auth/auth.repository.ts`

### 🧠 Algorithm

```
FIND user by email
SAVE user
```

### 🦴 Code Skeleton

```ts
// auth.repository.ts
export class AuthRepository {

  async findByEmail(email: string) {
    // STEP 1: Query database for user by email
  }

  async save(user) {
    // STEP 2: Save user in database
  }

}
```

📌 **No business logic here**
📌 Sirf DB ka kaam

---

## 🧠 COMPLETE FILE MAP (ONE VIEW)

| File Name          | Kya Hai            |
| ------------------ | ------------------ |
| register.dto.ts    | Input contract     |
| auth.controller.ts | Request / Response |
| auth.service.ts    | Main algorithm     |
| password.util.ts   | Security helper    |
| auth.config.ts     | Defaults           |
| auth.repository.ts | DB access          |

---

## 🧠 YAAD RAKHNE WALI LINE (EXAM + INTERVIEW)

> **“Pehle skeleton banta hai,
> phir us skeleton me jaan aati hai.”**

---

## ✅ AB TUM KYA KARO (CLEAR NEXT STEP)

👉 **Task 1:**
Is skeleton ko apne project me **exact copy-paste** karo

👉 **Task 2:**
Mujhe bolo:

> **“auth.service.ts ke STEP-1 se STEP-7 ko actual TypeScript code me convert karo”**

Main **line-by-line logic** likhwaunga
jaise company me senior sikhata hai 🔥
