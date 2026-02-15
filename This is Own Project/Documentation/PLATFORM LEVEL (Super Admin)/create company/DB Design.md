Ah, I understand! You want a simpler ERD with just Super Admin, Company, and Company Admin. Here's the simplified version:

## Simple ERD (Only Super Admin, Company, and Company Admin):

### Basic Structure:
```
┌────────────────┐       ┌────────────────┐       ┌────────────────┐
│   SUPER_ADMIN  │       │    COMPANY     │       │  COMPANY_ADMIN │
│                │       │                │       │                │
│ - id (PK)      │──────◄│ - id (PK)      │──────◄│ - id (PK)      │
│ - username     │  1:N  │ - name         │  1:1  │ - name         │
│ - email        │creates│ - address      │  has  │ - email        │
│ - password     │       │ - phone        │       │ - phone        │
│ - created_at   │       │ - email        │       │ - password     │
└────────────────┘       │ - status       │       │ - company_id(FK)│
                         │ - created_by   │       │ - created_at   │
                         │ - created_at   │       └────────────────┘
                         └────────────────┘
```

## Detailed ERD (Crow's Foot Notation):

```mermaid
erDiagram
    SUPER_ADMIN ||--o{ COMPANY : creates
    SUPER_ADMIN {
        int id PK
        string username
        string email
        string password_hash
        datetime created_at
        datetime last_login
    }
    
    COMPANY ||--|| COMPANY_ADMIN : has
    COMPANY {
        int id PK
        string company_name
        string company_email
        string phone
        string address
        string city
        string state
        string country
        string pincode
        string gst_number
        string pan_number
        string status "active/inactive"
        int created_by FK "super_admin_id"
        datetime created_at
        datetime updated_at
    }
    
    COMPANY_ADMIN {
        int id PK
        string first_name
        string last_name
        string email UK
        string phone
        string password_hash
        int company_id FK UK "one-to-one"
        string designation
        datetime created_at
        datetime last_login
        boolean is_active
    }
```

## Alternative Representation (Table Format):

### SUPER_ADMIN Table
| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Unique identifier |
| username | VARCHAR(50) | Login username |
| email | VARCHAR(100) | Email address |
| password_hash | VARCHAR(255) | Encrypted password |
| created_at | DATETIME | Record creation time |

### COMPANY Table
| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Unique company ID |
| company_name | VARCHAR(200) | Company name |
| company_email | VARCHAR(100) | Official email |
| phone | VARCHAR(20) | Contact number |
| address | TEXT | Company address |
| city | VARCHAR(100) | City |
| state | VARCHAR(100) | State |
| country | VARCHAR(100) | Country |
| pincode | VARCHAR(20) | Postal code |
| gst_number | VARCHAR(50) | GST (if applicable) |
| pan_number | VARCHAR(50) | PAN (if applicable) |
| status | ENUM | Active/Inactive |
| created_by | INT (FK) | References SUPER_ADMIN.id |
| created_at | DATETIME | Creation timestamp |

### COMPANY_ADMIN Table
| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK) | Unique admin ID |
| first_name | VARCHAR(100) | First name |
| last_name | VARCHAR(100) | Last name |
| email | VARCHAR(100) (UK) | Login email (unique) |
| phone | VARCHAR(20) | Contact number |
| password_hash | VARCHAR(255) | Encrypted password |
| company_id | INT (FK) (UK) | References COMPANY.id (unique) |
| designation | VARCHAR(100) | Job title (e.g., "Company Admin") |
| is_active | BOOLEAN | Active status |
| created_at | DATETIME | Creation timestamp |
| last_login | DATETIME | Last login time |

## Relationships Explained:

1. **SUPER_ADMIN → COMPANY (One-to-Many)**
   - One Super Admin can create multiple companies
   - Each company records which Super Admin created it
   - `created_by` in COMPANY table references SUPER_ADMIN.id

2. **COMPANY → COMPANY_ADMIN (One-to-One)**
   - Each company has exactly one Company Admin
   - Each Company Admin manages exactly one company
   - `company_id` in COMPANY_ADMIN is unique (unique constraint)

## Visual Flow of Creation:

```
Step 1: Super Admin exists
┌─────────────────┐
│  SUPER_ADMIN    │
│  ID: 1          │
│  Name: Admin    │
└─────────────────┘
         │
         │ Creates
         ▼
Step 2: Create Company
┌─────────────────┐
│  COMPANY        │
│  ID: 101        │
│  Name: ABC Corp │
│  created_by: 1  │←── References Super Admin
└─────────────────┘
         │
         │ Has
         ▼
Step 3: Assign Company Admin
┌─────────────────┐
│  COMPANY_ADMIN  │
│  ID: 1001       │
│  Name: John Doe │
│  company_id: 101│←── References Company (unique)
└─────────────────┘
```

## SQL Schema Example:

```sql
-- Super Admin table
CREATE TABLE super_admin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Company table
CREATE TABLE company (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_name VARCHAR(200) NOT NULL,
    company_email VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    pincode VARCHAR(20),
    gst_number VARCHAR(50),
    pan_number VARCHAR(50),
    status ENUM('active', 'inactive') DEFAULT 'active',
    created_by INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (created_by) REFERENCES super_admin(id)
);

-- Company Admin table
CREATE TABLE company_admin (
    id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    company_id INT UNIQUE NOT NULL, -- UNIQUE ensures one-to-one
    designation VARCHAR(100) DEFAULT 'Company Admin',
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE
);
```

This simple ERD captures exactly what you need - Super Admin creating companies and each company having exactly one Company Admin. No extra tables for employees, subscriptions, or modules.