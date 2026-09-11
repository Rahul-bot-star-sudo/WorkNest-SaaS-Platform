
## ✅ 1. What is it?

`@ComponentScan` tells Spring:
👉 *“Scan this package and find all components (classes) to manage.”*

It automatically detects:

* `@Component`
* `@Service`
* `@Repository`
* `@Controller`

---

## 🎯 2. Why is it used?

* To **automatically create beans**
* To avoid manual configuration
* To connect your layers (Controller → Service → Repository)

👉 Without it, Spring won’t know your classes exist

---

## 📍 3. Where is it used?

* Inside **main class** (via `@SpringBootApplication`)
* Or in a **custom config class**

👉 By default: scans **current package + sub-packages**

---

## 💻 4. Small code example

```java id="k3m2ap"
@Configuration
@ComponentScan(basePackages = "com.myapp")
public class AppConfig {
}
```

Or default (no need to write):

```java id="z4o8np"
@SpringBootApplication // already includes @ComponentScan
public class MyApp {
}
```

---

## ⚙️ 5. Internal flow (step-by-step)

1. Spring starts application
2. `@ComponentScan` runs
3. It scans given package
4. Finds classes with annotations
5. Creates objects (beans)
6. Stores them in Spring Container
7. Injects them where needed (`@Autowired`)

---

## ⚠️ 6. Common mistake beginners make

* ❌ Putting classes outside base package → not scanned
* ❌ Wrong package path in `basePackages`
* ❌ Thinking all classes are scanned (only annotated ones)

---

## 🧠 7. Active recall questions

1. Which annotations are detected by `@ComponentScan`?
2. What happens if your service class is outside base package?
3. Why do we rarely write `@ComponentScan` manually in Spring Boot?

---
