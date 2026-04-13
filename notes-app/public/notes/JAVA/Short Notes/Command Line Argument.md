
## ✅ 1. What is it?

A **Command Line Argument (CLA)** is a value passed to a program **when starting the program from the terminal/command prompt**.

In Java, these values come into the program through the **`main(String[] args)`** parameter.

---

## 🎯 2. Why is it used?

* To pass **input to a program when it starts**
* To configure programs **without changing code**
* Often used for **file names, user input, configuration values**

Example:

```
java MyProgram Rahul 25
```

---

## 📍 3. Where is it used?

In the **main method** of Java programs.

```java
public static void main(String[] args)
```

`args` array stores all arguments.

---

## 💻 4. Small code example

```java
public class Test {
    public static void main(String[] args) {

        System.out.println("First argument: " + args[0]);
        System.out.println("Second argument: " + args[1]);
    }
}
```

Run:

```
java Test Rahul 22
```

Output:

```
First argument: Rahul
Second argument: 22
```

---

## ⚙️ 5. Internal flow (step-by-step)

1. Program starts from `main()`
2. User passes values in terminal
3. JVM stores them in `args[]` array
4. `args[0]`, `args[1]` etc. access values
5. Program uses them as input

---

## ⚠️ 6. Common mistake beginners make

❌ Accessing `args[0]` when no argument is passed → **ArrayIndexOutOfBoundsException**

Example mistake:

```java
System.out.println(args[0]);
```

But user didn't pass any value.

---

## 🧠 7. Active recall questions

1. Where do command line arguments enter a Java program?
2. What datatype is `args` in `main(String[] args)`?
3. What happens if you access `args[1]` but only one argument is given?

---

