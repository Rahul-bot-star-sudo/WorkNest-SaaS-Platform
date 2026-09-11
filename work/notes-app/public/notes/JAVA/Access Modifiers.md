# Access Modifiers - Complete Guide

## 📦 What Are Access Modifiers?

**Access modifiers** are keywords in Java that define the **scope** or **visibility** of classes, methods, and variables. They determine which parts of your program can access a particular piece of code.

Think of access modifiers as **security clearance levels**:
- Different parts of your code have different clearance levels
- Some parts are public (anyone can access)
- Some are private (only the class itself can access)
- Some are in between (only specific packages or subclasses can access)

---

## 🏛️ Real-World Analogy

Imagine a **government building** with different security levels:

```
Government Building
 ├── Public Lobby (public)
 ├── Employee Only Areas (protected/package-private)
 ├── Classified Rooms (private)
 └── Different Departments (packages)
```

| Real World | Java World |
|------------|------------|
| Building | Class |
| Any citizen | Any class anywhere |
| Building employees | Classes in same package |
| Department heads | Subclasses (even in different packages) |
| Room owner only | The class itself |
| Security clearance | Access level |
| Department boundaries | Package boundaries |

Just as a building has different areas with different access levels, your Java code has different elements with different visibility!

---

## 📋 The Four Access Modifiers

Java provides four access modifiers, from most restrictive to least restrictive:

| Modifier | Class | Package | Subclass | World | Description |
|----------|-------|---------|----------|-------|-------------|
| **private** | ✓ | ✗ | ✗ | ✗ | Accessible only within the same class |
| **default** (no modifier) | ✓ | ✓ | ✗ | ✗ | Accessible only within the same package |
| **protected** | ✓ | ✓ | ✓ | ✗ | Accessible within package + subclasses (even outside package) |
| **public** | ✓ | ✓ | ✓ | ✓ | Accessible from anywhere |

### Visual Representation:
```
                    private    default    protected    public
Same class            ✅         ✅          ✅          ✅
Same package          ❌         ✅          ✅          ✅
Subclass (diff pkg)   ❌         ❌          ✅          ✅
Any class             ❌         ❌          ❌          ✅
```

---

## 🔍 Detailed Breakdown

### 1. **private** (Most Restrictive)

The **private** modifier makes members accessible only within the same class.

```java
public class BankAccount {
    private double balance;  // Only accessible in BankAccount
    private String accountNumber;
    
    public BankAccount(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }
    
    private void logTransaction(String type, double amount) {
        System.out.println(type + ": $" + amount + " - Balance: $" + balance);
    }
    
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            logTransaction("DEPOSIT", amount);  // Can call private method
        }
    }
    
    public double getBalance() {
        return balance;  // Can access private field
    }
}

// Another class
public class Bank {
    public void test() {
        BankAccount account = new BankAccount("12345", 1000);
        
        // ❌ ERROR: Cannot access private field
        // double bal = account.balance;
        
        // ❌ ERROR: Cannot call private method
        // account.logTransaction("TEST", 100);
        
        // ✅ OK: Public methods can access private members internally
        double bal = account.getBalance();
    }
}
```

### 2. **default** (Package-Private)

When no modifier is specified, it's accessible only within the **same package**.

```java
// File: com/bank/model/Transaction.java
package com.bank.model;

class Transaction {  // default class - only accessible in same package
    String reference;  // default field
    double amount;
    
    Transaction(String ref, double amt) {  // default constructor
        this.reference = ref;
        this.amount = amt;
    }
    
    void process() {  // default method
        System.out.println("Processing: " + reference);
    }
}

// File: com/bank/model/Account.java (SAME package)
package com.bank.model;

public class Account {
    public void test() {
        Transaction txn = new Transaction("REF123", 500);  // ✅ OK - same package
        txn.process();  // ✅ OK - same package
        System.out.println(txn.reference);  // ✅ OK - same package
    }
}

// File: com/bank/service/AccountService.java (DIFFERENT package)
package com.bank.service;

import com.bank.model.Transaction;

public class AccountService {
    public void test() {
        // ❌ ERROR: Transaction class is default, not accessible outside package
        // Transaction txn = new Transaction("REF123", 500);
    }
}
```

