# Java Classes - Complete Guide

## 🏷️ What Are Classes?

A class is a **blueprint** or **template** for creating objects. It defines the properties (attributes) and behaviors (methods) that objects of that class will have.

Think of it like a blueprint for a house:
- The **blueprint** = Class
- The **actual house** built from the blueprint = Object

---

## 📋 Types of Classes in Java

Java provides several types of classes, each serving different purposes:

| Class Type | Purpose | Example |
|------------|---------|---------|
| **Concrete Class** | Regular class that can be instantiated | `class Car { }` |
| **Abstract Class** | Cannot be instantiated, meant to be inherited | `abstract class Vehicle { }` |
| **Final Class** | Cannot be extended/inherited | `final class Math { }` |
| **Static Class** | Nested class that doesn't need outer class instance | `static class Helper { }` |
| **Inner Class** | Class defined inside another class | `class Outer { class Inner { } }` |
| **Anonymous Class** | Class without a name, declared and instantiated simultaneously | `new Runnable() { }` |
| **POJO Class** | Plain Old Java Object - simple data container | `class User { }` |
| **Singleton Class** | Only one instance can exist | `class Database { }` |
| **Wrapper Class** | Converts primitives to objects | `Integer`, `Double`, `Boolean` |
| **Record Class** | Immutable data carriers (Java 14+) | `record Person(String name) { }` |
| **Sealed Class** | Restricts which classes can extend it (Java 17+) | `sealed class Animal permits Dog, Cat { }` |

---

## 🏛️ Real-World Analogy

Think of a car manufacturing plant:

```
Car Blueprint (Class)
    ├── Properties: color, model, engine
    ├── Behaviors: start(), stop(), accelerate()
    └── Used to create multiple cars

Cars Produced (Objects)
    ├── Car 1: Red Tesla
    ├── Car 2: Blue BMW
    └── Car 3: Black Audi
```

| Real World | Java World |
|------------|------------|
| Car Blueprint | Class |
| Actual Cars | Objects |
| Car Features | Attributes/Fields |
| Car Functions | Methods |

---

## ❌ What Problems Occur When Classes Don't Exist?

### 1. **No Code Reusability**
Without classes, you'd have to write the same code repeatedly.

❌ **Without Class:**
```java
// Have to write this for every car
String car1Color = "Red";
String car1Model = "Tesla";
void car1Start() { /* code */ }

String car2Color = "Blue";
String car2Model = "BMW";
void car2Start() { /* code */ }
// 100 more cars... disaster!
```

✅ **With Class:**
```java
class Car {
    String color;
    String model;
    void start() { /* code */ }
}
// Can create 100 cars easily!
```

### 2. **No Real-World Modeling**
Classes help model real-world entities. Without them, code doesn't reflect reality.

### 3. **No Encapsulation**
Cannot hide data or protect it from direct access.

### 4. **No Inheritance**
Cannot reuse code by extending existing functionality.

### 5. **No Polymorphism**
Cannot write code that works with multiple types.

### 6. **Procedural Spaghetti Code**
Code becomes a mess of functions without organization.

---

## 🎯 What Is the Main Job of a Class?

The main job of a class is to **serve as a blueprint for creating objects** and to **encapsulate data and methods** that operate on that data.

It helps:
- ✅ Model real-world entities
- ✅ Reuse code through inheritance
- ✅ Protect data through encapsulation
- ✅ Achieve polymorphism
- ✅ Organize code logically

---

## 📍 Where Does a Class Appear in the Code Flow?

### Position in File:
```java
package com.worknest.model;        // 1️⃣ Package (optional but recommended)

import java.util.List;              // 2️⃣ Imports (optional)

public class User {                  // 3️⃣ Class declaration
    // 4️⃣ Fields/Variables
    private String name;
    private int age;
    
    // 5️⃣ Constructors
    public User(String name) {
        this.name = name;
    }
    
    // 6️⃣ Methods
    public String getName() {
        return name;
    }
}
```

### Complete Flow:
```
1️⃣ package declaration
2️⃣ import statements
3️⃣ class declaration
4️⃣ field declarations
5️⃣ constructor definitions
6️⃣ method definitions
7️⃣ program execution (creating objects)
```

