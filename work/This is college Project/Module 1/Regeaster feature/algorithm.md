
## 🧠 ALGORITHM LEVEL–0 (Contract)

**INPUT**

```
email : string
password : string
```

**OUTPUT**

```
success response OR error response
```

---

## 🧠 ALGORITHM LEVEL–1 (Main Algorithm)

```
ALGORITHM REGISTER_USER(dto)

STEP 1: VALIDATE_INPUT(dto)
STEP 2: ENSURE_EMAIL_UNIQUE(dto.email)
STEP 3: ENSURE_PASSWORD_STRONG(dto.password)
STEP 4: HASH_PASSWORD(dto.password)
STEP 5: PREPARE_USER_OBJECT()
STEP 6: SAVE_USER()
STEP 7: RETURN_SAFE_RESPONSE()

END
```

👉 Isko tum **direct function** me convert kar sakte ho
👉 Har STEP = ek function / block

---

## 🧠 ALGORITHM LEVEL–2 (Detailed Steps – EXACT EXECUTION)

### 🔹 STEP 1: Validate Input

```
IF dto.email IS NULL OR dto.password IS NULL
    THROW "Email and password required"
```

---

### 🔹 STEP 2: Email Uniqueness

```
IF DATABASE.CONTAINS_USER_WITH_EMAIL(dto.email)
    THROW "Email already exists"
```

---

### 🔹 STEP 3: Password Strength

```
IF PASSWORD_LENGTH < MIN_LENGTH
    THROW "Weak password"

IF PASSWORD DOES NOT CONTAIN number OR symbol
    THROW "Weak password"
```

---

### 🔹 STEP 4: Hash Password

```
hashedPassword = BCRYPT_HASH(dto.password)
```

⚠️ Plain password yahin **destroy** ho jata hai

---

### 🔹 STEP 5: Prepare User Object

```
user.email = dto.email
user.password = hashedPassword
user.role = CONFIG.DEFAULT_ROLE
user.status = ACTIVE
```

---

### 🔹 STEP 6: Save User

```
DATABASE.SAVE(user)
```

---

### 🔹 STEP 7: Return Safe Response

```
REMOVE password FROM user

RETURN {
    email,
    role,
    status
}
```

---

## 🧠 ALGORITHM LEVEL–3 (FAIL-FAST ERROR FLOW)

```
ON ANY ERROR:
    STOP EXECUTION
    RETURN ERROR RESPONSE
```

👉 Ek baar error aaya = aage kuchh execute nahi hota
👉 Ye **production rule** hai

---

## 🧠 ALGORITHM LEVEL–4 (Controller Algorithm)

```
ALGORITHM REGISTER_API_HANDLER(request)

dto = EXTRACT_BODY(request)

TRY
    result = REGISTER_USER(dto)
    SEND 201 RESPONSE WITH result
CATCH error
    SEND 400 RESPONSE WITH error.message

END
```

---

## 🧠 ALGORITHM LEVEL–5 (Angular Consumption Algorithm)

```
ON REGISTER_BUTTON_CLICK

READ email, password FROM form

CALL POST /register WITH { email, password }

IF response SUCCESS
    SHOW success message
ELSE
    SHOW error message
```

---

## 🧩 WHY THIS ALGORITHM IS PRODUCTION-READY

✔ No controller logic leakage
✔ No DB logic in controller
✔ No password exposure
✔ Config-driven role
✔ Easily extendable to:

* JWT
* Refresh Token
* Email verification
* OTP
* Rate limiting

---

## 🧠 ONE-LINE CONVERSION RULE (IMPORTANT)

> **“Har STEP ko ek function ya ek block me convert karo — bas.”**

Tumhe sochna **band** karna padega code likhte time.
Sochna **algorithm me ho chuka hai**.

---
