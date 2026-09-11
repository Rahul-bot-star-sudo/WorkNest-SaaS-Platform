# 🏗️ Two Registration Features (Professional Design)

You are designing **2 types of registration**:

## 1️⃣ Super Admin Registration (System-Level)

## 2️⃣ Restricted Registration (Admin-Controlled)

This is exactly how real enterprise systems work.

---

# 🔐 1) Super Admin Registration (Bootstrap Registration)

👉 Purpose:
Create the first powerful user of the system.

### 👤 Actor

* System / Initial Setup

### ✅ Rules

1. Only one Super Admin allowed (usually)
2. Created only once (system bootstrap)
3. Highest privileges
4. Role = SUPER_ADMIN (fixed)
5. Strong password mandatory
6. Email must be unique

### ❌ Reject Cases

* Super Admin already exists
* Weak password
* Email already exists

### 🧠 Logic Flow

```
Check if super admin exists
→ If yes, reject
→ Validate email & password
→ Hash password
→ Create SUPER_ADMIN user
→ Save to DB
→ Return safe response
```

# 🔐 2) Restricted Registration (Admin-Based)

👉 Purpose:
Only authorized users can create new users.

### 👤 Actor

* Admin / Super Admin

### ✅ Rules

1. Guest cannot register
2. Only Admin/SuperAdmin can create users
3. Role assignment is restricted
4. Permission check required
5. Audit log required (optional but professional)

### 🎯 Example Roles Allowed

| Actor       | Can Create      |
| ----------- | --------------- |
| Admin       | MEMBER, MANAGER |
| Super Admin | ANY ROLE        |

---

### 🧠 Logic Flow

```
Check actor permission
→ Validate input
→ Check email uniqueness
→ Validate password
→ Check role assignment permission
→ Hash password
→ Create user
→ Save
→ Return safe response
```
