Here are your **very short study notes on JPA** 👇

---

## 🔹 1. What is it?

* **JPA (Java Persistence API)** is a specification
* It defines how Java objects are stored in a database
* Uses ORM (object ↔ table mapping)

---

## 🔹 2. Why is it used?

* Avoid writing SQL manually
* Perform CRUD using Java methods
* Cleaner and faster backend code

---

## 🔹 3. Where is it used?

* In **Repository layer**
* With interfaces like `JpaRepository`
* Works with Entity classes (`@Entity`)

---

## 🔹 4. Small Code Example

```java
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
```

👉 Now you get:

* save()
* findById()
* findAll()
* delete()

---

## 🔹 5. Internal Flow (Step-by-step)

1. You call `userRepository.save(user)`
2. JPA (via Hibernate) converts object → SQL
3. SQL runs on database
4. Result comes back → converted to object
5. Returned to your service

---

## 🔹 6. Common Mistakes ❌

* Thinking JPA = Hibernate (Hibernate is implementation)
* Not creating Entity class properly
* Writing unnecessary SQL when JPA can handle it
* Not understanding method naming (findByEmail etc.)

---

## 🔹 7. Active Recall Questions 🧠

1. Is JPA a framework or specification?
2. What converts object → SQL in JPA?
3. Why do we extend `JpaRepository`?

---

If you want, next best step is 👉 **Hibernate (how JPA actually works internally)** 🔥
