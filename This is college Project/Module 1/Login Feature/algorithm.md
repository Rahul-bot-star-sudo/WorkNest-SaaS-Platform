Perfect 👍
Ab **isi CODE FLOW ka EXACT ALGORITHM** likh rahe hain —
👉 jise tum **direct code me convert** kar sakte ho
👉 **ek bhi extra cheez nahi**

---

# 🔐 LOGIN FEATURE — CODE FLOW ALGORITHM

---

## 🧠 ALGORITHM: `LOGIN_USER(dto)`

### 📥 INPUT

```
dto.email : string
dto.password : string
```

### 📤 OUTPUT

```
token + safe user object
OR
error
```

---

## 🪜 STEP–BY–STEP ALGORITHM (CODE-READY)

```
ALGORITHM LOGIN_USER(dto)

STEP 1: VALIDATE_INPUT(dto)
    IF dto.email is missing OR dto.password is missing
        THROW "Email and password required"

STEP 2: FETCH_USER(dto.email)
    user = FIND user by email

    IF user is null
        THROW "Invalid email or password"

STEP 3: VERIFY_PASSWORD(dto.password, user.password)
    isValid = COMPARE plain password WITH hashed password

    IF isValid is false
        THROW "Invalid email or password"

STEP 4: CHECK_USER_STATUS(user.status)
    IF user.status != "ACTIVE"
        THROW "User account is inactive"

STEP 5: GENERATE_TOKEN(user.id, user.role)
    token = SIGN JWT using userId and role

STEP 6: PREPARE_SAFE_RESPONSE(user, token)
    REMOVE password from user object

STEP 7: RETURN response
    RETURN {
        token,
        user (safe)
    }

END ALGORITHM
```

---

## 🧠 FUNCTION–MAPPING (Algorithm → Code)

| Algorithm Step        | Function / File      |
| --------------------- | -------------------- |
| VALIDATE_INPUT        | `auth.service.ts`    |
| FETCH_USER            | `user.repository.ts` |
| VERIFY_PASSWORD       | `password.util.ts`   |
| CHECK_USER_STATUS     | `auth.service.ts`    |
| GENERATE_TOKEN        | `jwt.util.ts`        |
| PREPARE_SAFE_RESPONSE | `auth.service.ts`    |

---

## 🧠 ONE-LINE INTERVIEW ANSWER

> “Login algorithm pehle input validate karta hai, phir user fetch, bcrypt password compare, status check aur successful case me JWT generate karta hai.”

---

## ✅ IMPORTANT (EXAM / PROJECT USE)

✔ Ye **language-independent** algorithm hai
✔ Java / Node / Python sab me same
✔ Direct unit-test likhne layak
✔ Production-grade flow

---

Next logical step:
1️⃣ **JWT verify middleware ka algorithm**
2️⃣ **Refresh token algorithm**
3️⃣ **Angular login guard flow**

Bas bolo: **NEXT 🔥**
