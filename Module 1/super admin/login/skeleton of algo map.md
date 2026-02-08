Got it 👍
You want **only the SKELETON** — file names + step comments —
so that **sirf code bharte hi LOGIN feature create ho jaaye**.
No extra explanation, no logic discussion.

Below is the **FINAL LOGIN SKELETON (Algorithm → File Map)**
**Node.js (JS), service-first, role-based, future-ready.**

---

# 🔐 LOGIN FEATURE – FILE-WISE CODE SKELETON (NODE / JS)

---

## 1️⃣ `src/modules/auth/dto/login.dto.js`

```js
// login.dto.js
// INPUT CONTRACT ONLY

module.exports = function LoginDto(data) {
  return {
    // STEP 1: email from request
    email: data.email,

    // STEP 1: password from request
    password: data.password
  }
}
```

---

## 2️⃣ `src/modules/auth/auth.controller.js`

```js
// auth.controller.js
// API ENTRY POINT

class AuthController {

  async login(req, res) {
    try {
      // STEP 1: Receive HTTP request

      // STEP 2: Build LoginDto from req.body

      // STEP 3: Call AuthService.login(dto)

      // STEP 11: Send success response

    } catch (error) {
      // STEP 11: Handle error response
    }
  }

}

module.exports = AuthController
```

---

## 3️⃣ `src/modules/auth/auth.service.js` ⭐⭐⭐⭐⭐

```js
// auth.service.js
// MAIN LOGIN ALGORITHM

class AuthService {

  async login(dto) {

    // STEP 2: Validate input (email & password)

    // STEP 3: Fetch user by email from repository

    // STEP 4: If user not found → throw generic auth error

    // STEP 5: Compare plain password with hashed password

    // STEP 6: If password mismatch → throw generic auth error

    // STEP 7: Check user status is ACTIVE

    // STEP 8: Generate JWT (userId + role)

    // STEP 9: Prepare safe user response (remove password)

    // STEP 10: Update login metadata (optional)

    // STEP 11: Return token + safe user data

  }

}

module.exports = AuthService
```

---

## 4️⃣ `src/modules/user/user.repository.js`

```js
// user.repository.js
// DATABASE OPERATIONS ONLY

class UserRepository {

  async findByEmail(email) {
    // STEP 3: Query user by email
  }

  async updateLoginMeta(userId) {
    // STEP 10: Update lastLoginAt, reset failed attempts
  }

}

module.exports = UserRepository
```

---

## 5️⃣ `src/modules/auth/utils/password.util.js`

```js
// password.util.js
// SECURITY UTIL

class PasswordUtil {

  static async compare(plainPassword, hashedPassword) {
    // STEP 5: bcrypt.compare
  }

}

module.exports = PasswordUtil
```

---

## 6️⃣ `src/modules/auth/utils/jwt.util.js`

```js
// jwt.util.js
// TOKEN GENERATION

class JwtUtil {

  static sign(payload) {
    // STEP 8: jwt.sign(payload)
  }

}

module.exports = JwtUtil
```

---

## 7️⃣ `src/modules/auth/auth.config.js`

```js
// auth.config.js
// SYSTEM RULES

module.exports = {
  ACTIVE_STATUS: 'ACTIVE'
}
```

---

# 🧠 ONE-LOOK ALGORITHM → FILE MAP

| Algo Step          | File               |
| ------------------ | ------------------ |
| Input contract     | login.dto.js       |
| Request / Response | auth.controller.js |
| Core login logic   | auth.service.js    |
| User DB access     | user.repository.js |
| Password compare   | password.util.js   |
| JWT generation     | jwt.util.js        |
| Status rule        | auth.config.js     |

---

## ✅ FINAL CONFIRMATION

✔ This skeleton is **100% aligned** with the algorithm
✔ Multiple roles supported automatically
✔ Single login, role-based access ready
✔ Sirf comments ke niche code likho → **feature ban jaayega**

---

### NEXT (Natural Step)

Type this 👇
**“auth.service.js STEP-2 ka JS code likhwao”**

We’ll fill it **step-by-step**, like a senior dev review 💪
