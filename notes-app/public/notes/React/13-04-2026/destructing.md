### 1. What is it?

Destructuring is a way to **extract values from object/array into variables**.
It makes code **short and clean**.

---

### 2. Why is it used?

* To **avoid repeated object access**
* To write **cleaner code**
* To easily use **API response data**

---

### 3. Where is it used in a Spring Boot project?

* In React when handling API response
* Example: extracting `token`, `user` from login response
* Used in props, state, and request data

---

### 4. Small code example

```javascript id="c3k9qv"
const user = {
  name: "Rahul",
  email: "rahul@gmail.com"
};

const { name, email } = user;

console.log(name);
```

Array destructuring:

```javascript id="w8n2xm"
const arr = [1, 2];
const [a, b] = arr;
```

---

### 5. Internal flow (step-by-step)

1. Object/array exists
2. Pattern on left side (`{}` or `[]`)
3. Values matched by key/index
4. Variables created
5. Ready to use

---

### 6. Common mistake beginners make

* Wrong key name → `undefined`
* Confusing `{}` vs `[]`
* Forgetting default values

---

### 7. 3 Active Recall Questions

1. What happens if key name doesn’t match?
2. Difference between object and array destructuring?
3. Why is destructuring useful in API responses?
