Bilkul Rahul 👍
**Ye wahi missing piece tha.**
Ab tumhe **zero confusion** rahegi ki:

> **“Login algorithm ka kaunsa step kis file me likhna hai?”**

Main neeche **LOGIN ALGORITHM → FILE-WISE MAP** de raha hoon
**exact same style** me jaise tumne Super Admin setup me dekha tha.

---

# 🔐 LOGIN FEATURE – ALGORITHM → FILE MAP (NODE / JS)

> Scope: Single login, multi-role
> Style: Service-first
> Goal: Sirf code likho → feature ban jaaye

---

## 🧠 COMPLETE LOGIN ALGORITHM (REFERENCE)

```
STEP 1: Receive login input
STEP 2: Validate input
STEP 3: Fetch user by email
STEP 4: Handle invalid credentials
STEP 5: Compare password
STEP 6: Handle invalid credentials
STEP 7: Check user status
STEP 8: Generate JWT
STEP 9: Prepare safe response
STEP 10: Post-login updates
STEP 11: Return result
```

---

# 🗂️ FILE-WISE RESPONSIBILITY MAP

---

## 1️⃣ `src/modules/auth/dto/login.dto.js`

### 🧠 Algorithm Part

```
INPUT CONTRACT
(email, password)
```

### 🦴 Code Responsibility

```js
// login.dto.js
module.exports = function LoginDto(data) {
  return {
    email: data.email,
    password: data.password
  }
}
```

📌 **Yahan kya likhna hai**

* STEP-1 ka input structure
* ❌ No validation
* ❌ No logic

---

## 2️⃣ `src/modules/auth/auth.controller.js`

### 🧠 Algorithm Part

```
STEP 1: Receive request
STEP 11: Send response
```

### 🦴 Responsibility

```js
// auth.controller.js
class AuthController {

  async login(req, res) {
    try {
      // STEP 1: Receive HTTP request

      // STEP 2: Build LoginDto

      // STEP 3: Call AuthService.login(dto)

      // STEP 11: Send success response

    } catch (error) {
      // Handle error response
    }
  }

}

module.exports = AuthController
```

📌 **Controller kabhi ye nahi karega**

* password compare
* DB query
* JWT generate

---

## 3️⃣ `src/modules/auth/auth.service.js` ⭐⭐⭐⭐⭐

### 🧠 Algorithm Part (MAIN BRAIN)

```
STEP 2  → Validate input
STEP 3  → Fetch user
STEP 4  → Credential check
STEP 5  → Password compare
STEP 6  → Credential check
STEP 7  → Status check
STEP 8  → JWT generate
STEP 9  → Safe response
STEP 10 → Post-login updates
```

### 🦴 Code Skeleton

```js
// auth.service.js
class AuthService {

  async login(dto) {

    // STEP 2: Validate input (email, password)

    // STEP 3: Fetch user by email

    // STEP 4: Handle invalid credentials

    // STEP 5: Compare password using bcrypt

    // STEP 6: Handle invalid credentials (generic error)

    // STEP 7: Check user status (ACTIVE only)

    // STEP 8: Generate JWT (userId + role)

    // STEP 9: Prepare safe user response

    // STEP 10: Post-login updates (optional)

    // STEP 11: Return token + user

  }

}

module.exports = AuthService
```

📌 **Yahin tumhara feature banta hai**

---

## 4️⃣ `src/modules/user/user.repository.js`

### 🧠 Algorithm Part

```
STEP 3: Fetch user by email
STEP 10: Update last login
```

### 🦴 Responsibility

```js
// user.repository.js
class UserRepository {

  async findByEmail(email) {
    // STEP 3: DB query
  }

  async updateLoginMeta(userId) {
    // STEP 10: Update lastLoginAt, reset failedAttempts
  }

}

module.exports = UserRepository
```

📌 **Sirf DB ka kaam**

---

## 5️⃣ `src/modules/auth/utils/password.util.js`

### 🧠 Algorithm Part

```
STEP 5: Compare password
```

### 🦴 Responsibility

```js
// password.util.js
class PasswordUtil {

  static async compare(plain, hashed) {
    // bcrypt.compare
  }

}

module.exports = PasswordUtil
```

📌 **Security isolate hoti hai**

---

## 6️⃣ `src/modules/auth/utils/jwt.util.js`

### 🧠 Algorithm Part

```
STEP 8: Generate JWT
```

### 🦴 Responsibility

```js
// jwt.util.js
class JwtUtil {

  static sign(payload) {
    // jwt.sign(payload, secret, options)
  }

}

module.exports = JwtUtil
```

📌 **JWT me sirf userId + role**

---

## 7️⃣ `src/modules/auth/auth.config.js`

### 🧠 Algorithm Part

```
User status rule
```

### 🦴 Responsibility

```js
// auth.config.js
module.exports = {
  ACTIVE_STATUS: 'ACTIVE'
}
```

---

# 🧠 ONE-LOOK SUMMARY (VERY IMPORTANT)

| Algorithm Step   | File               |
| ---------------- | ------------------ |
| Input contract   | login.dto.js       |
| Request/Response | auth.controller.js |
| Core logic       | auth.service.js    |
| DB access        | user.repository.js |
| Password compare | password.util.js   |
| JWT generate     | jwt.util.js        |
| System rules     | auth.config.js     |

---

## 🔥 GOLDEN RULE (YAAD RAKHNA)

> **Service me algorithm jeeta hai,
> baaki files sirf usko support karti hain.**

---

## ✅ AB TUM KYA KAR SAKTE HO

👉 Is mapping ko dekh ke:

* Tum directly file open karo
* Comment ke niche code likho
* Aur login feature **complete ho jaayega**

Agar bole:
**“auth.service.js ka STEP-2 likhwao”**
toh main ek-ek line JS me likhwa dunga, bina rush 💪
