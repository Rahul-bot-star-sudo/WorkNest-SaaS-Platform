Here are your **very short, beginner-friendly notes** on **Multithreading** 👇

---

### 1. What is it?

**Multithreading** means running **multiple tasks (threads) at the same time** inside one program.
Each thread works **independently but shares same memory**.

---

### 2. Why is it used?

* To improve **performance (faster execution)**
* To handle **multiple users/requests** at same time
* To make apps **responsive (non-blocking)**

---

### 3. Where is it used in a Spring Boot project?

* Handling **multiple API requests (each request = separate thread)**
* Background tasks using `@Async`
* Processing tasks like **email sending, logging, file upload**

---

### 4. Small code example

```java id="6v7y2a"
class MyThread extends Thread {
    public void run() {
        System.out.println("Thread running...");
    }
}

public class Main {
    public static void main(String[] args) {
        MyThread t1 = new MyThread();
        t1.start(); // start new thread
    }
}
```

Better way (Runnable):

```java id="8k3mqp"
Runnable task = () -> {
    System.out.println("Running in thread");
};

new Thread(task).start();
```

Spring Boot:

```java id="f1s8xp"
@Async
public void sendEmail() {
    // runs in separate thread
}
```

---

### 5. Internal flow (step-by-step)

1. Main program starts (main thread)
2. You create a new thread
3. Call `start()` → JVM creates new thread
4. `run()` method executes in parallel
5. Multiple threads run simultaneously

---

### 6. Common mistakes beginners make

* ❌ Calling `run()` instead of `start()`
* ❌ Not handling shared data → causes **race condition**
* ❌ Ignoring synchronization issues
* ❌ Creating too many threads (performance issue)

---

### 7. Active recall questions 🧠

1. What is the difference between `start()` and `run()`?
2. What is a race condition?
3. How does Spring Boot handle multiple requests using threads?

---

If you want, next I can explain **Thread Lifecycle + Synchronization (very important for interviews)** 🚀