### 3. **protected**

The **protected** modifier allows access within the same package AND by subclasses (even in different packages).

```java
// File: com/bank/model/Account.java
package com.bank.model;

public class Account {
    protected String accountNumber;  // protected field
    protected double balance;
    
    protected void updateBalance(double amount) {  // protected method
        this.balance += amount;
    }
    
    protected Account(String accountNumber) {  // protected constructor
        this.accountNumber = accountNumber;
        this.balance = 0;
    }
}

// File: com/bank/model/SavingsAccount.java (SAME package)
package com.bank.model;

public class SavingsAccount {
    public void test() {
        Account acc = new Account("12345");  // ✅ OK - same package
        acc.updateBalance(1000);  // ✅ OK - same package
        System.out.println(acc.accountNumber);  // ✅ OK - same package
    }
}

// File: com/bank/special/PremiumAccount.java (DIFFERENT package)
package com.bank.special;

import com.bank.model.Account;

public class PremiumAccount extends Account {
    
    public PremiumAccount(String number) {
        super(number);  // ✅ OK - calling protected constructor
    }
    
    public void applyBonus() {
        // ✅ OK - subclass accessing protected members
        updateBalance(100);  // protected method
        System.out.println(accountNumber);  // protected field
    }
}

// File: com/bank/special/AccountManager.java (DIFFERENT package, NOT subclass)
package com.bank.special;

import com.bank.model.Account;

public class AccountManager {
    public void test() {
        Account acc = new Account("12345");  // ❌ ERROR: protected constructor
        
        // If we had an Account instance:
        Account acc2 = new PremiumAccount("67890");
        // acc2.updateBalance(100);  // ❌ ERROR: Not a subclass context
        // System.out.println(acc2.accountNumber);  // ❌ ERROR
    }
}
```

### 4. **public** (Least Restrictive)

The **public** modifier makes members accessible from anywhere.

```java
// File: com/bank/api/BankAPI.java
package com.bank.api;

public class BankAPI {
    public static final String VERSION = "1.0.0";  // Public constant
    
    public String getBankName() {  // Public method
        return "MyBank";
    }
    
    public BankAPI() {  // Public constructor
        // Can be called from anywhere
    }
}

// File: com/bank/client/Main.java (ANY package)
package com.bank.client;

import com.bank.api.BankAPI;

public class Main {
    public static void main(String[] args) {
        BankAPI api = new BankAPI();  // ✅ OK - public constructor
        String name = api.getBankName();  // ✅ OK - public method
        String version = BankAPI.VERSION;  // ✅ OK - public field
        System.out.println(name + " " + version);
    }
}

// File: com/other/company/SomeClass.java (Completely different project)
package com.other.company;

import com.bank.api.BankAPI;

public class SomeClass {
    public void useBankAPI() {
        BankAPI api = new BankAPI();  // ✅ Still accessible!
    }
}
```

---

## 🎯 What Is the Main Job of Access Modifiers?

The main job of access modifiers is to implement **encapsulation** - one of the four pillars of OOP:

1. **Data Hiding**: Protect sensitive data from unauthorized access
2. **Controlled Exposure**: Expose only what's necessary, hide implementation details
3. **Maintain Boundaries**: Define clear contracts between different parts of code
4. **Prevent Misuse**: Stop other classes from using internal parts incorrectly
5. **Enable Refactoring**: Change implementation without affecting external code

---

## 📍 Where Do Access Modifiers Appear?

Access modifiers can be applied to:

### 1. **Top-Level Classes**
```java
public class PublicClass { }           // Accessible anywhere
class DefaultClass { }                  // Only in same package
// private class PrivateClass { }       // ❌ NOT allowed for top-level
// protected class ProtectedClass { }   // ❌ NOT allowed for top-level
```

