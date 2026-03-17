
## ✅ 1. What is it?

`@Configuration` tells Spring:
👉 *“This class contains bean definitions (object creation logic).”*

It is used to define **custom objects (beans)** manually.

---

## 🎯 2. Why is it used?

* To **create and manage beans manually**
* When auto-configuration is not enough
* To control object creation logic

👉 Gives you more control over Spring container

---

## 📍 3. Where is it used?

* In a **separate config class**
* Inside **Spring Boot project** for custom setup

---

## 💻 4. Small code example

```java id="r0fx9z"
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class AppConfig {

    @Bean
    public MyService myService() {
        return new MyService();
    }
}
```

---

## ⚙️ 5. Internal flow (step-by-step)

1. Spring scans class with `@Configuration`
2. Finds methods with `@Bean`
3. Calls those methods
4. Stores returned objects in **Spring Container (IOC)**
5. These objects are reused (singleton by default)

---

## ⚠️ 6. Common mistake beginners make

* ❌ Forgetting `@Bean` → object not managed by Spring
* ❌ Thinking it creates objects automatically (you must define them)
* ❌ Creating objects with `new` outside config → not managed by Spring

---

## 🧠 7. Active recall questions

1. What is the role of `@Bean` inside `@Configuration`?
2. Who calls the methods inside a config class?
3. What happens if you don’t use `@Configuration`?

---
