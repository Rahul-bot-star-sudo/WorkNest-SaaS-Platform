🔥 Great question — **ab tum REAL PRODUCT phase me aa gaye ho**.
Main isko **simple, practical, step-by-step** explain kar raha hoon.
No theory overload, sirf **“kaise karte hain”**.

---

# 🧩 BIG PICTURE (1 MINUTE)

Tumhare paas ab ye hai ✅

* Login API → JWT token deta hai
* Token me `userId + role` hai

Ab hume 3 cheezein karni hain:

1️⃣ **Protected APIs** → bina token access na mile
2️⃣ **Role-based access** → role ke hisaab se permission
3️⃣ **Frontend (Angular/React)** → token bhejna + protect pages

---

# 1️⃣ PROTECTED APIs (JWT VERIFY MIDDLEWARE)

## 🎯 Goal

> Jo user login nahi hai, wo API hit hi na kar paaye

---

## 🔹 STEP-1: JWT Verify Middleware banao

📁 `src/middlewares/auth.middleware.js`

```js
const jwt = require('jsonwebtoken')

function authenticate(req, res, next) {
  try {
    const authHeader = req.headers.authorization

    // Token missing
    if (!authHeader) {
      return res.status(401).json({ message: 'Token required' })
    }

    // "Bearer token"
    const token = authHeader.split(' ')[1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // user info attach to request
    req.user = decoded

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' })
  }
}

module.exports = { authenticate }
```

---

## 🔹 STEP-2: Protected route example

📁 `routes/user.routes.js`

```js
const express = require('express')
const { authenticate } = require('../middlewares/auth.middleware')

const router = express.Router()

router.get('/profile', authenticate, (req, res) => {
  res.json({
    message: 'Protected profile data',
    user: req.user
  })
})

module.exports = router
```

📌 Ab:

* ❌ Token nahi → access denied
* ✅ Token hai → API access

---

# 2️⃣ ROLE-BASED ACCESS CONTROL (RBAC)

## 🎯 Goal

> Har role ko alag permission

---

## 🔹 STEP-1: Role middleware banao

📁 `src/middlewares/role.middleware.js`

```js
function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' })
    }
    next()
  }
}

module.exports = { authorizeRoles }
```

---

## 🔹 STEP-2: SUPER_ADMIN only API

```js
const { authenticate } = require('../middlewares/auth.middleware')
const { authorizeRoles } = require('../middlewares/role.middleware')

router.post(
  '/create-user',
  authenticate,
  authorizeRoles('SUPER_ADMIN'),
  (req, res) => {
    res.json({ message: 'User created by Super Admin' })
  }
)
```

📌 Behavior:

* SUPER_ADMIN ✅
* MANAGER ❌
* EMPLOYEE ❌

---

## 🧠 INTERVIEW LINE

> “We use JWT authentication middleware followed by role-based authorization middleware.”

---

# 3️⃣ FRONTEND CONNECT (ANGULAR / REACT)

## 🎯 Goal

> Frontend token bheje + pages protect kare

---

## 🔹 LOGIN FLOW (Common for Angular & React)

1️⃣ Login API hit
2️⃣ Token milta hai
3️⃣ Token store karo
4️⃣ Har request me token bhejo

---

## 🔹 TOKEN STORE (Simple)

### React

```js
localStorage.setItem('token', response.data.token)
```

### Angular

```ts
localStorage.setItem('token', res.data.token)
```

---

## 🔹 TOKEN SEND KARNA (IMPORTANT)

### React (Axios)

```js
axios.get('/api/user/profile', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`
  }
})
```

### Angular (Interceptor – BEST PRACTICE)

```ts
intercept(req, next) {
  const token = localStorage.getItem('token')

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })
  }

  return next.handle(req)
}
```

---

## 🔹 PAGE PROTECTION

### React

```js
if (!token) {
  navigate('/login')
}
```

### Angular (Route Guard)

```ts
canActivate() {
  return !!localStorage.getItem('token')
}
```

---

# 🧠 FULL FLOW SUMMARY (VERY IMPORTANT)

```
LOGIN
 → JWT token
 → frontend stores token
 → frontend sends token in headers
 → backend verifies token
 → backend checks role
 → API access granted / denied
```

---

# 🏆 TUM AB KYA BOL SAKTE HO (CONFIDENTLY)

> “I implemented JWT-based authentication with role-based authorization and integrated it with frontend using HTTP interceptors.”

🔥 Ye **real-world developer answer** hai.

---

## 🚀 NEXT STEP (CHOOSE ONE)

1️⃣ JWT middleware + RBAC code proper folder structure
2️⃣ Create Manager / Employee APIs
3️⃣ Angular auth flow (full project style)
4️⃣ React auth flow
5️⃣ Refresh token (advanced)

👉 Bas likho: **NEXT: 1 / 2 / 3 / 4 / 5**

Tum ab **tutorial-follow nahi, SYSTEM-BUILD mode me ho** 💪
