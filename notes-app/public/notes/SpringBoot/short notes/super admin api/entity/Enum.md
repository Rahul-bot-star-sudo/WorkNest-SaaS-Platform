
## 🔹 1. What is it?

* `enum` = special Java type for **fixed set of constants**
* Example: roles → ADMIN, USER, SUPER_ADMIN

---

## 🔹 2. Why is it used?

* Avoid hardcoding strings
* Type-safe (no invalid values)
* Cleaner and safer code

---

## 🔹 3. Where is it used?

* In **Entity (for roles/status)**
* In **RBAC systems**
* Example: User role field

---

## 🔹 4. Small Code Example

```java id="l9k2zx"
public enum Role {
    USER,
    ADMIN,
    SUPER_ADMIN
}
```

```java id="u7h3qn"
@Entity
public class User {

    @Enumerated(EnumType.STRING)
    private Role role;
}
```

---

## 🔹 5. Internal Flow (Step-by-step)

1. Enum defined in Java
2. Used in Entity field
3. JPA stores value in DB (e.g., "ADMIN")
4. On fetch → converted back to enum
5. Used in logic (RBAC, conditions)

---

## 🔹 6. Common Mistakes ❌

* Using `EnumType.ORDINAL` (can break if order changes)
* Hardcoding strings instead of enum
* Not matching DB values with enum names

---

## 🔹 7. Active Recall Questions 🧠

1. Why is enum better than String for roles?
2. What does `@Enumerated(EnumType.STRING)` do?
3. What problem happens with ORDINAL?

---
