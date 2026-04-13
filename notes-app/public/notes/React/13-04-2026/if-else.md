### 1. What is it?

`if-else` is a **conditional statement**.
It runs code **based on a condition (true/false)**.

---

### 2. Why is it used?

* To **control flow of program**
* To make decisions (login success/fail)
* To handle **different cases**

---

### 3. Where is it used in a Spring Boot project?

* React: show UI based on response (`success/error`)
* Backend: check conditions (user exists, password correct)
* Example: login validation

---

### 4. Small code example

```javascript id="m4k8pz"
const age = 18;

if (age >= 18) {
  console.log("Adult");
} else {
  console.log("Minor");
}
```

---

### 5. Internal flow (step-by-step)

1. Condition is checked
2. If true → `if` block runs
3. If false → `else` block runs
4. Only one block executes

---

### 6. Common mistake beginners make

* Using `=` instead of `==` or `===` ❌
* Writing complex conditions without clarity
* Forgetting curly braces `{}`

---

### 7. 3 Active Recall Questions

1. Difference between `==` and `===`?
2. What happens if condition is false?
3. Where do you use `if-else` in API handling?
