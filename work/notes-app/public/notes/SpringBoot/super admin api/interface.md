Here are your **final short notes** for **Interface** using your 5-question template.

---

## Concept: Interface

### 1️⃣ WHY
**Contract define karne** ke liye — "jo bhi class ye implement karegi, usme ye methods **honge hi**."  
Bina interface ke: alag-alag classes me same naam ke methods alag tarah se kaam kar sakte, koi guarantee nahi.

### 2️⃣ WHAT
Sirf ek kaam: **method signatures** batana (kya hoga) — **kaise hoga** nahi batana.  
Ye object nahi banata, memory allocate nahi karta — sirf rules likhta hai.

### 3️⃣ WHERE
Spring Boot me **Service layer** aur **Repository layer** ke beech — `UserService` interface, `UserServiceImpl` class.  
Dependency Injection interface ke through hota hai.

### 4️⃣ HOW
**Input:** Koi nahi (interface khud kuch leta nahi)  
**Output:** Ek contract jo classes follow karti hain

```java
public interface UserService {
    void save();  // sirf declaration, no body
}

public class UserServiceImpl implements UserService {
    public void save() { 
        // actual code
    }
}
```

### 5️⃣ FAIL
Interface me **method change kiya** to **saari implementing classes toot jayegi**.  
Debug: compile time error aata hai — "class must implement abstract method". Fix: sab classes me same change karo.

---

## 3 Active Recall Questions

| # | Question | Answer |
|---|----------|--------|
| 1 | Interface me method ka body ho sakta hai? | Haan (default/static methods — Java 8+), but traditional interface me nahi |
| 2 | Ek class kitne interfaces implement kar sakti hai? | Multiple (classes ki tarah ek nahi, unlimited) |
| 3 | Interface ka object bana sakte ho? | Nahi — sirus class ka object banega jo implement kare |