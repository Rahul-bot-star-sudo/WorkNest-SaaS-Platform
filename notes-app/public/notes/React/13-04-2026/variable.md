### 1. What is it?

A variable in JavaScript is a **container to store data**.
It can hold **any type** (number, string, object, array).

---

### 2. Why is it used?

* To **store user input**
* To **handle API data**
* To make UI **dynamic**

---

### 3. Where is it used in a Spring Boot project?

* Store API response in React (`users`, `token`)
* Store form data before sending to backend
* Example: login email/password sent to Spring Boot

---

### 4. Small code example

```javascript id="t9l0a2"
let name = "Rahul";
const age = 21;
var city = "Pune";
```

---

### 5. Internal flow (step-by-step)

1. Variable declared using `let`, `const`, or `var`
2. Memory allocated
3. Value assigned
4. Used in logic / UI
5. Can be updated (`let`), not updated (`const`)

---

### 6. Common mistake beginners make

* Using `var` instead of `let/const`
* Reassigning `const` (error ❌)
* Not understanding scope (block vs function)

---

### 7. 3 Active Recall Questions

1. Difference between `let`, `const`, and `var`?
2. Why should we avoid `var`?
3. When do you use `const` in API calls?
