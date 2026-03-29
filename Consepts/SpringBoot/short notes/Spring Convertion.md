Here are your **very short study notes on Spring Convention** 👇

---

## 🔹 1. What is it?

* Spring Convention = **default rules followed by Spring Boot**
* It follows **“Convention over Configuration”** (less manual setup)

---

## 🔹 2. Why is it used?

* Reduces boilerplate code
* No need to configure everything manually
* Faster development

---

## 🔹 3. Where is it used?

* Everywhere in Spring Boot:

  * Package structure
  * Bean creation
  * Database config
  * Naming (methods, classes)

---

## 🔹 4. Small Code Example

```java
@RestController
public class UserController {

    @GetMapping("/users")
    public String getUsers() {
        return "Users List";
    }
}
```

👉 No XML config needed — Spring auto-configures everything

---

## 🔹 5. Internal Flow (Step-by-step)

1. Spring Boot starts
2. Scans main package + sub-packages
3. Detects annotations (`@Component`, `@Entity`, etc.)
4. Auto-configures beans
5. Runs app without manual setup

---

## 🔹 6. Common Mistakes ❌

* Wrong package structure (class not scanned)
* Expecting manual config when Spring already does it
* Breaking naming conventions (confuses auto-detection)

---

## 🔹 7. Active Recall Questions 🧠

1. What does “Convention over Configuration” mean?
2. Why does Spring scan only certain packages?
3. What happens if your class is outside the main package?

---

If you want, next concept you should learn is 👉 **Dependency Injection (very important for interviews + real projects)** 🚀
