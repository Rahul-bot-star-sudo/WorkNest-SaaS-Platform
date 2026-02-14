# 🧠 SaaS Platform – System Design (30 LPA Level)

Assume:
👉 A **multi-tenant SaaS platform** like *WorkNest / Notion / CRM / Project Management tool*.

---

## 1️⃣ REQUIREMENTS (WHAT)

### Functional

* User signup & login
* Organization (company/workspace) creation
* Role-based access (Admin, Member)
* Core feature (e.g., projects, tasks, analytics)
* Billing & subscription
* Notifications

### Non-Functional (THIS DECIDES YOUR PACKAGE)

* Handle **1M+ users**
* **Multi-tenant isolation**
* **99.9% uptime**
* **Secure user data**
* Low latency (<200ms API)
* GDPR / data compliance

👉 Interviewers care more about **non-functional requirements**.

---

## 2️⃣ ACTORS (WHO)

* **End Users** (Employees, Managers)
* **Org Admin**
* **System Admin**
* **Third-party services**

  * Payment gateway
  * Email / SMS
* **Malicious Actors** (bots, attackers)

👉 Security & access control start here.

---

## 3️⃣ DATA (WHAT IS STORED)

### Core Entities

* User
* Organization (Tenant)
* Membership (user ↔ org mapping)
* Subscription
* Domain Data (projects, tasks, etc.)

### Key Senior Concepts

* **Tenant Isolation**

  * Option A: Shared DB with `tenant_id`
  * Option B: DB per tenant (expensive but secure)
* **Data Sensitivity**

  * PII (email, name)
  * Billing data
* **Access Patterns**

  * Read-heavy dashboards
  * Write-heavy activity logs

👉 30 LPA candidates always discuss **multi-tenancy + data ownership**.

---

## 4️⃣ FLOW (HOW SYSTEM WORKS)

### Example: User Login

```
Client → API Gateway → Auth Service → Token Issued → Client
```

### Example: Accessing Org Data

```
Client → API Gateway → Project Service
        → Validate Token
        → Validate Membership (tenant_id)
        → Fetch Data → Response
```

### Failure Handling

* Auth service down → deny access
* DB timeout → retry + fallback
* Payment failure → downgrade plan

👉 Seniors always explain **failure scenarios**.

---

## 5️⃣ CONSTRAINTS (REAL-WORLD LIMITS)

* Budget: cannot use DB-per-tenant initially
* Team: small → fewer microservices
* Compliance: GDPR → data deletion, audit logs
* Tech stack: Node + Mongo / PostgreSQL

👉 Architecture is **always shaped by constraints**.

---

## 6️⃣ QUALITY ATTRIBUTES (HOW GOOD IT MUST BE)

| Attribute       | How You Achieve It                       |
| --------------- | ---------------------------------------- |
| Scalability     | Stateless services, horizontal scaling   |
| Security        | JWT, RBAC, encryption, tenant isolation  |
| Reliability     | Health checks, retries, circuit breakers |
| Performance     | Caching (Redis), DB indexes              |
| Maintainability | Modular services                         |
| Observability   | Logging, metrics, tracing                |

👉 This is where **senior engineering decisions** are evaluated.

---

# 🏗 HLD – SaaS ARCHITECTURE

```
                  ┌─────────────┐
                  │   Clients   │
                  │ Web / App   │
                  └──────┬──────┘
                         │ HTTPS
                  ┌──────▼──────┐
                  │ API Gateway │
                  │ Auth, Rate  │
                  │ Limit, RBAC │
                  └──────┬──────┘
        ┌────────────────┼───────────────────┐
        │                │                   │
 ┌──────▼──────┐  ┌──────▼──────┐   ┌────────▼────────┐
 │ Auth Service│  │ User Service│   │ Core SaaS       │
 │ Login, JWT  │  │ Orgs, Roles │   │ Feature Service │
 └──────┬──────┘  └──────┬──────┘   └────────┬────────┘
        │                │                   │
   ┌────▼────┐      ┌────▼────┐        ┌─────▼─────┐
   │ Auth DB │      │ User DB │        │ Domain DB │
   └─────────┘      └─────────┘        └───────────┘

             ┌─────────────────────────────┐
             │ Billing / Notification Svc │
             └─────────────────────────────┘
```

### HLD Highlights (What Interviewers Look For)

* **API Gateway**: auth, rate limiting
* **Service separation**: auth ≠ business logic
* **Tenant-aware services**
* **Independent scaling**
* **External integrations isolated**

---

# 🧱 LLD – LOW LEVEL DESIGN

### Example: Auth Module

**Entities**

```
User(id, email, password_hash)
Organization(id, name)
Membership(user_id, org_id, role)
```

**APIs**

```
POST /auth/register
POST /auth/login
GET  /users/me
POST /orgs
```

**Access Rule**

```
If token.user_id belongs to org_id → allow
Else → deny
```

### Example: Core Feature (Projects)

```
Project(id, org_id, name, owner_id)
Task(id, project_id, assigned_to)
```

👉 Every query filters by `org_id` → tenant isolation.

---

# 🔐 SECURITY DESIGN (30 LPA MUST)

* JWT for auth
* RBAC for authorization
* Password hashing (bcrypt/argon2)
* Encrypted fields (billing)
* Input validation
* Rate limiting
* Audit logs

👉 Always explain: **“How do you stop one tenant from seeing another tenant’s data?”**

---

# 📈 SCALABILITY DESIGN

* Stateless APIs → horizontal scaling
* Redis for session/token cache
* Read replicas for dashboards
* Async jobs for:

  * Emails
  * Reports
* Sharding by `org_id` at scale

---

# 💡 WHAT MAKES THIS “30 LPA LEVEL”

You are not just saying:

> “We use microservices.”

You are saying:
✔ Why this architecture
✔ How it scales
✔ How it fails safely
✔ How data is isolated
✔ How security is enforced
✔ What trade-offs exist

---

# 🏆 FINAL ANSWER TO YOUR QUESTION

**Is your CORE framework enough for 30 LPA?**

### ✅ YES — if you can:

* Break SaaS into **Requirements, Actors, Data, Flow, Constraints, Quality**
* Convert it into **HLD**
* Defend your **architecture choices**
* Explain **security, scalability, and failure handling**

### ❌ NO — if you only memorize the structure.

---
