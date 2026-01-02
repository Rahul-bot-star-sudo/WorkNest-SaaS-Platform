Perfect 👍
Neeche **exactly usi CODE FLOW ka ALGORITHM** de raha hoon —
👉 **step-by-step**
👉 **language-independent**
👉 **company-style**
👉 **JWT → Role → Controller sequence follow karta hua**

---

# 🔐 ROLE-BASED AUTHORIZATION

## 🧠 ALGORITHM (CODE FLOW BASED)

---

## 📥 INPUT

* HTTP Request
* Authorization Header (JWT token)
* API ke allowed roles (route se defined)

---

## 📤 OUTPUT

* ✅ Controller response (if allowed)
* ❌ Error response (`401` / `403`)

---

## 🧠 MAIN ALGORITHM

```
ALGORITHM HANDLE_PROTECTED_REQUEST

STEP 1: RECEIVE_REQUEST
  Receive incoming HTTP request

STEP 2: AUTHENTICATION (JWT MIDDLEWARE)
  IF Authorization token is missing
     RETURN 401 Unauthorized

  VERIFY JWT token

  IF token is invalid or expired
     RETURN 401 Unauthorized

  EXTRACT userId and role from token
  ATTACH user object to request (req.user)

STEP 3: AUTHORIZATION (ROLE MIDDLEWARE)
  READ allowedRoles for this API

  IF req.user.role NOT IN allowedRoles
     RETURN 403 Forbidden

STEP 4: CONTROLLER_EXECUTION
  Call controller method
  Process request logic

STEP 5: RETURN_RESPONSE
  Send response back to client

END
```

---

## 🧠 SUB-ALGORITHM 1: JWT AUTHENTICATION

```
ALGORITHM VERIFY_JWT

INPUT: Authorization Header

IF header is missing
   THROW Unauthorized

DECODE and VERIFY token

IF verification fails
   THROW Unauthorized

RETURN decoded user payload
```

---

## 🧠 SUB-ALGORITHM 2: ROLE AUTHORIZATION

```
ALGORITHM CHECK_ROLE_PERMISSION

INPUT:
  userRole
  allowedRoles[]

IF userRole is NULL
   THROW Unauthorized

IF userRole NOT IN allowedRoles
   THROW Forbidden

ALLOW request to continue
```

---

## 🔁 DECISION FLOW (SIMPLIFIED)

```
Is token valid?
   NO  → 401
   YES ↓
Is role allowed?
   NO  → 403
   YES ↓
Controller executes
```

---

## 🧠 FAILURE CASES (EXAM / INTERVIEW READY)

### ❌ Case 1: Token missing

```
→ Authentication fails
→ 401 Unauthorized
```

### ❌ Case 2: Token valid but role not allowed

```
→ Authorization fails
→ 403 Forbidden
```

### ✅ Case 3: Token valid + role allowed

```
→ Controller runs
→ 200 OK
```

---

## 🧠 WHY THIS ALGORITHM IS IMPORTANT

* Prevents unauthorized access
* Keeps controller clean
* Separates concerns
* Scales easily for new roles

---

## 🧠 INTERVIEW ONE-LINE ANSWER

> “The request is first authenticated using JWT, then authorized based on user role before reaching the controller.”

---

### 🔥 NEXT STEP (tum bolo)

* Is algorithm ka **algo-map**
* Is algorithm ka **code skeleton**
* Is algorithm ka **diagram explanation**

Bas bolo 👉 **NEXT 🔥**
