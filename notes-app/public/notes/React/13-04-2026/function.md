### 1. What is it?

A function is a **block of code that runs when called**.
It can **take input (parameters)** and **return output**.

---

### 2. Why is it used?

* To **reuse code**
* To **organize logic**
* To make code **clean and modular**

---

### 3. Where is it used in a Spring Boot project?

* In React: handle events, API calls
* Example: `loginUser()` calls Spring Boot `/login` API
* Backend also uses methods (functions in Java)

---

### 4. Small code example

```javascript id="d8k3ls"
function greet(name) {
  return "Hello " + name;
}

console.log(greet("Rahul"));
```

Arrow function:

```javascript id="j4k8mz"
const add = (a, b) => a + b;
```

---

### 5. Internal flow (step-by-step)

1. Function is defined
2. Function is called
3. Arguments are passed
4. Code inside runs
5. Result is returned

---

### 6. Common mistake beginners make

* Forgetting `return`
* Confusing function vs function call
* Not handling async functions properly (API calls)

---

### 7. 3 Active Recall Questions

1. What is the difference between function and function call?
2. When do we use arrow functions?
3. What happens if a function has no `return`?
