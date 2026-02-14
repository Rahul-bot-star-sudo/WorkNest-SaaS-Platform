
## 1️⃣ **WHY (Problem)**

### **Why do callbacks exist?**
To handle **asynchronous tasks** like API calls, timers, file reading.

#### **Without callbacks, what problem happens?**

* JavaScript would not know **when async work is finished**
* Code would try to use data **before it is ready**

👉 **Main idea:**

> “Call this function **after** the task is done”

---

## 2️⃣ **WHAT (Responsibility)**

### **What is the main job of a callback?**
A callback is a **function passed to another function** to be executed later.

#### **What it does:**

* Runs **after** an operation finishes
* Handles result or error

**What it does NOT do:**

* Does not control timing
* Does not make code clean automatically

---

## 3️⃣ **WHERE (Position / Flow)**

### **Where is it used?**

* Inside asynchronous functions
* As a function parameter

#### **Used in:**

* Timers (`setTimeout`)
* APIs
* Event handlers

👉 Flow:

> Start task → finish task → callback runs

---

## 4️⃣ **HOW (Input → Output)**

**Input:**

* A function (callback)

**How it works:**

* Main function does some work
* When work finishes → callback is called

**Output:**

* Result passed to callback
* Or error

```
Task → callback(result)
```

---

## 5️⃣ **FAIL (Common Mistakes)**

###**Common mistakes:**

* Too many nested callbacks
* No proper error handling

#### **Where to debug first:**

1. Is callback called?
2. Is error handled?
3. Are callbacks nested too deep?

---

## 6️⃣ **WHEN (When to Use)**

### **Use callbacks when:**

* Simple async tasks
* Event handling
* Legacy code

#### **Avoid callbacks when:**

* Logic becomes complex
* Many async steps are needed

---

## 7️⃣ **WHO (Who Handles It)**

* **Developer** writes callbacks
* **JavaScript runtime** decides when to run them

---

## 8️⃣ **SCOPE (Limitations)**

### **Limitations:**

* Hard to read when nested
* Error handling is messy
* Difficult to maintain

👉 This leads to **callback hell**

---

## 9️⃣ **ALTERNATIVE (Comparison)**

### **Alternatives:**

* Promises
* async / await

| Callbacks           | Promises / async |
| ------------------- | ---------------- |
| Nested code         | Clean code       |
| Hard error handling | try / catch      |
| Hard to debug       | Easy to debug    |

---

## 🔟 **REAL FAILURE (Real Problem Case)**

### **Problem:**
Multiple callbacks nested → unreadable code → bugs

#### **Fix:**

* Convert to Promises
* Use `async / await`

---

## 🧠 **Golden Check**

If you can say:

> “A callback is a function passed to another function,
> it runs after the task is done,
> too many callbacks cause callback hell”
