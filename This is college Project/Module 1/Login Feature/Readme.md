Perfect 👍
Ab **REGISTER jaise hi** hum **LOGIN feature ka PURE LOGIC → FLOW → ALGORITHM → CODE** bana rahe hain.
❌ JWT details deep nahi
❌ Controller nahi
✅ **Service-first, interview-ready logic**

---

# 🔐 FEATURE-2: LOGIN (Project-Based, Future-Ready)

Tech context (sirf background):

* Frontend: Angular
* Backend: Node + TypeScript
* DB: MongoDB
* Security: bcrypt
* Auth: JWT (Access Token only, abhi)

---

## 🧠 STEP-1: LOGIC (Business Rules) ✅

👉 **System ka dimaag yahin decide hota hai**

### 👤 Actor

Registered User

### ✅ Rules

1. Email must exist
2. Password must match (bcrypt compare)
3. User status must be ACTIVE
4. JWT generate hoga (userId + role)

### ❌ Reject cases

* Email not found
* Password incorrect
* User status NOT ACTIVE

### 📌 Post-Condition

* User successfully authenticated
* Signed JWT token return hota hai

✔ Approved.
(Ab isi ko implement kar rahe hain)

---

## 🧠 STEP-2: FLOW (Sequence)

```
Client sends email + password
→ Validate input
→ Find user by email
→ Compare password (bcrypt)
→ Check user status
→ Generate JWT (userId + role)
→ Return token + safe user data
```

👉 Ye flow future me:

* Refresh token
* Role-based access
* Multi-device login
  ke saath **conflict nahi karega**

---

## 🧠 STEP-3: ALGORITHM (IF / ELSE)

```
IF email or password missing
    THROW error

user = FIND user by email

IF user not found
    THROW error

IF password does not match hashed password
    THROW error

IF user.status is not ACTIVE
    THROW error

token = GENERATE_JWT(user.id, user.role)

RETURN {
    token,
    user (without password)
}
```

👉 **Har IF = real production check**

---

## 🧠 STEP-4: CODE (Service-First, Dimag ka Code 🧠)

> ❌ Controller logic nahi
> ❌ HTTP response nahi
> ✅ Sirf LOGIN business logic

### `auth.service.ts`

```ts
export async function loginUser(dto) {

  // STEP 1: Input validation
  if (!dto.email || !dto.password) {
    throw new Error('Email and password required')
  }

  // STEP 2: Find user
  const user = await findUserByEmail(dto.email)

  if (!user) {
    throw new Error('Invalid email or password')
  }

  // STEP 3: Password compare
  const isPasswordValid = await comparePassword(
    dto.password,
    user.password
  )

  if (!isPasswordValid) {
    throw new Error('Invalid email or password')
  }

  // STEP 4: Status check
  if (user.status !== 'ACTIVE') {
    throw new Error('User account is inactive')
  }

  // STEP 5: JWT generate
  const token = generateJWT({
    userId: user.id,
    role: user.role
  })

  // STEP 6: Safe response
  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      role: user.role
    }
  }
}
```

👉 Ye **pure authentication logic** hai
👉 Interview me tum bol sakte ho:

> “Password compare ke baad hi JWT generate hota hai”

---

## 🧠 STEP-5: CODE MAP (Files & Responsibility)

| Responsibility            | File                 |
| ------------------------- | -------------------- |
| Login rules & flow        | `auth.service.ts`    |
| Input contract            | `login.dto.ts`       |
| Password compare (bcrypt) | `password.util.ts`   |
| JWT generation            | `jwt.util.ts`        |
| User fetch                | `user.repository.ts` |
| API wiring                | `auth.controller.ts` |

---

## ✅ Aaj ka Outcome (VERY IMPORTANT)

✔ Login feature complete
✔ Secure password comparison
✔ JWT contains **userId + role**
✔ Role-based access ready
✔ Angular integration ready
✔ Production-grade authentication logic

---

### 🧠 Tumne kya seekha (INTERVIEW LINE)

> “Login flow me password kabhi decrypt nahi hota, bcrypt compare hota hai aur successful authentication ke baad hi JWT sign hota hai.”

---

Agar bole to next hum:
1️⃣ **JWT util ka algorithm**
2️⃣ **Refresh token flow**
3️⃣ **Angular login integration**
4️⃣ **Middleware (JWT verify)**

Bas bolo: **NEXT 🔥**