---

## 🔄 Class — HOW (Input → Output)

### 👉 **Input** (What does a class take?)

A class takes **nothing directly**. It's a template that defines:
- **Fields** (data/state)
- **Constructors** (how to create objects)
- **Methods** (behavior)

### 👉 **Process** (What does it do?)

1. **Define** the blueprint
2. **Encapsulate** data and behavior
3. **Create objects** from the blueprint

### 👉 **Output** (What does it produce?)

The output is:
- ✅ **Objects** (instances of the class)
- ✅ **Reusable code structure**
- ✅ **Organized program logic**

### Simple Visualization:
```
Input
↓
Class Definition (Fields + Methods)
↓
new ClassName()  // Object creation
↓
Output
Working Objects with Data & Behavior
```

---

## 🐛 Class — FAIL (Common Mistakes & Debugging)

### 👉 Most Common Mistakes

#### 1️⃣ **Missing Constructor**
❌ **Wrong:**
```java
class User {
    String name;
    int age;
    // No constructor - can't set initial values
}
```

✅ **Correct:**
```java
class User {
    String name;
    int age;
    
    User(String name, int age) {  // Constructor
        this.name = name;
        this.age = age;
    }
}
```

#### 2️⃣ **No Getter/Setter Methods**
❌ **Wrong:**
```java
class BankAccount {
    public double balance;  // Anyone can directly modify!
}
// account.balance = -1000; // No protection!
```

✅ **Correct:**
```java
class BankAccount {
    private double balance;  // Encapsulated
    
    public void deposit(double amount) {
        if(amount > 0) balance += amount;
    }
    
    public double getBalance() {
        return balance;
    }
}
```

#### 3️⃣ **Static Method Called Like Instance Method**
❌ **Wrong:**
```java
class MathUtils {
    public static int add(int a, int b) {
        return a + b;
    }
}

MathUtils utils = new MathUtils();
utils.add(5, 3);  // Works but wrong style!
```

✅ **Correct:**
```java
MathUtils.add(5, 3);  // Call static method on class
```

#### 4️⃣ **Forgetting `new` Keyword**
❌ **Wrong:**
```java
User user = User();  // Missing 'new' - compile error!
```

✅ **Correct:**
```java
User user = new User();  // Create object with 'new'
```

#### 5️⃣ **Class Name Mismatch with Filename**
❌ **Wrong:**
File: `UserService.java`
```java
class UserRepository {  // Name doesn't match file!
}
```
Compile error: class UserRepository is public, should be declared in UserRepository.java

#### 6️⃣ **Constructor Name Mismatch**
❌ **Wrong:**
```java
class User {
    User() { }  // OK
    
    void User() { }  // Not a constructor! This is a method
}
```

#### 7️⃣ **Recursive Constructor Call**
❌ **Wrong:**
```java
class User {
    User() {
        this();  // Calls itself - infinite recursion!
    }
}
```

#### 8️⃣ **Using Class Before Declaration**
❌ **Wrong:**
```java
myMethod();  // Can't use before declaration

void myMethod() {
    System.out.println("Hello");
}
```

---

### 👉 Where Should Debugging Start?

When there's a class problem, debug in this order:

#### 1️⃣ **Check Class Declaration Syntax**
```java
// Look for:
public class MyClass {  // Correct
class MyClass {         // Correct (package-private)
private class MyClass { // Wrong! Top-level can't be private
}
```

#### 2️⃣ **Verify File Name Matches Class Name**
- `UserController.java` must contain `class UserController`

#### 3️⃣ **Check Constructor Names**
- Must match class name exactly
- Must have no return type

#### 4️⃣ **Check Access Modifiers**
```java
public class User {           // Accessible everywhere
class User {                   // Only in same package
private class User {          // Wrong for top-level
}
```

#### 5️⃣ **Check Method Signatures**
- Return type correct?
- Parameters correct?
- Exception handling correct?

#### 6️⃣ **Look at IDE Warnings**
- Red underlines
- Yellow warnings
- Compilation errors

---

