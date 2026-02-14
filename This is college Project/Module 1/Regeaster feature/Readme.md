# this is the module feature
---

# 🏗️ WorkNest — Role & Workflow Design (Improved & Professional)

## 👑 Level 1 — System Initialization (Super Admin)

1. **Super Admin Registration**

   * Create the first Super Admin account (system bootstrap).

2. **Create Additional Super Admins**

   * Super Admin can create other Super Admin accounts.

---

## 🛠️ Level 2 — System Management (Super Admin)

3. **Create Admin Accounts**

   * Super Admin creates Admin users.

4. **Create Roles & Permissions**

   * Super Admin defines roles (ADMIN, MANAGER, EMPLOYEE).
   * Super Admin assigns permissions to roles.

5. **Register Employees**

   * Super Admin registers employees in the system.

---

## 🧑‍💼 Level 3 — Administration (Admin)

6. **Assign Roles to Employees**

   * Admin assigns roles to employees.

7. **Manage Employees**

   * Admin can:

     * Update employee details
     * Block / unblock employees
     * View employee list

---

## 📊 Level 4 — Project Management (Project Manager)

8. **Manage Projects**

   * Project Manager creates and updates projects.

9. **Assign Tasks to Employees**

   * Project Manager assigns tasks to employees.

---

## 👨‍💻 Level 5 — Employee Operations

10. **Manage Tasks**

* Employees can:

  * View tasks
  * Update task status
  * Submit work

---

## 🧠 BONUS — Clean Role Hierarchy (Enterprise Style)

```
SUPER_ADMIN
   ↓
ADMIN
   ↓
PROJECT_MANAGER
   ↓
EMPLOYEE
```

---
# 🔐 FEATURE-1: REGISTER (Project-Based, Future-Ready)

Tech context (sirf background):

* Frontend: Angular (baad me)
* Backend: Node + TypeScript
* DB: MongoDB (abhi abstraction)
* Security: bcrypt

---

## 🧠 STEP-1: LOGIC (Business Rules) ✅

👉 **Tumne jo bola, wahi final**

### 👤 Actor

Guest User

### ✅ Rules

1. Email unique hona chahiye
2. Password strong hona chahiye
3. Plain password kabhi store nahi hota
4. Default role = MEMBER (config se)
5. User status = ACTIVE

### ❌ Reject cases

* Email already exist
* Weak password

### 📌 Post-Condition

* Secure user record create hota hai

✔ Approved.
(Ab isi ko implement kar rahe hain)

---

## 🧠 STEP-2: FLOW (Sequence)

```
Client sends email + password
→ Validate input
→ Check email uniqueness
→ Validate password strength
→ Hash password
→ Assign default role
→ Set status ACTIVE
→ Save user
→ Return safe response
```

👉 Ye flow future me:

* JWT
* Refresh token
* Multi-device
  ke saath **conflict nahi karega**

---

## 🧠 STEP-3: ALGORITHM (IF / ELSE)

```
IF email or password missing
    THROW error

IF email already exists
    THROW error

IF password is weak
    THROW error

hashedPassword = hash(password)

role = getDefaultRole()

CREATE user {
    email,
    hashedPassword,
    role,
    status = ACTIVE
}

SAVE user

RETURN user without password
```

---

## 🧠 STEP-4: CODE (Service-First, Dimag ka Code 🧠)

> ❌ Controller logic nahi
> ❌ JWT nahi
> ❌ Token nahi
> ✅ Sirf REGISTER logic

### `auth.service.ts`

```ts
export async function registerUser(dto) {

  if (!dto.email || !dto.password) {
    throw new Error('Email and password required')
  }

  if (await emailExists(dto.email)) {
    throw new Error('Email already exists')
  }

  if (!isStrongPassword(dto.password)) {
    throw new Error('Weak password')
  }

  const hashedPassword = await hashPassword(dto.password)

  const user = {
    email: dto.email,
    password: hashedPassword,
    role: getDefaultRole(),
    status: 'ACTIVE'
  }

  await saveUser(user)

  return {
    email: user.email,
    role: user.role,
    status: user.status
  }
}
```

👉 Ye **pure business logic** hai
👉 Interview me tum ise explain kar sakte ho

---

## 🧠 STEP-5: CODE MAP (Files & Responsibility)

| Responsibility        | File                 |
| --------------------- | -------------------- |
| Register rules & flow | `auth.service.ts`    |
| Input contract        | `register.dto.ts`    |
| Password rules        | `password.util.ts`   |
| Role config           | `auth.config.ts`     |
| DB ops                | `user.repository.ts` |
| API wiring            | `auth.controller.ts` |

---

## ✅ Aaj ka Outcome (IMPORTANT)

✔ Register feature complete
✔ Secure password handling
✔ Config-driven role
✔ JWT / Refresh token ke liye ready
✔ Angular integration ke liye clean API

---