### 2. **Fields (Variables)**
```java
public class Example {
    public int publicVar;           // Anywhere
    protected int protectedVar;      // Package + subclasses
    int defaultVar;                  // Package only
    private int privateVar;          // This class only
}
```

### 3. **Methods**
```java
public class Example {
    public void publicMethod() { }      // Anywhere
    protected void protectedMethod() { } // Package + subclasses
    void defaultMethod() { }             // Package only
    private void privateMethod() { }     // This class only
}
```

### 4. **Constructors**
```java
public class Example {
    public Example() { }                // Anywhere can create
    protected Example(int x) { }        // Package + subclasses
    Example(String s) { }               // Package only
    private Example(double d) { }       // Only this class (singleton pattern!)
}
```

### 5. **Inner Classes**
```java
public class Outer {
    public class PublicInner { }        // Anywhere (with Outer instance)
    protected class ProtectedInner { }   // Package + subclasses
    class DefaultInner { }               // Package only
    private class PrivateInner { }       // Only Outer class
}
```

### 6. **Interfaces**
```java
public interface PublicInterface { }     // Anywhere
interface DefaultInterface { }            // Package only
// Note: Interface methods are implicitly public
```

---

## 🔄 Access Modifiers — HOW (Input → Process → Output)

### 👉 **Input** (What do access modifiers take?)

1. **The code element** (class, method, field, constructor)
2. **The modifier keyword** (public, protected, private, or none)
3. **The context** (where the access is attempted)

### 👉 **Process** (What do they do?)

1. **Compile-time checking**: The compiler checks access rules
2. **Access control**: Determines if access should be allowed
3. **Encapsulation enforcement**: Prevents unauthorized access

### 👉 **Output** (What do they produce?)

1. **Compilation success/failure**: Access allowed or denied
2. **Encapsulated code**: Hidden implementation details
3. **Clear API contracts**: Documented public interfaces

### Simple Visualization:
```
Input
↓
Code Element + Access Modifier + Access Attempt
↓
Compiler Checks Access Rules
    ├── Same class? → Allow private
    ├── Same package? → Allow default/protected
    ├── Subclass? → Allow protected
    └── Else → Allow only public
↓
Output
Compilation Success or Access Denied Error
```

---

## 📝 Complete Examples

### 1. **Banking System Example**

