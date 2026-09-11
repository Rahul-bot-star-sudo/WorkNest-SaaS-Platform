Here are your **final short notes** for **Injection (Dependency Injection)** using your 5-question template.

---

## Concept: Dependency Injection (DI)

### 1️⃣ WHY
Object ko apni dependencies **khud banane** nahi deta — koi aur (Spring Container) **dekar** jata hai.  
Bina DI ke: class ke andar `new` dependency create karna padta → tight coupling, testing mushkil.

### 2️⃣ WHAT
Sirf ek kaam: **dependencies ko bahar se pass karna** constructor ya method ke through.  
Ye decide nahi karta kaun si dependency do — sirf receive karta hai.

### 3️⃣ WHERE
Spring Boot me **constructor parameters** me — jab bean create hota hai, Spring automatically dependencies inject karta hai.

### 4️⃣ HOW
**Input:** Dependency object (Spring Container deta hai)  
**Output:** Fully initialized object with all dependencies set

### 5️⃣ FAIL
`@Autowired` field injection use karna → NullPointerException in tests.  
Debug: check karo constructor parameter null hai → matlab Spring ne bean register nahi kiya.

---

## 3 Active Recall Questions

| # | Question | Answer |
|---|----------|--------|
| 1 | DI ka opposite kya hai? | new keyword se dependency khud banana (tight coupling) |
| 2 | Spring me constructor injection ke liye kya annotation chahiye? | Koi nahi — Spring automatically detect kar leta hai |
| 3 | Field injection (`@Autowired`) kyu avoid karna chahiye? | Testing mushkil hoti hai, null pointer aata hai |