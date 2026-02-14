# 🧠 CONCEPT: **Functions**

---

## 1️⃣ WHY (Problem)

**Why do functions exist?**
To **avoid repetition** and **reuse logic**.

**What breaks without functions?**

* Same code written many times
* Harder bug fixing
* Poor readability and maintenance

---

## 2️⃣ WHAT (Responsibility)

**Single responsibility of a function:**
👉 Take input, execute logic, and produce output.

**What a function does:**

* Executes logic
* Processes or transforms data

**What a function does NOT do:**

* Does not permanently store data
* Does not own UI or database state

---

## 3️⃣ WHERE (Position in Flow)

**Where does a function appear in code flow?**

1. Functions are **defined first**
2. Functions are **called later** during execution

They are used in:

* Controllers
* Services
* Utilities
* Frontend and backend code

---

## 4️⃣ HOW (Input → Output)

**Input:**

* Parameters / arguments

**Output:**

* A `return` value
* Or `undefined` if nothing is returned

**Mental model:**

```
Input → Function → Output
```

---

## 5️⃣ FAIL (Mistakes & Debugging)

**Most common beginner mistake:**

* Forgetting to use `return`

**Typical symptom:**

* Getting `undefined` as output

**First place to debug:**

* Inside the function body
* Check the `return` statement

---

# ✅ ONE-LINE INTERVIEW ANSWER

> **A function is a reusable block of logic that takes input and returns output.**

---

## 🧠 FINAL SELF-CHECK

If you can explain this **without writing code**, the concept is clear:

> **A function is like a machine: it takes input, does work, and gives output.**

---

### What do you want next?

* **Arrow functions**
* **Return vs console.log**
* **Callback functions**
* **Async functions**

Just tell me the next concept 👌
