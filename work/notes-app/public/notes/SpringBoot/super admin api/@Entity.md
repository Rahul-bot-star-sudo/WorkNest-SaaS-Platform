Here are your **very short study notes** 👇

---

## 🔹 1. What is it?

* `@Entity` is a JPA annotation used on a Java class
* It tells Spring Boot: **“This class = a database table”**

---

## 🔹 2. Why is it used?

* To map Java objects → database rows
* Helps us avoid writing SQL manually (ORM handles it)

---

## 🔹 3. Where is it used?

* In **Entity classes**
* Example path:

```
src/main/java/com/project/module/user/User.java
```

---

## 🔹 4. Small Code Example

```java
import jakarta.persistence.*;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String password;
}
```

---

## 🔹 5. Internal Flow (Step-by-step)

1. Spring Boot starts
2. JPA scans classes with `@Entity`
3. Creates table in DB (if not exists)
4. Each object → stored as a row
5. Repository uses this mapping to perform CRUD

---

## 🔹 6. Common Mistakes ❌

* Forgetting `@Id` (primary key required)
* Not adding default constructor
* Wrong package (not scanned by Spring Boot)
* Thinking entity = DTO (they are different)

---

## 🔹 7. Active Recall Questions 🧠

1. What happens if we don’t add `@Entity`?
2. Why is `@Id` mandatory in an entity?
3. How does JPA convert object → database row?

---

If you want, next I can explain **@Id vs @GeneratedValue** in the same short format 🚀
