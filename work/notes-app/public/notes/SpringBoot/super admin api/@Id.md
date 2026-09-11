
## 🔹 1. What is it?

* `@Id` is a JPA annotation
* It marks a field as **Primary Key (unique identifier)**

---

## 🔹 2. Why is it used?

* To uniquely identify each row in database
* Required for every Entity
* Used for CRUD operations

---

## 🔹 3. Where is it used?

* In **Entity class**
* On the field representing primary key (usually `id`)

---

## 🔹 4. Small Code Example

```java id="x9v2la"
@Entity
public class User {

    @Id
    private Long id;

    private String email;
}
```

👉 With auto-generation:

```java id="n3b7kp"
@Id
@GeneratedValue(strategy = GenerationType.IDENTITY)
private Long id;
```

---

## 🔹 5. Internal Flow (Step-by-step)

1. Entity defined with `@Id`
2. JPA maps it as primary key column
3. When saving → used to identify record
4. For update → same ID is used
5. For fetch/delete → query uses ID

---

## 🔹 6. Common Mistakes ❌

* Not adding `@Id` (app will fail)
* Using non-unique field as ID
* Changing ID manually after save
* Multiple `@Id` without proper config

---

## 🔹 7. Active Recall Questions 🧠

1. Why is `@Id` mandatory in an entity?
2. What happens if two rows have same ID?
3. How does JPA use ID in update operations?

---