```java
package com.bank.core;

public class BankAccount {
    // private: Only this class can access
    private String accountNumber;
    private double balance;
    private String pin;
    private List<Transaction> transactionHistory;
    
    // protected: Available to subclasses
    protected double interestRate;
    protected Date lastTransactionDate;
    
    // default: Available within package
    BankAccount() {
        this.transactionHistory = new ArrayList<>();
    }
    
    // public: Available to everyone
    public BankAccount(String accountNumber, String pin) {
        this();
        this.accountNumber = accountNumber;
        this.pin = pin;
        this.balance = 0;
    }
    
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            addTransaction("DEPOSIT", amount);
        }
    }
    
    public boolean withdraw(double amount, String enteredPin) {
        if (validatePin(enteredPin) && balance >= amount) {
            balance -= amount;
            addTransaction("WITHDRAWAL", amount);
            return true;
        }
        return false;
    }
    
    public double getBalance(String enteredPin) {
        return validatePin(enteredPin) ? balance : -1;
    }
    
    // private: Internal helper methods
    private boolean validatePin(String enteredPin) {
        return this.pin.equals(enteredPin);
    }
    
    private void addTransaction(String type, double amount) {
        Transaction t = new Transaction(type, amount, new Date());
        transactionHistory.add(t);
    }
    
    // protected: Subclasses can apply interest
    protected void applyInterest() {
        balance += balance * interestRate;
        lastTransactionDate = new Date();
    }
}

// File: com/bank/core/SavingsAccount.java (Same package)
package com.bank.core;

public class SavingsAccount extends BankAccount {
    
    public SavingsAccount(String accountNumber, String pin) {
        super(accountNumber, pin);
        this.interestRate = 0.05;  // ✅ Accessing protected field
    }
    
    public void monthlyMaintenance() {
        applyInterest();  // ✅ Accessing protected method
        lastTransactionDate = new Date();  // ✅ Accessing protected field
    }
}

// File: com/bank/core/BankUtils.java (Same package)
package com.bank.core;

public class BankUtils {
    public void processAccount(BankAccount account) {
        // account.balance = 1000;  // ❌ private - not accessible
        // account.validatePin("1234");  // ❌ private - not accessible
        
        account.deposit(100);  // ✅ public - accessible
        account.interestRate = 0.03;  // ✅ protected - same package
        account.lastTransactionDate = new Date();  // ✅ protected - same package
        
        BankAccount defaultConst = new BankAccount();  // ✅ default constructor
    }
}

// File: com/bank/special/PrivilegedAccount.java (Different package)
package com.bank.special;

import com.bank.core.BankAccount;

public class PrivilegedAccount extends BankAccount {
    
    public PrivilegedAccount(String number, String pin) {
        super(number, pin);  // ✅ public constructor
        this.interestRate = 0.07;  // ✅ protected - accessible in subclass
        // this.balance = 1000;  // ❌ private - not accessible
        // this.pin = "1234";  // ❌ private - not accessible
    }
    
    public void specialPrivilege() {
        applyInterest();  // ✅ protected - accessible in subclass
        lastTransactionDate = new Date();  // ✅ protected - accessible
    }
}

// File: com/bank/special/ExternalTester.java (Different package, not subclass)
package com.bank.special;

import com.bank.core.BankAccount;

public class ExternalTester {
    public void test() {
        BankAccount account = new BankAccount("12345", "0000");  // ✅ public
        
        account.deposit(100);  // ✅ public
        
        // account.interestRate = 0.05;  // ❌ protected - different package
        // account.lastTransactionDate = new Date();  // ❌ protected
        // account.applyInterest();  // ❌ protected
        
        // BankAccount defaultConst = new BankAccount();  // ❌ default constructor
    }
}
```

### 2. **Singleton Pattern with Private Constructor**

```java
public class DatabaseConnection {
    private static DatabaseConnection instance;
    private String connectionUrl;
    
    // Private constructor - prevents instantiation from outside
    private DatabaseConnection() {
        this.connectionUrl = "jdbc:mysql://localhost:3306/mydb";
        System.out.println("Database connection created");
    }
    
    // Public method to get the single instance
    public static DatabaseConnection getInstance() {
        if (instance == null) {
            instance = new DatabaseConnection();  // Can call private constructor
        }
        return instance;
    }
    
    public void query(String sql) {
        System.out.println("Executing: " + sql);
    }
}

// Usage
public class App {
    public static void main(String[] args) {
        // DatabaseConnection conn = new DatabaseConnection();  // ❌ ERROR
        
        DatabaseConnection conn1 = DatabaseConnection.getInstance();
        DatabaseConnection conn2 = DatabaseConnection.getInstance();
        
        System.out.println(conn1 == conn2);  // true - same instance
    }
}
```

### 3. **Factory Pattern with Protected Constructor**

```java
package com.vehicle.factory;

public abstract class Vehicle {
    protected String licensePlate;
    protected String model;
    
    // Protected constructor - only subclasses and same package can create
    protected Vehicle(String licensePlate, String model) {
        this.licensePlate = licensePlate;
        this.model = model;
    }
    
    public abstract void start();
    public abstract void stop();
    
    public String getLicensePlate() {
        return licensePlate;
    }
}

// Same package - can use protected constructor
class Car extends Vehicle {
    Car(String licensePlate, String model) {
        super(licensePlate, model);  // ✅ OK - same package
    }
    
    @Override
    public void start() {
        System.out.println("Car " + licensePlate + " starting");
    }
    
    @Override
    public void stop() {
        System.out.println("Car stopping");
    }
}

// Different package
package com.vehicle.dealer;

import com.vehicle.factory.Vehicle;

public class CarDealer {
    public Vehicle createCar() {
        // return new Vehicle("ABC123", "Sedan");  // ❌ ERROR - protected constructor
        return null;
    }
}
```

