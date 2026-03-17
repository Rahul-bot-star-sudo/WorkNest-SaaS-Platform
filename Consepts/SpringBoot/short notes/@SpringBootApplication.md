
## ✅ 1. What is it?

`@SpringBootApplication` is a **main annotation** in Spring Boot.
It tells Spring: *"Start my application and configure everything automatically."*

It is actually a combination of 3 annotations:

* `@Configuration`
* `@EnableAutoConfiguration`
* `@ComponentScan`

---

## 🎯 2. Why is it used?

* To **bootstrap (start)** the Spring Boot app
* To **auto-configure** beans (no manual setup needed)
* To **scan components** (controllers, services, etc.)

👉 In short: it reduces boilerplate code

---

## 📍 3. Where is it used?

* In the **main class** (entry point of project)
* Usually placed in the **base package**

---

## 💻 4. Small code example

```java
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MyApp {
    public static void main(String[] args) {
        SpringApplication.run(MyApp.class, args);
    }
}
```

---

## ⚙️ 5. Internal flow (step-by-step)

1. Spring starts from `main()`
2. `@SpringBootApplication` triggers:

   * Auto configuration
   * Component scanning
3. Spring finds:

   * `@Controller`
   * `@Service`
   * `@Repository`
4. Creates objects (beans)
5. Runs embedded server (Tomcat)

---

## ⚠️ 6. Common mistake beginners make

* ❌ Placing main class in wrong package → components not scanned
* ❌ Thinking it’s just one annotation (it’s actually 3 combined)
* ❌ Not understanding auto-configuration → confusion in debugging

---

## 🧠 7. Active recall questions

1. What 3 annotations are inside `@SpringBootApplication`?
2. Why should the main class be in the base package?
3. What happens if component scanning fails?

---
