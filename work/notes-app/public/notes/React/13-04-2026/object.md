### 1. What is it?

An object is a **collection of key–value pairs**.
It stores **related data + behavior** in one place.

---

### 2. Why is it used?

* To **group related data**
* To represent **real-world entities** (user, product)
* To send/receive **JSON in APIs**

---

### 3. Where is it used in a Spring Boot project?

* React: store API data (`user`, `token`)
* Send object in request body to backend
* Spring Boot receives it as **DTO / Entity**

---

### 4. Small code example

```javascript id="9f2lqp"
const user = {
  name: "Rahul",
  email: "rahul@gmail.com"
};

console.log(user.name);
```

---

### 5. Internal flow (step-by-step)

1. Object is created
2. Keys are defined
3. Values assigned
4. Access using `.` or `[]`
5. Can send as JSON to backend

---

### 6. Common mistake beginners make

* Confusing object with array
* Accessing wrong key (`user.Name` ❌)
* Mutating object without understanding

---

### 7. 3 Active Recall Questions

1. What is the difference between object and array?
2. How do you access object values?
3. How is object used in API request body?
