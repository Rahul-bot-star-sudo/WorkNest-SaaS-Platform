### 1. What is it?

React Hook is a **function that lets you use state and lifecycle features** inside functional components.
Example: `useState`, `useEffect`.

---

### 2. Why is it used?

* To **manage data (state)** in UI
* To **handle side effects** (API calls, timers, etc.)
* Makes code **cleaner than class components**

---

### 3. Where is it used in a Spring Boot project?

* Used in **React frontend** (not backend)
* Calls Spring Boot APIs using hooks (mostly `useEffect`)
* Example: Fetch data from `/api/users`

---

### 4. Small code example

```javascript
import { useState, useEffect } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return <div>{users.length}</div>;
}
```

---

### 5. Internal flow (step-by-step)

1. Component renders
2. `useState` creates state variable
3. `useEffect` runs after render
4. API call goes to Spring Boot
5. Response comes back
6. `setUsers()` updates state
7. Component re-renders with new data

---

### 6. Common mistake beginners make

* Missing dependency array → infinite API calls
* Updating state incorrectly
* Calling hooks inside loops/conditions (wrong ❌)

---

### 7. 3 Active Recall Questions

1. Why do we use `useEffect` for API calls instead of normal function calls?
2. What happens if dependency array is missing in `useEffect`?
3. How does React know when to re-render after `setState`?
