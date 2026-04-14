
## ✅ 1. What is it?

`ApplicationContext` is the **Spring container**.
👉 It stores and manages all **beans (objects)** in your application.

Think: *“Central place where all objects live”*

---

## 🎯 2. Why is it used?

* To **create and manage beans**
* To handle **Dependency Injection**
* To provide **configuration and lifecycle management**

👉 Without it, Spring cannot work

---

## 📍 3. Where is it used?

* Created automatically when app starts
* Used internally by Spring Boot
* You can also access it manually if needed

---

## 💻 4. Small code example

```java
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Test {
    public static void main(String[] args) {

        ApplicationContext context =
                new AnnotationConfigApplicationContext(AppConfig.class);

        MyService service = context.getBean(MyService.class);
        service.doWork();
    }
}
```

---

## ⚙️ 5. Internal flow (step-by-step)

1. Spring Boot starts
2. Creates `ApplicationContext`
3. Scans classes (`@ComponentScan`)
4. Creates beans
5. Stores them inside container
6. Injects dependencies (`@Autowired`)
7. Provides beans when needed (`getBean()`)

---

## ⚠️ 6. Common mistake beginners make

* ❌ Using `new` instead of getting bean from context
* ❌ Thinking objects are auto-created without context
* ❌ Calling `getBean()` everywhere (not best practice)

---

## 🧠 7. Active recall questions

1. What does `ApplicationContext` store?
2. Who creates the `ApplicationContext`?
3. Why should we avoid using `new` for Spring-managed classes?

---
