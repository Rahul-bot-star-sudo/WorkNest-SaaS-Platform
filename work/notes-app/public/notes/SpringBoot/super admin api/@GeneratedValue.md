Here are your **very short study notes on `@GeneratedValue`** 👇

---

## 🔹 1. What is it?

* `@GeneratedValue` is a JPA annotation
* It tells: **“Primary key (ID) will be auto-generated”**

---

## 🔹 2. Why is it used?

* No need to manually set ID
* Ensures unique IDs automatically
* Avoids duplication errors

---

## 🔹 3. Where is it used?

* In **Entity class**
* Used with `@Id` field

---

## 🔹 4. Small Code Example

```java
@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
}
```

---

## 🔹 5. Internal Flow (Step-by-step)

1. You call `save(user)`
2. ID is **null** initially
3. ORM (Hibernate) sends INSERT query
4. Database generates ID (auto-increment)
5. ID is returned and set in object

---

## 🔹 6. Common Mistakes ❌

* Using without `@Id`
* Manually setting ID along with auto-generation
* Confusion between strategies (`IDENTITY`, `AUTO`, etc.)

---

## 🔹 7. Active Recall Questions 🧠

1. Why do we use `@GeneratedValue`?
2. What happens if ID is already set manually?
3. Which layer actually generates the ID (DB or Java)?

---

If you want next, learn 👉 **GenerationType strategies (AUTO vs IDENTITY vs SEQUENCE)** — very important for interviews 🚀
