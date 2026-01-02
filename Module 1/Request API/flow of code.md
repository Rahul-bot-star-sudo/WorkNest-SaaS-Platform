Perfect 👍
Neeche **Role-Based Authorization feature ka CODE FLOW** likh raha hoon —
👉 **file-wise**,
👉 **execution-wise**,
👉 **runtime order me**
(no syntax, sirf flow).

---

# 🔁 ROLE-BASED AUTHORIZATION — FLOW OF CODE

```
Incoming HTTP Request
        ↓
Auth (JWT) Middleware
        ↓
Role Authorization Middleware
        ↓
Controller
        ↓
Service
        ↓
Response
```

---

## 📁 1️⃣ ENTRY POINT — ROUTE FILE

**File:** `*.routes.ts`

### Code Flow

1. Route define hota hai
2. Middlewares **order me attach** hote hain

```
router.get(
  '/admin-data',
  authMiddleware,
  roleMiddleware(['ADMIN']),
  controllerMethod
)
```

👉 **Order matters**
👉 Pehle JWT, phir Role, phir Controller

---

## 📁 2️⃣ AUTH MIDDLEWARE (JWT VERIFY)

**File:** `auth.middleware.ts`

### Code Flow

```
Request enters authMiddleware
↓
Extract token from headers
↓
Verify JWT
↓
Decode payload (userId, role)
↓
Attach user to request
↓
Call next()
```

### Output of this step

```
req.user = {
  userId,
  role
}
```

❌ Agar token invalid → request yahin stop
✅ Valid → next middleware

---

## 📁 3️⃣ ROLE AUTHORIZATION MIDDLEWARE (THIS FEATURE)

**File:** `role.middleware.ts`

### Code Flow

```
Request enters roleMiddleware
↓
Read allowedRoles from route
↓
Read userRole from req.user
↓
Compare userRole vs allowedRoles
↓
IF allowed
    call next()
ELSE
    throw 403 Forbidden
```

### Important

* Controller **tabhi** chalega jab role pass ho
* Nahi to request yahin terminate

---

## 📁 4️⃣ CONTROLLER

**File:** `*.controller.ts`

### Code Flow

```
Controller method executes
↓
req.user already available
↓
Extract params / body
↓
Call service
↓
Return response
```

👉 Controller **authorization logic nahi karta**
👉 Wo assume karta hai user allowed hai

---

## 📁 5️⃣ SERVICE (OPTIONAL CHECK)

**File:** `*.service.ts`

### Code Flow

```
Service receives data
↓
Business rules apply
↓
Repository calls
↓
Prepare response
```

⚠️ Role check yahan **repeat nahi hota**
(because middleware already handled it)

---

## 📁 6️⃣ RESPONSE FLOW (BACK)

```
Service → Controller → Client
```

---

# 🧠 COMPLETE EXECUTION TRACE (LINE BY LINE)

```
Client hits /admin-data
↓
JWT middleware validates token
↓
JWT middleware sets req.user
↓
Role middleware checks req.user.role
↓
Role allowed?
   YES → Controller
   NO  → 403 response
↓
Controller executes logic
↓
Client gets response
```

---

## 🧠 FAILURE FLOWS (IMPORTANT)

### ❌ Token missing / invalid

```
Request → JWT middleware → 401 Unauthorized
```

### ❌ Role not allowed

```
Request → JWT middleware → Role middleware → 403 Forbidden
```

### ✅ Success

```
Request → JWT → Role → Controller → 200 OK
```

---

## 🧠 WHY THIS FLOW IS PROFESSIONAL

* Single Responsibility
* Clear security boundary
* Easy to debug
* Easy to extend (new roles)

---

## 🧠 INTERVIEW ONE-LINER (FLOW)

> “Requests pass through authentication and authorization middleware before reaching controllers, ensuring only permitted users access protected resources.”

---

### 🔥 NEXT (tum decide karo)

* Is flow ka **algorithm map**
* Is flow ka **code skeleton**
* Is flow ka **real API example**

Bas bolo 👉 **NEXT 🔥**
