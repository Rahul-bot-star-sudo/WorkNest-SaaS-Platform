
---

## 🔹 1. What is it?

* `@Service` is a Spring annotation
* Marks a class as **business logic layer (service layer)**

---

## 🔹 2. Why is it used?

* To separate business logic from controller
* Makes code clean and maintainable
* Managed by Spring (no need for `new`)

---

## 🔹 3. Where is it used?

* In **Service layer classes**
* Between Controller ↔ Repository

---

## 🔹 4. Small Code Example

```java id="s8f2lm"
@Service
public class UserService {

    public String getUser() {
        return "User Data";
    }
}
```

👉 Used in controller:

```java id="p1x7qa"
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/user")
    public String getUser() {
        return userService.getUser();
    }
}
```

---

## 🔹 5. Internal Flow (Step-by-step)

1. Spring Boot starts
2. Scans `@Service` classes
3. Creates bean (object) in container
4. Injects into controller
5. Controller calls service methods

---

## 🔹 6. Common Mistakes ❌

* Writing business logic in controller
* Using `new UserService()` instead of DI
* Not annotating service → bean not created
* Overloading service with too many responsibilities

---

## 🔹 7. Active Recall Questions 🧠

1. What is the role of `@Service`?
2. Why avoid using `new` for service?
3. Where should business logic be written?

---
