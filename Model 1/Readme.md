### Features 
---
```
Register

Login

Logout

Refresh Token

Role-based Authorization

Forgot Password

Reset Password| Level                    | Count |
| ------------------------ | ----- |
| **Auth Module Features** | **4** |
| Register                 | 1     |
| Login                    | 1     |
| Auth Middleware          | 1     |
| Role Authorization       | 1     |


Change Password
```
---

# 🧠 **COMPLETE PROFESSIONAL CONCEPT MAP (MODULE-WISE)**

---

## 🔐 **MODULE 1: Authentication & Authorization**

### 🔹 JavaScript / TypeScript Concepts

* Closures (JWT verify middleware)
* Async / Await
* Promises
* Error handling with try–catch
* ES6 imports/exports

### 🔹 Backend & Security Concepts

* JWT Access Token
* Refresh Token flow
* Password hashing (bcrypt)
* Token expiration & rotation
* Secure HTTP headers (basic)
* Auth middleware chaining

### 🔹 TypeScript (Interview Gold)

* Interfaces (UserPayload, LoginDTO)
* Enums (UserRole)
* Optional properties
* Readonly fields

### 🔹 Architecture

* Auth controller vs service separation
* Middleware-based authorization
* Reusable guards (role-based)

✅ **Interview line:**

> “Authentication is handled using JWT with refresh tokens and role-based middleware.”


---
### Concept flow 
```
Register
 → Password Hash
 → Default Role (MEMBER)

Login
 → Password Compare
 → JWT generate (userId + role)

Request API
 → Auth Middleware (JWT)
 → Role Middleware (ADMIN / MEMBER)
 → Controller
 ```
