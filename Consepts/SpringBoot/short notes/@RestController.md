Good 👍 this is **very important for building APIs in Spring Boot**.

---

## ✅ 1. What is it?

`@RestController` is used to create **REST APIs**.
👉 It tells Spring: *“This class will handle HTTP requests and return data (JSON).”*

It is a combination of:

* `@Controller`
* `@ResponseBody`

---

## 🎯 2. Why is it used?

* To build **backend APIs**
* To return **JSON data directly** (no HTML view)
* Used in **frontend-backend communication (React + Spring Boot)**

---

## 📍 3. Where is it used?

* In **Controller layer**
  👉 Handles incoming HTTP requests

---

## 💻 4. Small code example

```java id="n6x3kp"
@RestController
public class UserController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello World";
    }
}
```

👉 API:

```
http://localhost:8080/hello
```

---

## ⚙️ 5. Internal flow (step-by-step)

1. Client sends request (browser/Postman)
2. Tomcat receives request
3. `DispatcherServlet` routes it
4. Calls controller method
5. Method returns data
6. Spring converts it to JSON
7. Response sent back

---

## ⚠️ 6. Common mistake beginners make

* ❌ Using `@Controller` instead of `@RestController` for APIs
* ❌ Forgetting mapping (`@GetMapping`, etc.)
* ❌ Expecting HTML instead of JSON

---

## 🧠 7. Active recall questions

1. What is the difference between `@Controller` and `@RestController`?
2. Why does `@RestController` return JSON automatically?
3. Which component routes request to controller?

---

💡 Simple understanding:

👉 `@Controller` → returns **view (HTML)**
👉 `@RestController` → returns **data (JSON)**

---

If you want next, I can explain **@RequestMapping / @GetMapping / @PostMapping** — these are used with controllers in real projects 🚀
