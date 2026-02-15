# 📊 Professional RBAC ERD Diagram

I'll create a clean, professional ERD that you can use in interviews and documentation.

```
┌─────────────────────────┐     ┌─────────────────────────┐
│         users           │     │       user_roles        │
├─────────────────────────┤     ├─────────────────────────┤
│ PK │ id               │─────│ FK │ user_id             │
│     email               │     │ FK │ role_id              │
│     password_hash       │     │     assigned_at          │
│     is_active           │     │     assigned_by (opt)    │
│     email_verified_at   │     └───────────┬─────────────┘
│     last_login_at       │                 │
│     created_at          │                 │
│     updated_at          │     ┌───────────▼─────────────┐
└─────────────────────────┘     │         roles           │
                                 ├─────────────────────────┤
                                 │ PK │ id               │
┌─────────────────────────┐     │     name                 │
│    permissions          │     │     description          │
├─────────────────────────┤     │     is_system_role (opt) │
│ PK │ id               │     │     created_at            │
│     name                │     └───────────┬─────────────┘
│     resource            │                   │
│     action (CRUD)       │                   │
│     description         │     ┌───────────▼─────────────┐
│     created_at          │     │    role_permissions      │
└───────────┬─────────────┘     ├─────────────────────────┤
            │                   │ FK │ role_id           │
            └───────────────────│ FK │ permission_id      │
                                │     assigned_at          │
                                └─────────────────────────┘
```

## 🔍 Alternative Clean View

```
┌─────────────────────────────────────────────────────────────────┐
│                       COMPLETE RBAC SCHEMA                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────┐       ┌──────────────┐       ┌─────────┐          │
│  │ users   │       │  user_roles  │       │ roles   │          │
│  ├─────────┤       ├──────────────┤       ├─────────┤          │
│  │ id (PK) │──────▶│ user_id (FK) │       │ id (PK) │          │
│  │ email   │       │ role_id (FK) │◀──────│ name    │          │
│  │ password│       │ assigned_at  │       │ desc    │          │
│  │ is_active│      └──────────────┘       └────┬────┘          │
│  └─────────┘                                   │                │
│                                                 │                │
│                                      ┌──────────▼─────────┐     │
│                                      │  role_permissions   │     │
│                                      ├─────────────────────┤     │
│                                      │ role_id (FK)        │     │
│                                      │ permission_id (FK)  │◀┐   │
│                                      │ assigned_at         │ │   │
│                                      └─────────────────────┘ │   │
│                                                 │              │   │
│                                      ┌──────────▼─────────┐   │   │
│                                      │   permissions       │   │   │
│                                      ├─────────────────────┤   │   │
│                                      │ id (PK)             │   │   │
│                                      │ name                │   │   │
│                                      │ resource            │   │   │
│                                      │ action              │───┘   │
│                                      │ description         │        │
│                                      └─────────────────────┘        │
│                                                                   │
│  Legend:  ──▶ One-to-Many    ──▶ Many-to-Many (through junction)  │
└─────────────────────────────────────────────────────────────────┘
```

## 📋 Table Details with Constraints

### **users**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT | Unique user identifier |
| email | VARCHAR(255) | NOT NULL, UNIQUE | User's email for login |
| password_hash | VARCHAR(255) | NOT NULL | Bcrypt hashed password |
| is_active | BOOLEAN | DEFAULT true | Soft delete/disable flag |
| email_verified_at | TIMESTAMP | NULL | Email verification timestamp |
| last_login_at | TIMESTAMP | NULL | Last successful login |
| created_at | TIMESTAMP | NOT NULL | Account creation time |
| updated_at | TIMESTAMP | NOT NULL | Last update time |

### **roles**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT | Unique role identifier |
| name | VARCHAR(50) | NOT NULL, UNIQUE | Role name (e.g., 'ADMIN') |
| description | VARCHAR(255) | NULL | Role description |
| is_system_role | BOOLEAN | DEFAULT false | Protected system roles |
| created_at | TIMESTAMP | NOT NULL | Role creation time |

### **permissions**
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| id | BIGINT | PK, AUTO_INCREMENT | Unique permission identifier |
| name | VARCHAR(100) | NOT NULL, UNIQUE | e.g., 'user:create' |
| resource | VARCHAR(50) | NOT NULL | e.g., 'user', 'order' |
| action | VARCHAR(20) | NOT NULL | 'create', 'read', 'update', 'delete' |
| description | VARCHAR(255) | NULL | What this permission allows |
| created_at | TIMESTAMP | NOT NULL | Permission creation time |

### **user_roles** (Junction Table)
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| user_id | BIGINT | PK, FK → users.id | Reference to user |
| role_id | BIGINT | PK, FK → roles.id | Reference to role |
| assigned_at | TIMESTAMP | NOT NULL | When role was assigned |
| assigned_by | BIGINT | FK → users.id | Admin who assigned (optional) |

