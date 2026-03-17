Nice 👍 this is used in **every API you build**.

---

## ✅ 1. What is it?

`@RequestMapping` is used to **map HTTP requests to a method or class**.
👉 It tells Spring: *“When this URL is called, run this method.”*

---

## 🎯 2. Why is it used?

* To define **API endpoints (URLs)**
* To handle different **HTTP methods** (GET, POST, etc.)
* To organize routes at **class + method level**

---

## 📍 3. Where is it used?

* On **class level** → base URL
* On **method level** → specific endpoint

---

## 💻 4. Small code example

```java id="x1p9zw"
@RestController
@RequestMapping("/users") // base URL
public class UserController {

    @RequestMapping("/hello")
    public String hello() {
        return "Hello User";
    }
}
```

👉 API:

```
http://localhost:8080/users/hello
```

---

## ⚙️ 5. Internal flow (step-by-step)

1. Request comes to server
2. `DispatcherServlet` checks mappings
3. Matches URL with `@RequestMapping`
4. Calls correct method
5. Returns response

---

## ⚠️ 6. Common mistake beginners make

* ❌ Not specifying HTTP method (GET/POST confusion)
* ❌ Conflicting URLs → mapping error
* ❌ Forgetting base path → wrong API URL

👉 Better use:

* `@GetMapping`
* `@PostMapping`

---

## 🧠 7. Active recall questions

1. What is the purpose of `@RequestMapping`?
2. Difference between class-level and method-level mapping?
3. Why do we prefer `@GetMapping` over `@RequestMapping`?

---

💡 Quick tip:

```java
@RequestMapping(value = "/hello", method = RequestMethod.GET)
```

👉 Same as:

```java
@GetMapping("/hello")
```

---

If you want next, I can explain **@GetMapping, @PostMapping, @PutMapping, @DeleteMapping** with real login API example 🚀
