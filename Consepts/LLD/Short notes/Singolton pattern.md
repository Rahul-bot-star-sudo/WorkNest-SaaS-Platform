
# Singleton Design Pattern — Short Backend Notes

## 1️⃣ What is it?

A **Singleton** is a design pattern that ensures **only one object of a class exists in the entire application**.

That single object is **shared everywhere** instead of creating many objects.

---

## 2️⃣ Why is it used? (Purpose)

Used when **only one instance should control something**.

Examples in backend:

* Database connection manager
* Configuration manager
* Logging system
* Cache manager

This avoids **multiple objects doing the same job**.

---

## 3️⃣ Where is it used in a Spring Boot project?

In **Spring Boot**, most beans are **Singleton by default**.

Example:

* `@Service`
* `@Repository`
* `@Controller`
* `@Component`

Spring creates **only one object** of these classes and shares it across the application.

Example:
One `UserService` object used by many controllers.

---

## 4️⃣ Small Code Example

### Basic Singleton (Java)

```java
public class DatabaseConnection {

    private static DatabaseConnection instance;

    private DatabaseConnection() {
        System.out.println("Connection created");
    }

    public static DatabaseConnection getInstance() {
        if(instance == null) {
            instance = new DatabaseConnection();
        }
        return instance;
    }
}
```

Use it:

```java
DatabaseConnection db1 = DatabaseConnection.getInstance();
DatabaseConnection db2 = DatabaseConnection.getInstance();
```

Both variables point to **same object**.

---

## 5️⃣ Internal Flow (Step-by-Step)

1. Class has **private constructor** → prevents `new` object creation.
2. Class stores **static instance variable**.
3. `getInstance()` method checks:

   * If instance **null → create object**
   * If instance **exists → return same object**
4. All classes use **same shared object**.

---

## 6️⃣ Common Mistake Beginners Make

❌ **Creating object using `new`**

```java
DatabaseConnection db = new DatabaseConnection(); // WRONG
```

Constructor should be **private**.

---

❌ **Ignoring thread safety**

In multithread apps, two threads might create **two instances**.

Solution:

* `synchronized`
* Double check locking
* Enum singleton

---

## 7️⃣ Active Recall Questions

1️⃣ Why do we make the **constructor private** in Singleton?

2️⃣ Why are **Spring Beans singleton by default**?

3️⃣ Name **two backend components** where Singleton is useful.

---

✅ **Quick backend insight**

In **Spring Boot**, you usually **don't manually create Singleton classes**.
Spring’s **IoC container automatically manages singleton beans**.
