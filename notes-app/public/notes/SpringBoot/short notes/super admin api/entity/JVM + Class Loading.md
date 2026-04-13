Here are your **very short study notes on JVM + Class Loading** 👇

---

## 🔹 1. What is it?

* **JVM (Java Virtual Machine)** runs Java programs
* **Class Loading** = process of loading `.class` files into memory

---

## 🔹 2. Why is it used?

* Converts compiled code → executable code
* Loads classes only when needed (efficient memory use)

---

## 🔹 3. Where is it used?

* Every time you run a **Spring Boot app**
* Loads:

  * Controllers
  * Services
  * Entities
  * Config classes

---

## 🔹 4. Small Code Example

```java id="7m7g8z"
public class Main {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}
```

👉 JVM loads `Main.class` before executing

---

## 🔹 5. Internal Flow (Step-by-step)

1. `.java` → compiled to `.class`
2. JVM starts
3. **ClassLoader** loads `.class` file
4. Verifies bytecode
5. Links (prepare + resolve)
6. Initializes class (runs static blocks)
7. Executes `main()` or Spring Boot app

---

## 🔹 6. Common Mistakes ❌

* Thinking JVM = compiler (compiler is separate)
* Not understanding lazy loading (classes load when needed)
* Ignoring classpath issues (class not found errors)

---

## 🔹 7. Active Recall Questions 🧠

1. What is the role of JVM?
2. What does ClassLoader do?
3. When does class loading happen?

---

If you want, next concept should be 👉 **Spring Boot Startup Flow (connect everything together)** 🔥
