
---

## Concept: Constructor

### 1️⃣ WHY (Problem)

👉 **Why does this concept exist?**  
To put an object into a **usable state** right after creation.

👉 **What problem without it?**  
Every object would be created with empty/null fields. You'd need to call an extra `init()` method manually. If you forget, the object breaks.

---

### 2️⃣ WHAT (Responsibility)

👉 **One main job?**  
Initialize object fields (set values).

👉 **What it does and does NOT do?**  
✅ Does: assign fields, validation, initial setup  
❌ Does NOT: allocate memory (Java does that first), business logic

---

### 3️⃣ WHERE (Position / Flow)

👉 **Where in code flow?**  
**Immediately after** the `new` keyword — before any other method is called on the object.

```
new User() → Memory allocated → Constructor runs → Object ready
```

---

### 4️⃣ HOW (Input → Output)

👉 **What input does it take?**  
Parameters (optional) — like `String name`, `int age`

👉 **What output does it give?**  
Nothing (technically `void`). The object becomes ready implicitly.

---

### 5️⃣ FAIL (Mistake / Bug)

👉 **Most common mistake?**  
Forgetting constructor injection in Spring Boot → `NullPointerException` at runtime.

👉 **Where to start debugging?**  
Check if constructor parameter is coming as `null` → means calling code didn't pass the correct value.

---

## 🧠 Active Recall (3 questions)

1. What is the return type of a constructor? → **None (no return type)**

2. What happens if I don't write any constructor? → **Java provides a default no-arg constructor**

3. Can a constructor be private? → **Yes — used in Singleton pattern**