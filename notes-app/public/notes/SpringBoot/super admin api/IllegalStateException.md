Here are your **final short notes** for **`IllegalStateException`** using your 5-question template.

---

## Concept: `IllegalStateException`

### 1️⃣ WHY
**Object ki current state** method call ke liye **suitable nahi hai** — ye batane ke liye.  
Bina iske: method silently fail ho jayega ya galat result dega → bug pata nahi chalega.

### 2️⃣ WHAT
Sirf ek kaam: signal karna — **"Abhi ye method call nahi kar sakte, pehle X karo"**.  
Ye logical error hai, compile-time error nahi — runtime pe pata chalta hai.

### 3️⃣ WHERE
Spring Boot me common jagah:
- **Response already committed** — phirse response send karne ki koshish
- **Session already invalidated** — closed session pe operation
- **Bean initialization me** — koi dependency available nahi hai abhi

### 4️⃣ HOW
**Input:** Error message (String) — optional  
**Output:** Exception thrown — program rukta hai (agar handle na kiya to)

```java
public class Connection {
    private boolean connected = false;
    
    public void connect() {
        connected = true;
    }
    
    public void sendData(String data) {
        if (!connected) {
            throw new IllegalStateException("Cannot send data. Call connect() first.");
        }
        // send data logic
    }
}
```

**Spring Boot real example:**
```java
@Service
public class EmailService {
    private JavaMailSender mailSender;
    
    public void sendEmail(String to, String msg) {
        if (mailSender == null) {
            throw new IllegalStateException("MailSender not initialized. Check configuration.");
        }
        // send email
    }
}
```

### 5️⃣ FAIL
**Galat condition check** — exception tab throw karo jab state **actually invalid** ho.  
Common mistake: null check ke liye `IllegalStateException` use karna (ye `NullPointerException` ya `IllegalArgumentException` hona chahiye).

```java
// ❌ Galat
if (user == null) {
    throw new IllegalStateException("User is null");
}

// ✅ Sahi
if (user == null) {
    throw new IllegalArgumentException("User cannot be null");
}
```

**Debug kaha se start karein:**  
Stack trace dekho — konsi line pe throw hua? Uske upar ka code check karo — kya method pehle call karna bhool gaye?

---

## 3 Active Recall Questions

| # | Question | Answer |
|---|----------|--------|
| 1 | `IllegalStateException` checked hai ya unchecked? | Unchecked (extends `RuntimeException`) |
| 2 | `IllegalArgumentException` vs `IllegalStateException` me kya fark hai? | Argument galat hai vs Object ki state galat hai |
| 3 | Agar response commit ho chuka hai aur phirse send kar rahe ho — kaunsi exception aayegi? | `IllegalStateException` |

---

## 🔥 Interview Tip

> **"IllegalStateException = Method call wrong TIME pe ho rahi hai. IllegalArgumentException = Method call wrong VALUE ke saath ho rahi hai."**

---

## 🎯 Strategy — Is concept ko kaise master karein

| Step | Karna kya hai |
|------|----------------|
| **Aaj** | Apne code me ek `IllegalStateException` deliberately throw karo aur catch karo |
| **Kal** | Spring Boot me — kisi bean ko `@PostConstruct` se pehle use karne ki koshish karo |
| **Debug practice** | Exception ka stack trace padhna seekho — kaunsi line pe throw hua |
| **Interview ready** | Bol sakte ho: "Ye unchecked exception hai — compile time nahi pakadta, runtime pe pata chalta hai ki method call karne se pehle object sahi state me nahi hai" |

---

Kya tum chahte ho mein **`@PostConstruct`** ya **`ResponseStatusException`** pe agla concept bana doon?