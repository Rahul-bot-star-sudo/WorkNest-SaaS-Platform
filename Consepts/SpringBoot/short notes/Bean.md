

## ✅ 1. What is it?

A **Bean** is simply an **object managed by Spring**.
👉 Created, stored, and controlled inside the **ApplicationContext (container)**

---

## 🎯 2. Why is it used?

* To let Spring **manage object lifecycle**
* To enable **Dependency Injection (DI)**
* To reuse objects (no need to create again)

---

## 📍 3. Where is it used?

Beans are created using:

* `@Component`
* `@Service`
* `@Repository`
* `@Controller`
* `@Bean` (manual way)

---

## 💻 4. Small code example

### ✅ Auto Bean

```java id="8o1y2b"
@Service
public class MyService {
}
```

### ✅ Manual Bean

```java id="g5t7ka"
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

1. Spring starts
2. Scans classes (`@ComponentScan`)
3. Finds annotations (`@Service`, etc.)
4. Creates objects (beans)
5. Stores them in container
6. Injects them where needed (`DI`)

---

## ⚠️ 6. Common mistake beginners make

* ❌ Thinking every object is a bean (only Spring-managed ones)
* ❌ Using `new` instead of letting Spring manage
* ❌ Creating duplicate beans → conflicts

---

## 🧠 7. Active recall questions

1. What is a bean in Spring?
2. How are beans created automatically?
3. What is the difference between `@Component` and `@Bean`?

---

💡 Simple understanding:

👉 Normal object = you create
👉 Bean = Spring creates & manages

---
