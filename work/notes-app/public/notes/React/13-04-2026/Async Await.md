### 1. What is it?

`async/await` is used to **handle asynchronous code like API calls** in a simple way.
It makes async code look like **normal synchronous code**.

---

### 2. Why is it used?

* To **avoid callback hell / .then() chaining**
* To write **clean and readable API logic**
* To handle **waiting for responses**

---

### 3. Where is it used in a Spring Boot project?

* In React when calling Spring Boot APIs
* Example: login, fetch users, send data
* Used inside `useEffect` or event handlers

---

### 4. Small code example

```javascript id="r8k2lm"
async function getUsers() {
  const res = await fetch("http://localhost:8080/api/users");
  const data = await res.json();
  console.log(data);
}
```

---

### 5. Internal flow (step-by-step)

1. Function marked as `async`
2. API call starts
3. `await` pauses execution
4. Response comes back
5. Data is processed
6. Function continues execution

---

### 6. Common mistake beginners make

* Using `await` outside `async` ❌
* Not handling errors (`try-catch` missing)
* Forgetting `await` → gets Promise instead of data

---

### 7. 3 Active Recall Questions

1. Why do we use `await` before API calls?
2. What happens if `await` is missing?
3. Why is `try-catch` important in async code?
