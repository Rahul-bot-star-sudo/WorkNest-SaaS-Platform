Here are your **final short notes** for **Constructor** using your 5-question template.

---

## Concept: Constructor

### 1️⃣ WHY
Object ko turant usable state me lane ke liye.  
Bina constructor ke → object create karne ke baad alag se init() call karna padta, bhool gaye to NullPointerException.

### 2️⃣ WHAT
Sirf ek kaam: object ke fields initialize karna.  
Memory allocate karna uska kaam nahi hai (Java khud karta hai).

### 3️⃣ WHERE
`new` keyword ke turant baad, object ka koi bhi method call hone se pehle.

### 4️⃣ HOW
**Input:** Parameters (optional)  
**Output:** Kuch nahi — object ready ho jata hai

### 5️⃣ FAIL
Spring Boot me constructor injection bhoolna → dependency null reh jati hai.  
Debug: check karo constructor parameter null to aa raha hai.

---

## 3 Active Recall Questions

| # | Question | Answer |
|---|----------|--------|
| 1 | Constructor ka return type? | Koi nahi |
| 2 | Agar constructor nahi likha to? | Java default no-arg constructor deta hai |
| 3 | Kya constructor private ho sakta hai? | Haan (Singleton pattern me) |