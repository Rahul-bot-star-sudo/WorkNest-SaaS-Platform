
## 🔹 1. What is it?

* **RBAC (Role-Based Access Control)** = control access based on roles
* Example: ADMIN, USER, SUPER_ADMIN

---

## 🔹 2. Why is it used?

* Restrict features based on user role
* Improves security
* Clean permission management

---

## 🔹 3. Where is it used?

* In **Authentication + Authorization module**
* Backend:

  * Controllers (API access)
  * Security config (Spring Security)

---

## 🔹 4. Small Code Example

```java id="r3j9zp"
@PreAuthorize("hasRole('ADMIN')")
@GetMapping("/admin")
public String adminOnly() {
    return "Only Admin can access";
}
```

---

## 🔹 5. Internal Flow (Step-by-step)

1. User logs in → gets JWT token
2. Token contains role (e.g., ADMIN)
3. Request sent with token
4. Spring Security checks role
5. If role matches → access granted
6. Else → 403 Forbidden

---

## 🔹 6. Common Mistakes ❌

* Not storing role in JWT
* Confusing authentication vs authorization
* Hardcoding roles everywhere
* Not securing all endpoints

---

## 🔹 7. Active Recall Questions 🧠

1. What is the difference between authentication and authorization?
2. Where is role checked in backend flow?
3. What happens if user role doesn’t match?

---