## 📝 Class Types - Detailed Examples

### 1️⃣ **Concrete Class** (Most Common)
```java
class Car {
    String brand;
    
    void drive() {
        System.out.println("Driving " + brand);
    }
}
// Can create objects
Car myCar = new Car();
```

### 2️⃣ **Abstract Class**
```java
abstract class Animal {
    abstract void makeSound();  // No implementation
    
    void sleep() {              // Regular method
        System.out.println("Sleeping...");
    }
}
// Cannot create: new Animal() - ERROR!
```

### 3️⃣ **Final Class**
```java
final class MathConstants {
    static final double PI = 3.14159;
}
// Cannot extend: class MyMath extends MathConstants - ERROR!
```

### 4️⃣ **Singleton Class**
```java
class DatabaseConnection {
    private static DatabaseConnection instance;
    
    private DatabaseConnection() { }  // Private constructor
    
    public static DatabaseConnection getInstance() {
        if(instance == null) {
            instance = new DatabaseConnection();
        }
        return instance;
    }
}
// Usage: DatabaseConnection.getInstance()
```

### 5️⃣ **POJO Class** (Plain Old Java Object)
```java
class Employee {
    private String name;
    private double salary;
    
    // Getters and setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
}
```

### 6️⃣ **Record Class** (Java 14+)
```java
record Person(String name, int age) { }
// Automatically creates constructor, getters, equals, hashCode
// Usage: Person p = new Person("John", 25);
```

### 7️⃣ **Inner Class**
```java
class Outer {
    private int x = 10;
    
    class Inner {
        void display() {
            System.out.println(x);  // Can access private members
        }
    }
}
// Usage: Outer.Inner inner = new Outer().new Inner();
```

### 8️⃣ **Static Nested Class**
```java
class Calculator {
    static class MathHelper {
        static int add(int a, int b) {
            return a + b;
        }
    }
}
// Usage: Calculator.MathHelper.add(5, 3);
```

### 9️⃣ **Anonymous Class**
```java
interface Greeting {
    void sayHello();
}

Greeting greeting = new Greeting() {
    @Override
    public void sayHello() {
        System.out.println("Hello!");
    }
};
```

### 🔟 **Sealed Class** (Java 17+)
```java
sealed class Shape permits Circle, Rectangle {
    // ...
}

final class Circle extends Shape { }
final class Rectangle extends Shape { }
// No other class can extend Shape
```

---

## 🎯 When to Use Which Class Type?

| Need | Class Type to Use |
|------|-------------------|
| Regular objects | Concrete Class |
| Template for others | Abstract Class |
| Prevent inheritance | Final Class |
| Single instance only | Singleton Class |
| Data container | POJO or Record |
| Group related classes | Inner/Static Class |
| One-time use | Anonymous Class |
| Control inheritance | Sealed Class |

---

## 📊 Class Components Summary

| Component | Purpose | Example |
|-----------|---------|---------|
| **Fields** | Store data | `private String name;` |
| **Constructors** | Initialize objects | `public User(String name) { }` |
| **Methods** | Define behavior | `public void walk() { }` |
| **Blocks** | Initialize | `static { }`, `{ }` |
| **Nested Classes** | Inner classes | `class Inner { }` |

---

## 🔍 Quick Debugging Checklist

When your class isn't working:

- [ ] Does the file name match the class name?
- [ ] Is the class declared with correct access modifier?
- [ ] Do constructors match class name?
- [ ] Are fields properly encapsulated (private)?
- [ ] Are getters/setters provided where needed?
- [ ] Is there a main method if it's the entry point?
- [ ] Are you creating objects with `new` keyword?
- [ ] Are you calling static methods on class, not instance?
- [ ] Check for missing imports
- [ ] Look for red underlines in IDE

---

## 🎓 Key Takeaways

1. **Classes are blueprints** for objects
2. **Choose the right class type** for your need
3. **Encapsulate data** (make fields private)
4. **Provide constructors** for proper initialization
5. **Match file name** with class name
6. **Use meaningful names** that reflect purpose
7. **Keep classes focused** (Single Responsibility)
8. **Let the IDE help** with syntax and errors