### 4. **API Design with Public Interface, Package Implementation**

```java
// Public interface - exposed to clients
package com.mylib.api;

public interface Calculator {
    int add(int a, int b);
    int subtract(int a, int b);
}

// Package-private implementation - hidden from clients
package com.mylib.internal;

import com.mylib.api.Calculator;

class BasicCalculator implements Calculator {  // default access
    @Override
    public int add(int a, int b) {
        return a + b;
    }
    
    @Override
    public int subtract(int a, int b) {
        return a - b;
    }
    
    // Internal helper - not exposed
    void validateInputs(int a, int b) {
        // validation logic
    }
}

// Public factory - creates calculator instances
package com.mylib.api;

import com.mylib.internal.BasicCalculator;

public class CalculatorFactory {
    public static Calculator createCalculator() {
        return new BasicCalculator();  // ✅ OK - same package
    }
}

// Client code - can only see what we expose
package com.client.app;

import com.mylib.api.Calculator;
import com.mylib.api.CalculatorFactory;

public class Client {
    public static void main(String[] args) {
        Calculator calc = CalculatorFactory.createCalculator();
        System.out.println(calc.add(5, 3));  // ✅ OK
        
        // BasicCalculator basic = new BasicCalculator();  // ❌ ERROR - not visible
        // calc.validateInputs(5, 3);  // ❌ ERROR - not in interface
    }
}
```

### 5. **Access Modifiers with Inheritance**

```java
public class Parent {
    public String publicVar = "public";
    protected String protectedVar = "protected";
    String defaultVar = "default";
    private String privateVar = "private";
    
    public void publicMethod() {
        System.out.println("Public method");
        System.out.println(privateVar);  // ✅ Can access private within class
    }
    
    protected void protectedMethod() {
        System.out.println("Protected method");
    }
    
    void defaultMethod() {
        System.out.println("Default method");
    }
    
    private void privateMethod() {
        System.out.println("Private method");
    }
}

public class Child extends Parent {
    
    public void demonstrateAccess() {
        System.out.println(publicVar);     // ✅ public - always accessible
        System.out.println(protectedVar);  // ✅ protected - accessible in subclass
        System.out.println(defaultVar);    // ✅ default - same package (if in same package)
        // System.out.println(privateVar); // ❌ private - not accessible
        
        publicMethod();     // ✅
        protectedMethod();  // ✅
        defaultMethod();    // ✅ (if same package)
        // privateMethod(); // ❌
    }
    
    // Overriding methods - can't reduce visibility!
    @Override
    public void publicMethod() { }  // ✅ OK - same visibility
    
    @Override
    protected void protectedMethod() { }  // ✅ OK - same visibility
    
    // @Override
    // private void publicMethod() { }  // ❌ Can't reduce visibility!
    
    // Can increase visibility
    @Override
    public void defaultMethod() { }  // ✅ OK - default → public (increased)
}
```

---

## 🐛 Common Mistakes & Debugging

### 👉 Most Common Mistakes

#### 1️⃣ **Trying to Access Private Members**
❌ **Wrong:**
```java
public class A {
    private int secret = 42;
}

public class B {
    public void test() {
        A a = new A();
        System.out.println(a.secret);  // ❌ COMPILE ERROR!
    }
}
```

✅ **Correct:**
```java
public class A {
    private int secret = 42;
    
    public int getSecret() {  // Provide public getter
        return secret;
    }
}

public class B {
    public void test() {
        A a = new A();
        System.out.println(a.getSecret());  // ✅
    }
}
```

