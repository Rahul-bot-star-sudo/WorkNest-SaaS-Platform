
## Concept: Immutability

### 1️⃣ WHY
Object **banne ke baad uski state change nahi ho sakti** — multithreading me safe, bugs kam aate hain.  
Bina immutability ke: ek thread object change kar de, doosra thread outdated value padh lega → data corruption.

### 2️⃣ WHAT
Sirf ek kaam: object **read-only** banana — getters allowed, setters nahi.  
Ye object ko freeze kar deta hai — koi bhi method state change nahi kar sakti.

### 3️⃣ WHERE
Spring Boot me **DTOs, configuration properties (`@ConfigurationProperties`)**, aur **response objects** — jo data ek baar set ho gaya, phir change nahi hona chahiye.

### 4️⃣ HOW
**Input:** Constructor se saari values  
**Output:** Immutable object — koi method uski values change nahi kar sakti

```java
public final class User {
    private final String name;  // final field
    private final int age;

    public User(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String getName() { return name; }  // only getter
    public int getAge() { return age; }
    // NO setters
}
```

### 5️⃣ FAIL
**Collection return kar di** (like `List`) bina copy ke — caller usme element add/remove kar sakta hai.  
Debug: return `Collections.unmodifiableList(list)` ya `List.copyOf(list)` karo.

---

## 3 Active Recall Questions

| # | Question | Answer |
|---|----------|--------|
| 1 | Immutable object ka field `final` kyu hona chahiye? | Constructor ke baad value change nahi ho sakti — thread safety guaranteed |
| 2 | Immutable object ka setter hota hai? | Nahi — setter se state change hoti hai, jo allowed nahi |
| 3 | `String` immutable hai ya mutable? | Immutable — har operation naya String banata hai |

---

## 🔥 Interview Tip

> **"Immutability = Thread-safe by default. No locks, no synchronization needed."**

---
