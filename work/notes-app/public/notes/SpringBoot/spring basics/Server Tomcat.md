
## ✅ 1. What is it?

**Tomcat** is a **web server + servlet container**.
👉 It runs your Spring Boot application and handles HTTP requests.

In Spring Boot, Tomcat is **embedded (built-in)**.

---

## 🎯 2. Why is it used?

* To **run your backend APIs**
* To handle:

  * HTTP requests (GET, POST)
  * Responses
* To execute **Servlets (Spring MVC)**

👉 Without server → your API cannot run

---

## 📍 3. Where is it used?

* Automatically used when you add:

  ```
  spring-boot-starter-web
  ```
* Runs on default port:

  ```
  http://localhost:8080
  ```

---

## 💻 4. Small code example

```java
@RestController
public class TestController {

    @GetMapping("/hello")
    public String hello() {
        return "Hello World";
    }
}
```

👉 When app runs:

* Tomcat starts
* You open: `http://localhost:8080/hello`
* Tomcat handles request → returns response

---

## ⚙️ 5. Internal flow (step-by-step)

1. Spring Boot starts
2. Embedded Tomcat starts
3. Opens port (default 8080)
4. Receives HTTP request
5. Passes request to **DispatcherServlet**
6. Calls Controller method
7. Sends response back to client

---

## ⚠️ 6. Common mistake beginners make

* ❌ Thinking Tomcat is separate install (Spring Boot has embedded)
* ❌ Port already in use → app fails
* ❌ Not understanding request flow (Tomcat → Spring → Controller)

---

## 🧠 7. Active recall questions

1. What is the role of Tomcat in Spring Boot?
2. What is default port of Tomcat?
3. What happens after Tomcat receives a request?

---