#### 2️⃣ **Reducing Visibility When Overriding**
❌ **Wrong:**
```java
class Parent {
    public void method() { }
}

class Child extends Parent {
    @Override
    private void method() { }  // ❌ Can't reduce visibility!
}
```

✅ **Correct:**
```java
class Child extends Parent {
    @Override
    public void method() { }  // ✅ Same or wider visibility
    
    // Can increase visibility:
    // protected → public (ok)
    // default → protected/public (ok)
}
```

#### 3️⃣ **Using Private for Top-Level Classes**
❌ **Wrong:**
```java
private class MyClass {  // ❌ Top-level class can't be private
    // ...
}
```

✅ **Correct:**
```java
class MyClass { }  // default (package-private) or public
```

#### 4️⃣ **Confusing Protected with Package-Private**
Many developers think protected means "package + subclasses" but forget it also includes subclasses in other packages.

#### 5️⃣ **Forgetting Default Access**
```java
package com.a;
class Helper { }  // default access

package com.b;
import com.a.Helper;  // ❌ ERROR - Helper not visible!
```

#### 6️⃣ **Over-Exposing Internal Fields**
❌ **Wrong:**
```java
public class User {
    public String password;  // Anyone can see/modify!
    public int age;          // No validation possible
}
```

✅ **Correct:**
```java
public class User {
    private String password;
    private int age;
    
    public void setAge(int age) {
        if (age > 0 && age < 150) {
            this.age = age;
        }
    }
}
```

#### 7️⃣ **Making Everything Public**
❌ **Wrong:**
```java
public class Calculator {
    public int add(int a, int b) { return a + b; }
    public int subtract(int a, int b) { return a - b; }
    public void validateNumbers(int a, int b) { }  // Should be private!
}
```

✅ **Correct:**
```java
public class Calculator {
    public int add(int a, int b) { 
        validateNumbers(a, b);
        return a + b; 
    }
    
    private void validateNumbers(int a, int b) { }  // Internal helper
}
```

#### 8️⃣ **Protected Constructor Misconception**
```java
public class Parent {
    protected Parent() { }  // Can be called by subclasses
}

public class Child extends Parent {
    public Child() {
        super();  // ✅ OK
    }
}

// But:
public class Other {
    public void test() {
        new Parent();  // ❌ ERROR if in different package
    }
}
```

---

### 👉 Where Should Debugging Start?

When you get access modifier errors:

#### 1️⃣ **Check the Error Message**
```
Error: secret has private access in A
Error: cannot find symbol (for default access)
Error: method() in Child cannot override method() in Parent (attempting to assign weaker access)
```

#### 2️⃣ **Identify the Access Level**
- Is the member `private`? → Only same class
- Is it `default`? → Only same package
- Is it `protected`? → Same package OR subclass
- Is it `public`? → Should be accessible

#### 3️⃣ **Check Package Declarations**
```java
// Are they in the same package?
package com.example.a;  // vs
package com.example.b;  // Different!
```

#### 4️⃣ **Check Inheritance Relationship**
```java
public class A { }
public class B extends A { }  // B is subclass of A
public class C { }            // C is not subclass
```

#### 5️⃣ **Check Import Statements**
```java
// Do you need to import?
import com.example.a.MyClass;
```

#### 6️⃣ **Use IDE Hints**
Most IDEs will:
- Show errors with red underlines
- Provide quick fixes
- Show access level in tooltips

---

## 📊 Access Modifiers Comparison

| Aspect | private | default | protected | public |
|--------|---------|---------|-----------|---------|
| **Same class** | ✅ | ✅ | ✅ | ✅ |
| **Same package class** | ❌ | ✅ | ✅ | ✅ |
| **Different package subclass** | ❌ | ❌ | ✅ | ✅ |
| **Different package non-subclass** | ❌ | ❌ | ❌ | ✅ |
| **Used for encapsulation** | High | Medium | Medium | Low |
| **API exposure** | None | Package-internal | Limited | Full |
| **Inheritance behavior** | Not inherited | Inherited | Inherited | Inherited |
| **Override restriction** | N/A | Can increase | Can increase | Same only |