### **role_permissions** (Junction Table)
| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| role_id | BIGINT | PK, FK → roles.id | Reference to role |
| permission_id | BIGINT | PK, FK → permissions.id | Reference to permission |
| assigned_at | TIMESTAMP | NOT NULL | When permission was granted |

## 🎯 Relationship Summary

```
┌─────────┐         ┌─────────────┐         ┌─────────┐
│  users  │────────▶│ user_roles  │◀────────│  roles  │
└─────────┘   (1:N)  └─────────────┘  (1:N)  └────┬────┘
                                                    │
                                                    │ (1:N)
                                                    │
                                           ┌────────▼────────┐
                                           │ role_permissions│
                                           └────────┬────────┘
                                                    │ (1:N)
                                           ┌────────▼────────┐
                                           │   permissions   │
                                           └─────────────────┘
```

## 🏗️ Cardinality

1. **User to User_Roles**: One user can have many role assignments (1:N)
2. **Role to User_Roles**: One role can be assigned to many users (1:N)
3. **Role to Role_Permissions**: One role can have many permissions (1:N)
4. **Permission to Role_Permissions**: One permission can belong to many roles (1:N)
Very good Rahul 🔥
This is correct mindset — **first understand, then implement** ✅

Now I will explain every RBAC table query in **simple English**, step by step.

---

# 🧱 1️⃣ USERS TABLE

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 🔍 What Each Column Means

| Column     | Meaning                                         |
| ---------- | ----------------------------------------------- |
| id         | Unique user ID (UUID safer than auto increment) |
| email      | Login email (must be unique)                    |
| password   | Hashed password (BCrypt)                        |
| is_active  | If user is enabled or blocked                   |
| created_at | When user created                               |
| updated_at | Last update time                                |

### 🧠 Why UNIQUE email?

No two users can have same email.

---

# 🧱 2️⃣ ROLES TABLE

```sql
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 🔍 Meaning

| Column      | Meaning                              |
| ----------- | ------------------------------------ |
| id          | Role ID                              |
| name        | Role name (SUPER_ADMIN, ADMIN, USER) |
| description | Role explanation                     |
| created_at  | Created time                         |

### 🧠 Why UNIQUE name?

Because we cannot have two roles named SUPER_ADMIN.

---

# 🧱 3️⃣ PERMISSIONS TABLE

```sql
CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 🔍 Meaning

Permission is a small action like:

* CREATE_COMPANY
* DELETE_USER
* VIEW_PROJECT

Roles will combine permissions.

---

# 🧱 4️⃣ USER_ROLES TABLE (Many-to-Many)

```sql
CREATE TABLE user_roles (
    user_id UUID NOT NULL,
    role_id UUID NOT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (user_id, role_id),

    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY(role_id) REFERENCES roles(id) ON DELETE CASCADE
);
```

### 🔍 Why This Table?

Because:

One user → can have multiple roles
One role → can belong to multiple users

Example:

Rahul → SUPER_ADMIN
Rahul → SUPPORT_MANAGER

This table stores that mapping.

---

# 🧱 5️⃣ ROLE_PERMISSIONS TABLE (Many-to-Many)

```sql
CREATE TABLE role_permissions (
    role_id UUID NOT NULL,
    permission_id UUID NOT NULL,
    assigned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (role_id, permission_id),

    FOREIGN KEY(role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY(permission_id) REFERENCES permissions(id) ON DELETE CASCADE
);
```

### 🔍 Why This Table?

Because:

One role → many permissions
One permission → can belong to many roles

Example:

SUPER_ADMIN → CREATE_COMPANY
SUPER_ADMIN → DELETE_COMPANY
ADMIN → VIEW_PROJECT

---

# 🧠 FULL RBAC FLOW (Simple Diagram)

```
User
  ↓
User_Roles
  ↓
Role
  ↓
Role_Permissions
  ↓
Permission
```

When user logs in:

1. Get user
2. Get roles
3. Get permissions
4. Put permissions in JWT
5. Check permission in API

---

# 🧠 Why We Use CASCADE?

```
ON DELETE CASCADE
```

Means:

If user deleted → automatically delete from user_roles

Keeps DB clean.

---

# 🏆 What You Learned

You now understand:

✅ Primary key
✅ Foreign key
✅ Many-to-many relationship
✅ Unique constraint
✅ RBAC architecture
✅ Data integrity

This is enterprise-level database design.

---

# 🎯 Next Step

Before implementing, answer me:

Can you explain in your own words:

👉 Why we need `user_roles` table?
👉 Why we need `role_permissions` table?

Explain simply.
I will check your understanding.

Then we move to implementation 🚀
