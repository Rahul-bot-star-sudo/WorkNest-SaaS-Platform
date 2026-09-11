## Concept: **Access Modifier (Java)**

### 1️⃣ What is it?

An **access modifier** controls **who can access a class, variable, or method** in Java.
It defines the **visibility and scope** of code.

Main access modifiers:

```text
public
protected
default (no keyword)
private
```

---

### 2️⃣ Why is it used?

* To **protect data**
* To control **which parts of code can be accessed**
* To follow **encapsulation (OOP principle)**

Example idea:

```text
private → only inside class
public → accessible everywhere
```

---

### 3️⃣ Where is it used in a Spring Boot project?

Common usage in backend:

| Layer           | Example                |
| --------------- | ---------------------- |
| Entity          | private fields         |
| Service         | public methods         |
| Controller      | public APIs            |
| Utility classes | private helper methods |

Example:

```text
private fields + public getters/setters
```

---

### 4️⃣ Small Code Example

```java
public class User {

    private String name;   // only inside class

    public void setName(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

}
```

Access:

```java
User user = new User();
user.setName("Rahul");
```

---

### 5️⃣ Internal Flow

```text
Class loads
↓
Access modifier checked by compiler
↓
If access allowed → code runs
↓
If not allowed → compile-time error
```

Example:

```text
private method called outside class
↓
Java compiler blocks it
```

---

### 6️⃣ Common Beginner Mistake

**Making everything `public`**

Bad practice:

```java
public String password;
```

Better practice:

```java
private String password;
```

Use **getters/setters** to access it.

---

### 7️⃣ Active Recall

1️⃣ Which access modifier allows access **only inside the class**?
2️⃣ Which modifier allows access **everywhere**?
3️⃣ Why are entity variables usually **private** in Spring Boot?