---

## 🎯 Best Practices

### 1. **Principle of Least Privilege**
Always use the most restrictive access level possible:
- Start with `private`
- Move to `default` if needed within package
- Use `protected` only for inheritance
- Make `public` only what's necessary

### 2. **Encapsulation Rules**
```java
public class GoodDesign {
    // Fields: ALWAYS private
    private String name;
    private int age;
    
    // Constructors: public or package-private
    public GoodDesign(String name) {
        this.name = name;
    }
    
    // Getters: public when needed
    public String getName() {
        return name;
    }
    
    // Setters: public with validation
    public void setAge(int age) {
        if (age > 0) {
            this.age = age;
        }
    }
    
    // Internal helpers: private
    private void validate() {
        // validation logic
    }
}
```

### 3. **API Design Guidelines**
- **public**: Stable, documented, supported
- **protected**: For extension points
- **default**: Package-internal implementation
- **private**: Implementation details

### 4. **Testing Considerations**
```java
// Sometimes need package-private for unit tests
public class Calculator {
    private int result;
    
    // Package-private for testing
    int getResultForTesting() {
        return result;
    }
}
```

### 5. **Constants**
```java
public class Constants {
    // Constants can be public
    public static final double PI = 3.14159;
    public static final int MAX_USERS = 100;
    
    // But internal constants can be private
    private static final int INTERNAL_BUFFER_SIZE = 1024;
}
```

---

## 📝 Quick Reference Card

### Access Modifier Cheat Sheet

```java
// Top-level classes: only public or default
public class PublicClass { }
class DefaultClass { }           // package-private

// Members: all four modifiers
public class Demo {
    // Fields
    public int a;
    protected int b;
    int c;                        // default
    private int d;
    
    // Constructors
    public Demo() { }
    protected Demo(int x) { }
    Demo(String s) { }            // default
    private Demo(double d) { }
    
    // Methods
    public void m1() { }
    protected void m2() { }
    void m3() { }                  // default
    private void m4() { }
}
```

### Access Rules Summary

| Access Level | Class | Package | Subclass (same pkg) | Subclass (diff pkg) | World |
|--------------|-------|---------|---------------------|---------------------|-------|
| private | ✓ | | | | |
| default | ✓ | ✓ | ✓ | | |
| protected | ✓ | ✓ | ✓ | ✓ | |
| public | ✓ | ✓ | ✓ | ✓ | ✓ |

### Common Patterns

```
Getter/Setter Pattern:
    private field + public getter/setter

Factory Pattern:
    private constructor + public static factory method

Template Pattern:
    public template method + protected abstract methods

Helper Classes:
    private constructor (utility classes)

API Design:
    public interfaces + package-private implementations
```

---

## 🎓 Key Takeaways

1. **Access modifiers control visibility** - they're the foundation of encapsulation .

2. **Four levels from most to least restrictive**: private → default → protected → public .

3. **private is for class internals** - only the class itself can access .

4. **default (package-private) is for package internals** - perfect for implementation details .

5. **protected is for inheritance hierarchies** - accessible to subclasses even in different packages .

6. **public is your API contract** - use sparingly and document well .

7. **Encapsulation is key** - hide implementation details, expose only what's necessary .

8. **Principle of Least Privilege** - start with private, open up only as needed .

9. **Override rules** - can't reduce visibility when overriding methods .

10. **Package structure matters** - default and protected access depend on package organization .

11. **Testing may need wider access** - sometimes package-private is useful for unit tests .

12. **Constants can be public** - final fields are safe to expose .

---

## 🎯 Summary

Access modifiers are your **security system** in Java:

- 🔒 **private**: Your personal diary (only you can read)
- 📁 **default**: Office documents (only your department can see)
- 👨‍👦 **protected**: Family heirlooms (your family, even distant relatives)
- 🌍 **public**: Public library books (anyone can access)

Remember: **Hide what changes, expose what's stable!**