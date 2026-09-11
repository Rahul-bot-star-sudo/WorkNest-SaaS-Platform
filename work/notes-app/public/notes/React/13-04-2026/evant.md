### 1. What is it?

An event is an **action that happens in the browser**.
Example: click, typing, submit.

---

### 2. Why is it used?

* To **respond to user actions**
* To **trigger logic** (API call, state update)
* To make UI **interactive**

---

### 3. Where is it used in a Spring Boot project?

* In React frontend
* Example: on button click → call Spring Boot API (`/login`)
* Used in forms, buttons, inputs

---

### 4. Small code example

```javascript id="k2m9pl"
function handleClick() {
  console.log("Button clicked");
}

<button onClick={handleClick}>Click</button>
```

With input:

```javascript id="u7d4nx"
<input onChange={(e) => console.log(e.target.value)} />
```

---

### 5. Internal flow (step-by-step)

1. User performs action (click/type)
2. Event is triggered
3. Event handler function runs
4. Logic executes (API call/state update)
5. UI updates if needed

---

### 6. Common mistake beginners make

* Forgetting to pass function (calling it directly ❌)
* Not using event object (`e`) properly
* Writing heavy logic inside event handler

---

### 7. 3 Active Recall Questions

1. What is an event handler?
2. Difference between `onClick={handle}` and `onClick={handle()}`?
3. How do events help in API calls?
