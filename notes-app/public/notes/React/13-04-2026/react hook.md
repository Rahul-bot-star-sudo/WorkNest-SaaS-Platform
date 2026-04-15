
# 🔹 Concept: React Hook

## 1. What is it?

React Hook is a **special function** in React that lets you use features like **state and lifecycle inside function components**.

---

## 2. Why do we use it?

We use hooks to:

* store data (state)
* handle side effects (API calls, etc.)

👉 Without hooks, function components were very limited.

---

## 3. Where is it used (Spring Boot project)?

In a full project:

* **React (Frontend):**

  * use hooks to manage UI state
  * call backend APIs

* **Spring Boot (Backend):**

  * provides APIs (login, data, etc.)

👉 Hooks are used when:

* calling Spring Boot APIs (`useEffect`)
* storing response data (`useState`)

---

## 4. Example

```javascript
import { useState, useEffect } from "react";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div>
      {users.map(u => <p key={u.id}>{u.name}</p>)}
    </div>
  );
}
```

---

## 5. How does it work?

Step-by-step:

1. `useState([])`
   → creates a variable `users`

2. `useEffect(...)`
   → runs code when component loads

3. API call happens
   → calls Spring Boot backend

4. Data comes back
   → `setUsers(data)` updates state

5. UI updates automatically
   → shows user list

---

## 6. Common mistakes

❌ Forgetting dependency array
→ `useEffect` runs again and again

❌ Updating state wrongly
→ not using `setState` function

---

## 7. Practice questions

1. What does `useState` store?
2. Why do we use `useEffect` for API calls?
3. What happens if dependency array is missing?
