## Concept: **Class (Java)**

### 1️⃣ What is it?

A **class** is a blueprint for creating objects in Java.
It defines **properties (variables)** and **behaviors (methods)** that objects will have.

Example idea:

```
Class = blueprint
Object = real instance created from blueprint
```

---

### 2️⃣ Why is it used?

* To **organize code into reusable structures**
* To represent **real-world entities** (User, Order, Product)
* To support **Object-Oriented Programming (OOP)**

---

### 3️⃣ Where is it used in a Spring Boot project?

Classes are used **everywhere** in a Spring Boot backend:

| Folder     | Example Class    |
| ---------- | ---------------- |
| Controller | `UserController` |
| Service    | `UserService`    |
| Repository | `UserRepository` |
| Entity     | `User`           |
| Config     | `SecurityConfig` |

So every component in Spring Boot is basically a **class**.

---

### 4️⃣ Small Code Example

```java
public class User {

    String name;
    String email;

    void login() {
        System.out.println("User logged in");
    }

}
```

Create object:

```java
User user = new User();
```

---

### 5️⃣ Internal Flow

```
Class defined
↓
JVM loads the class
↓
Object created using "new"
↓
Memory allocated
↓
Methods and variables accessible
```

---

### 6️⃣ Common Beginner Mistake

**Confusing class and object**

Wrong thinking:

```
Class = object
```

Correct:

```
Class = blueprint
Object = actual instance
```

Example:

```
Class → Car
Object → MyCar
```

---

### 7️⃣ Active Recall

1️⃣ What is the difference between **class and object**?
2️⃣ Which keyword creates an object from a class?
3️⃣ Name two places where classes are used in a **Spring Boot project**.
