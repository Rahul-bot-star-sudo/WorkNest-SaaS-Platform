बिल्कुल! अब हम **मल्टी-कंपनी (Multi-tenant)** आर्किटेक्चर के साथ ER Diagram बनाएंगे। यह आपके कॉलेज प्रोजेक्ट के लिए **और प्रभावशाली** होगा।

---

# 🏢 **मल्टी-कंपनी ER DIAGRAM (Multi-tenant Architecture)**

```
┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                      MULTI-COMPANY ER DIAGRAM - COMPLETE SYSTEM (10 TABLES)                         │
├─────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                     │
│  ┌──────────────────┐         ┌──────────────────┐         ┌──────────────────┐                   │
│  │    companies     │         │   departments    │         │    employees     │                   │
│  ├──────────────────┤         ├──────────────────┤         ├──────────────────┤                   │
│  │ id (PK)          │────────▶│ id (PK)          │         │ id (PK)          │                   │
│  │ name             │         │ company_id (FK)  │◀────────│ company_id (FK)  │                   │
│  │ email            │         │ name             │         │ employee_id      │                   │
│  │ phone            │         │ head_id (FK)     │────┐    │ first_name       │                   │
│  │ address          │         └──────────────────┘    │    │ last_name        │                   │
│  │ status           │                                   │    │ email            │                   │
│  │ created_at       │                                   │    │ phone            │                   │
│  └────────┬─────────┘                                   │    │ photo            │                   │
│           │                                             │    │ dob              │                   │
│           │                                             │    │ gender           │                   │
│           │                                             │    │ address          │                   │
│           │                                             │    │ department_id (FK)──┐               │
│           │                                             │    │ designation        │               │
│           │                                             │    │ joining_date       │               │
│           │                                             │    │ reporting_manager (FK)─┐           │
│           │                                             │    │ employment_type    │   │           │
│           │                                             │    │ status            │   │           │
│           │                                             │    └──────────────────┘   │           │
│           │                                             │             │             │           │
│           │                                             │             │             │           │
│           │                                             └─────────────┼─────────────┘           │
│           │                                                           │                         │
│           │                    ┌──────────────────┐                    │                         │
│           │                    │      users       │                    │                         │
│           │                    ├──────────────────┤                    │                         │
│           │                    │ id (PK)          │                    │                         │
│           │                    │ company_id (FK)  │────────────────────┼────────────────┐        │
│           │                    │ employee_id (FK) │────────────────────┘                │        │
│           │                    │ username         │                                     │        │
│           │                    │ password         │                                     │        │
│           │                    │ role             │                                     │        │
│           │                    │ last_login       │                                     │        │
│           │                    └──────────────────┘                                     │        │
│           │                                                                              │        │
│           │                                                                              │        │
│           │                    ┌──────────────────┐         ┌──────────────────┐        │        │
│           │                    │    projects      │         │  project_team    │        │        │
│           │                    ├──────────────────┤         ├──────────────────┤        │        │
│           │                    │ id (PK)          │         │ id (PK)          │        │        │
│           └────────────────────│ company_id (FK)  │         │ company_id (FK)  │────────┼────────┘
│                                │ name             │         │ project_id (FK)  │────────┼─────────┐
│                                │ description      │         │ employee_id (FK) │        │        │
│                                │ start_date       │         └──────────────────┘        │        │
│                                │ end_date         │                                      │        │
│                                │ manager_id (FK)  │───────────────────────────┐         │        │
│                                │ status           │                           │         │        │
│                                │ progress         │                           │         │        │
│                                └──────────────────┘                           │         │        │
│                                         │                                      │         │        │
│                                         │                                      │         │        │
│                                         ▼                                      │         │        │
│                                ┌──────────────────┐         ┌──────────────────┐│         │        │
│                                │      tasks       │         │task_attachments  ││         │        │
│                                ├──────────────────┤         ├──────────────────┤│         │        │
│                                │ id (PK)          │         │ id (PK)          ││         │        │
│                                │ company_id (FK)  │────────▶│ company_id (FK)  ││         │        │
│                                │ project_id (FK)  │────────▶│ task_id (FK)     ││         │        │
│                                │ title            │         │ file_name        ││         │        │
│                                │ description      │         │ file_path        ││         │        │
│                                │ assignee_id (FK) │─────────│ uploaded_by (FK) │─────────┘        │
│                                │ due_date         │         │ uploaded_at      │                  │
│                                │ priority         │         └──────────────────┘                  │
│                                │ status           │                                                │
│                                │ created_at       │         ┌──────────────────┐                  │
│                                │ completed_at     │         │ task_comments    │                  │
│                                └──────────────────┘         ├──────────────────┤                  │
│                                         │                    │ id (PK)          │                  │
│                                         │                    │ company_id (FK)  │──────────────────┘
│                                         └────────────────────│ task_id (FK)     │───────────────────┐
│                                                              │ employee_id (FK) │──────────────────┐│
│                                                              │ comment          │                  ││
│                                                              │ created_at       │                  ││
│                                                              └──────────────────┘                  ││
│                                                                                                     ││
└─────────────────────────────────────────────────────────────────────────────────────────────────────┘│
                                                                                                       │
                    ┌─────────────────────────────────────────────────────────────────────────────────┘
                    │
                    ▼
┌─────────────────────────────────────────────────────────────────────────────────────────────────────┐
│                                    PROJECT & TASK MANAGEMENT                                         │
│                                         (Same Structure)                                             │
├─────────────────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────────┐   │
│  │                                  3.1 PROJECT MANAGEMENT                                        │   │
│  ├─────────────────────────────────────────────────────────────────────────────────────────────┤   │
│  │  • Project List                                                                              │   │
│  │  • Create Project (with Project Manager & Team Members)                                      │   │
│  │  • Project Details (Overview, Team Members, Tasks List)                                      │   │
│  └─────────────────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────────┐   │
│  │                                  3.2 TASK MANAGEMENT                                          │   │
│  ├─────────────────────────────────────────────────────────────────────────────────────────────┤   │
│  │  • Task List (with Project, Assignee, Priority, Status)                                      │   │
│  │  • Create Task (Title, Description, Project, Assignee, Due Date, Priority)                   │   │
│  │  • Task Details (Info, Attachments, Comments, Status Update)                                 │   │
│  └─────────────────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────────────────────────────┐   │
│  │                                  3.3 DASHBOARD                                                │   │
│  ├─────────────────────────────────────────────────────────────────────────────────────────────┤   │
│  │  • Project Stats (Total, Active, Completed Projects)                                         │   │
│  │  • Task Overview (My Tasks, Overdue Tasks, Completed Today)                                  │   │
│  │  • Recent Activities                                                                         │   │
│  └─────────────────────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 **मल्टी-कंपनी के लिए टेबल्स (10 टेबल्स)**

### **1. companies टेबल (मुख्य टेबल)**
| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK, AI) | कंपनी का यूनिक आईडी |
| name | VARCHAR(100) | कंपनी का नाम |
| email | VARCHAR(100) | कंपनी का ईमेल |
| phone | VARCHAR(20) | फोन नंबर |
| address | TEXT | पता |
| status | ENUM | Active/Inactive |
| created_at | TIMESTAMP | रजिस्ट्रेशन तारीख |

### **2. departments टेबल**
| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK, AI) | डिपार्टमेंट आईडी |
| company_id | INT (FK) | कंपनी का आईडी (companies से) |
| name | VARCHAR(100) | डिपार्टमेंट नाम |
| head_id | INT (FK) | डिपार्टमेंट हेड (employees से) |

### **3. employees टेबल**
| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK, AI) | एम्प्लॉई आईडी |
| company_id | INT (FK) | कंपनी का आईडी |
| employee_id | VARCHAR(50) | कंपनी द्वारा दिया गया आईडी |
| first_name | VARCHAR(50) | पहला नाम |
| last_name | VARCHAR(50) | अंतिम नाम |
| email | VARCHAR(100) | ईमेल |
| phone | VARCHAR(20) | फोन |
| photo | VARCHAR(255) | फोटो का पाथ |
| dob | DATE | जन्म तिथि |
| gender | ENUM | Male/Female/Other |
| address | TEXT | पता |
| department_id | INT (FK) | डिपार्टमेंट |
| designation | VARCHAR(100) | पद |
| joining_date | DATE | जॉइनिंग तारीख |
| reporting_manager | INT (FK) | रिपोर्टिंग मैनेजर |
| employment_type | ENUM | Full-time/Part-time/Contract |
| status | ENUM | Active/Inactive |

### **4. users टेबल (Login)**
| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK, AI) | यूजर आईडी |
| company_id | INT (FK) | कंपनी का आईडी |
| employee_id | INT (FK) | एम्प्लॉई आईडी |
| username | VARCHAR(50) | लॉगिन यूजरनेम |
| password | VARCHAR(255) | पासवर्ड (हैशेड) |
| role | ENUM | Super Admin/Company Admin/Manager/Employee |
| last_login | TIMESTAMP | आखिरी लॉगिन |

### **5. projects टेबल**
| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK, AI) | प्रोजेक्ट आईडी |
| company_id | INT (FK) | कंपनी का आईडी |
| name | VARCHAR(200) | प्रोजेक्ट नाम |
| description | TEXT | विवरण |
| start_date | DATE | शुरू होने की तारीख |
| end_date | DATE | समाप्ति तारीख |
| manager_id | INT (FK) | प्रोजेक्ट मैनेजर (employees से) |
| status | ENUM | Active/Completed/On Hold |
| progress | INT | प्रगति (%) |

### **6. project_team टेबल**
| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK, AI) | टीम आईडी |
| company_id | INT (FK) | कंपनी का आईडी |
| project_id | INT (FK) | प्रोजेक्ट आईडी |
| employee_id | INT (FK) | एम्प्लॉई आईडी |

### **7. tasks टेबल**
| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK, AI) | टास्क आईडी |
| company_id | INT (FK) | कंपनी का आईडी |
| project_id | INT (FK) | प्रोजेक्ट आईडी |
| title | VARCHAR(200) | टास्क शीर्षक |
| description | TEXT | विवरण |
| assignee_id | INT (FK) | किसको असाइन हुआ है |
| due_date | DATE | समय सीमा |
| priority | ENUM | High/Medium/Low |
| status | ENUM | Todo/Doing/Done |
| created_at | TIMESTAMP | बनाने की तारीख |
| completed_at | TIMESTAMP | पूरा होने की तारीख |

### **8. task_attachments टेबल**
| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK, AI) | अटैचमेंट आईडी |
| company_id | INT (FK) | कंपनी का आईडी |
| task_id | INT (FK) | टास्क आईडी |
| file_name | VARCHAR(255) | फाइल का नाम |
| file_path | VARCHAR(255) | फाइल का पाथ |
| uploaded_by | INT (FK) | किसने अपलोड किया |
| uploaded_at | TIMESTAMP | अपलोड तारीख |

### **9. task_comments टेबल**
| Column | Type | Description |
|--------|------|-------------|
| id | INT (PK, AI) | कमेंट आईडी |
| company_id | INT (FK) | कंपनी का आईडी |
| task_id | INT (FK) | टास्क आईडी |
| employee_id | INT (FK) | किसने कमेंट किया |
| comment | TEXT | कमेंट |
| created_at | TIMESTAMP | कमेंट तारीख |

---

## 🔗 **मल्टी-कंपनी Relationships**

| # | From | To | Type | Description |
|---|------|----|------|-------------|
| 1 | companies | departments | One-to-Many | एक कंपनी में कई डिपार्टमेंट |
| 2 | companies | employees | One-to-Many | एक कंपनी में कई एम्प्लॉई |
| 3 | companies | users | One-to-Many | एक कंपनी के कई यूजर |
| 4 | companies | projects | One-to-Many | एक कंपनी में कई प्रोजेक्ट |
| 5 | companies | tasks | One-to-Many | एक कंपनी में कई टास्क |
| 6 | departments | employees | One-to-Many | एक डिपार्टमेंट में कई एम्प्लॉई |
| 7 | employees | users | One-to-One | एक एम्प्लॉई का एक यूजर अकाउंट |
| 8 | employees | tasks | One-to-Many | एक एम्प्लॉई के कई टास्क |
| 9 | employees | projects | One-to-Many | एक एम्प्लॉई कई प्रोजेक्ट का मैनेजर |
| 10 | projects | project_team | One-to-Many | एक प्रोजेक्ट में कई टीम मेंबर |
| 11 | projects | tasks | One-to-Many | एक प्रोजेक्ट में कई टास्क |
| 12 | tasks | task_attachments | One-to-Many | एक टास्क में कई अटैचमेंट |
| 13 | tasks | task_comments | One-to-Many | एक टास्क पर कई कमेंट |

---

## 📝 **SQL Script (मल्टी-कंपनी के लिए)**

```sql
-- Database: multi_company_erp
CREATE DATABASE multi_company_erp;
USE multi_company_erp;

-- 1. Companies Table
CREATE TABLE companies (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone VARCHAR(20),
    address TEXT,
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Departments Table
CREATE TABLE departments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    head_id INT NULL,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    UNIQUE KEY unique_company_department (company_id, name)
);

-- 3. Employees Table
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT NOT NULL,
    employee_id VARCHAR(50) NOT NULL,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50),
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    photo VARCHAR(255),
    dob DATE,
    gender ENUM('Male', 'Female', 'Other'),
    address TEXT,
    department_id INT,
    designation VARCHAR(100),
    joining_date DATE,
    reporting_manager INT,
    employment_type ENUM('Full-time', 'Part-time', 'Contract') DEFAULT 'Full-time',
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL,
    FOREIGN KEY (reporting_manager) REFERENCES employees(id) ON DELETE SET NULL,
    UNIQUE KEY unique_company_employee (company_id, employee_id),
    UNIQUE KEY unique_company_email (company_id, email)
);

-- Add Foreign Key for department head
ALTER TABLE departments 
ADD FOREIGN KEY (head_id) REFERENCES employees(id) ON DELETE SET NULL;

-- 4. Users Table (Login)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT NOT NULL,
    employee_id INT UNIQUE,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('Super Admin', 'Company Admin', 'Manager', 'Employee') DEFAULT 'Employee',
    last_login TIMESTAMP NULL,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    UNIQUE KEY unique_company_username (company_id, username)
);

-- 5. Projects Table
CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT NOT NULL,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    manager_id INT,
    status ENUM('Active', 'Completed', 'On Hold') DEFAULT 'Active',
    progress INT DEFAULT 0,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL,
    UNIQUE KEY unique_company_project (company_id, name)
);

-- 6. Project Team Table
CREATE TABLE project_team (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT NOT NULL,
    project_id INT NOT NULL,
    employee_id INT NOT NULL,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    UNIQUE KEY unique_project_employee (company_id, project_id, employee_id)
);

-- 7. Tasks Table
CREATE TABLE tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT NOT NULL,
    project_id INT NOT NULL,
    title VARCHAR(200) NOT NULL,
    description TEXT,
    assignee_id INT,
    due_date DATE,
    priority ENUM('High', 'Medium', 'Low') DEFAULT 'Medium',
    status ENUM('Todo', 'Doing', 'Done') DEFAULT 'Todo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (assignee_id) REFERENCES employees(id) ON DELETE SET NULL
);

-- 8. Task Attachments Table
CREATE TABLE task_attachments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT NOT NULL,
    task_id INT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    uploaded_by INT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (uploaded_by) REFERENCES employees(id) ON DELETE SET NULL
);

-- 9. Task Comments Table
CREATE TABLE task_comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT NOT NULL,
    task_id INT NOT NULL,
    employee_id INT,
    comment TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
    FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE SET NULL
);

-- Indexes for performance
CREATE INDEX idx_companies_status ON companies(status);
CREATE INDEX idx_departments_company ON departments(company_id);
CREATE INDEX idx_employees_company ON employees(company_id);
CREATE INDEX idx_employees_department ON employees(department_id);
CREATE INDEX idx_projects_company ON projects(company_id);
CREATE INDEX idx_projects_manager ON projects(manager_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_tasks_company ON tasks(company_id);
CREATE INDEX idx_tasks_project ON tasks(project_id);
CREATE INDEX idx_tasks_assignee ON tasks(assignee_id);
CREATE INDEX idx_tasks_status ON tasks(status);
CREATE INDEX idx_tasks_due_date ON tasks(due_date);
```

---

## 🎯 **Sample Data (मल्टी-कंपनी के लिए)**

```sql
-- Insert Companies
INSERT INTO companies (name, email, phone, address, status) VALUES
('Tech Solutions Pvt Ltd', 'info@techsolutions.com', '9876543210', 'Mumbai, Maharashtra', 'Active'),
('Innovative Systems', 'contact@innovativesys.com', '9876543211', 'Delhi, NCR', 'Active'),
('Digital India Corp', 'hello@digitalindia.com', '9876543212', 'Bangalore, Karnataka', 'Active');

-- Insert Departments for Company 1
INSERT INTO departments (company_id, name) VALUES
(1, 'Engineering'), (1, 'Marketing'), (1, 'HR'), (1, 'Sales');

-- Insert Departments for Company 2
INSERT INTO departments (company_id, name) VALUES
(2, 'Development'), (2, 'Sales'), (2, 'Support'), (2, 'Finance');

-- Insert Departments for Company 3
INSERT INTO departments (company_id, name) VALUES
(3, 'Product'), (3, 'Design'), (3, 'Marketing'), (3, 'Operations');

-- Insert Employees for Company 1
INSERT INTO employees (company_id, employee_id, first_name, last_name, email, phone, department_id, designation, joining_date, employment_type) VALUES
(1, 'TECH001', 'Rajesh', 'Kumar', 'rajesh@techsolutions.com', '9876543213', 1, 'Engineering Manager', '2023-01-15', 'Full-time'),
(1, 'TECH002', 'Priya', 'Sharma', 'priya@techsolutions.com', '9876543214', 2, 'Marketing Head', '2023-02-01', 'Full-time'),
(1, 'TECH003', 'Amit', 'Patel', 'amit@techsolutions.com', '9876543215', 4, 'Sales Manager', '2023-01-20', 'Full-time');

-- Insert Employees for Company 2
INSERT INTO employees (company_id, employee_id, first_name, last_name, email, phone, department_id, designation, joining_date, employment_type) VALUES
(2, 'INNOV001', 'Sneha', 'Reddy', 'sneha@innovativesys.com', '9876543216', 5, 'Development Manager', '2023-03-10', 'Full-time'),
(2, 'INNOV002', 'Vikram', 'Singh', 'vikram@innovativesys.com', '9876543217', 5, 'Senior Developer', '2023-03-15', 'Full-time'),
(2, 'INNOV003', 'Neha', 'Gupta', 'neha@innovativesys.com', '9876543218', 6, 'Sales Executive', '2023-04-01', 'Full-time');

-- Insert Employees for Company 3
INSERT INTO employees (company_id, employee_id, first_name, last_name, email, phone, department_id, designation, joining_date, employment_type) VALUES
(3, 'DIG001', 'Rahul', 'Verma', 'rahul@digitalindia.com', '9876543219', 9, 'Product Manager', '2023-05-01', 'Full-time'),
(3, 'DIG002', 'Anjali', 'Joshi', 'anjali@digitalindia.com', '9876543220', 10, 'UI/UX Designer', '2023-05-15', 'Full-time'),
(3, 'DIG003', 'Karan', 'Singh', 'karan@digitalindia.com', '9876543221', 11, 'Marketing Manager', '2023-06-01', 'Full-time');

-- Update reporting managers
UPDATE employees SET reporting_manager = 1 WHERE id IN (1,4,7);
UPDATE employees SET reporting_manager = 4 WHERE id IN (5,6);
UPDATE employees SET reporting_manager = 7 WHERE id IN (8,9);

-- Insert Users
INSERT INTO users (company_id, employee_id, username, password, role) VALUES
(1, 1, 'rajesh_tech', 'pass123', 'Manager'),
(1, 2, 'priya_tech', 'pass123', 'Manager'),
(1, 3, 'amit_tech', 'pass123', 'Manager'),
(2, 4, 'sneha_innov', 'pass123', 'Manager'),
(2, 5, 'vikram_innov', 'pass123', 'Employee'),
(2, 6, 'neha_innov', 'pass123', 'Employee'),
(3, 7, 'rahul_digital', 'pass123', 'Manager'),
(3, 8, 'anjali_digital', 'pass123', 'Employee'),
(3, 9, 'karan_digital', 'pass123', 'Manager');

-- Insert Super Admin (no employee_id)
INSERT INTO users (company_id, username, password, role) VALUES
(1, 'superadmin', 'admin@123', 'Super Admin');

-- Insert Projects for each company
INSERT INTO projects (company_id, name, description, start_date, end_date, manager_id, status) VALUES
(1, 'Website Redesign', 'Redesign company website', '2024-01-01', '2024-03-31', 1, 'Active'),
(1, 'Mobile App', 'Develop mobile app', '2024-02-01', '2024-06-30', 1, 'Active'),
(2, 'CRM Implementation', 'New CRM system', '2024-03-01', '2024-05-31', 4, 'Active'),
(2, 'Cloud Migration', 'Move to AWS cloud', '2024-04-01', '2024-07-31', 4, 'Planning'),
(3, 'New Website Launch', 'Launch new product website', '2024-02-15', '2024-04-15', 7, 'Active');

-- Insert Tasks
INSERT INTO tasks (company_id, project_id, title, assignee_id, due_date, priority, status) VALUES
(1, 1, 'Create Wireframes', 1, '2024-01-15', 'High', 'Done'),
(1, 1, 'Design UI', 1, '2024-02-01', 'High', 'Doing'),
(1, 2, 'Setup React Native', 1, '2024-02-15', 'High', 'Doing'),
(2, 3, 'Research CRM', 5, '2024-03-15', 'High', 'Doing'),
(2, 3, 'Vendor Comparison', 5, '2024-03-30', 'Medium', 'Todo'),
(3, 5, 'Design Homepage', 8, '2024-03-01', 'High', 'Done'),
(3, 5, 'Develop Frontend', 8, '2024-03-30', 'High', 'Doing');
```

---

## 🎨 **प्रोजेक्ट & टास्क मैनेजमेंट के लिए महत्वपूर्ण क्वेरीज़**

```sql
-- 1. Get all projects for a specific company
SELECT * FROM projects 
WHERE company_id = 1 AND status = 'Active';

-- 2. Get project details with manager name
SELECT 
    p.*,
    e.first_name as manager_first_name,
    e.last_name as manager_last_name
FROM projects p
LEFT JOIN employees e ON p.manager_id = e.id
WHERE p.company_id = 1;

-- 3. Get all tasks for a specific project
SELECT 
    t.*,
    e.first_name as assignee_first_name,
    e.last_name as assignee_last_name
FROM tasks t
LEFT JOIN employees e ON t.assignee_id = e.id
WHERE t.project_id = 1;

-- 4. Get my tasks (for logged in employee)
SELECT 
    t.*,
    p.name as project_name
FROM tasks t
JOIN projects p ON t.project_id = p.id
WHERE t.assignee_id = 4 AND t.status != 'Done';

-- 5. Get overdue tasks for a company
SELECT 
    t.*,
    p.name as project_name,
    e.first_name as assignee
FROM tasks t
JOIN projects p ON t.project_id = p.id
LEFT JOIN employees e ON t.assignee_id = e.id
WHERE t.company_id = 1 
  AND t.due_date < CURDATE() 
  AND t.status != 'Done';

-- 6. Project statistics dashboard
SELECT 
    COUNT(*) as total_projects,
    SUM(CASE WHEN status = 'Active' THEN 1 ELSE 0 END) as active_projects,
    SUM(CASE WHEN status = 'Completed' THEN 1 ELSE 0 END) as completed_projects,
    SUM(CASE WHEN status = 'On Hold' THEN 1 ELSE 0 END) as on_hold_projects
FROM projects
WHERE company_id = 1;

-- 7. Task statistics for employee
SELECT 
    e.id,
    e.first_name,
    e.last_name,
    COUNT(CASE WHEN t.status = 'Todo' THEN 1 END) as todo_tasks,
    COUNT(CASE WHEN t.status = 'Doing' THEN 1 END) as doing_tasks,
    COUNT(CASE WHEN t.status = 'Done' THEN 1 END) as done_tasks,
    COUNT(CASE WHEN t.due_date < CURDATE() AND t.status != 'Done' THEN 1 END) as overdue_tasks
FROM employees e
LEFT JOIN tasks t ON e.id = t.assignee_id
WHERE e.company_id = 1 AND e.id = 1
GROUP BY e.id;

-- 8. Recent activities (last 10 comments)
SELECT 
    tc.*,
    e.first_name,
    e.last_name,
    t.title as task_title
FROM task_comments tc
JOIN employees e ON tc.employee_id = e.id
JOIN tasks t ON tc.task_id = t.id
WHERE tc.company_id = 1
ORDER BY tc.created_at DESC
LIMIT 10;
```

---

## 🏆 **मल्टी-कंपनी के फायदे (Benefits)**

| Feature | Single Company | Multi-Company |
|---------|---------------|---------------|
| **स्केलेबिलिटी** | सिर्फ एक कंपनी | अनलिमिटेड कंपनियां |
| **डेटा आइसोलेशन** | नहीं | हाँ (company_id से) |
| **रियल-वर्ल्ड यूज** | कम | **ज्यादा** |
| **प्रोजेक्ट वैल्यू** | अच्छा | **बहुत अच्छा** |
| **इम्प्लीमेंटेशन** | आसान | थोड़ा कॉम्प्लेक्स |

---

## 📊 **प्रोजेक्ट & टास्क मैनेजमेंट हायरार्की (आपके अनुसार)**

```
PROJECT & TASK MANAGEMENT
├── 3.1 PROJECT MANAGEMENT
│   ├── Project List
│   │   ├── Project Name
│   │   ├── Description
│   │   ├── Start Date
│   │   ├── End Date
│   │   ├── Status (Active/Completed/Hold)
│   │   └── Progress (%)
│   │
│   ├── Create Project
│   │   ├── Project Name
│   │   ├── Description
│   │   ├── Start/End Date
│   │   ├── Project Manager
│   │   └── Team Members
│   │
│   └── Project Details
│       ├── Overview
│       ├── Team Members
│       └── Tasks List
│
├── 3.2 TASK MANAGEMENT
│   ├── Task List
│   │   ├── Task Title
│   │   ├── Project Name
│   │   ├── Assignee
│   │   ├── Due Date
│   │   ├── Priority (High/Medium/Low)
│   │   └── Status (Todo/Doing/Done)
│   │
│   ├── Create Task
│   │   ├── Title
│   │   ├── Description
│   │   ├── Project
│   │   ├── Assign to
│   │   ├── Due Date
│   │   ├── Priority
│   │   └── Status
│   │
│   └── Task Details
│       ├── Task Info
│       ├── Attachments (Images/Files)
│       ├── Comments
│       └── Status Update
│
└── 3.3 DASHBOARD
    ├── Project Stats
    │   ├── Total Projects
    │   ├── Active Projects
    │   └── Completed Projects
    │
    ├── Task Overview
    │   ├── My Tasks
    │   ├── Overdue Tasks
    │   └── Completed Today
    │
    └── Recent Activities
```

---

✅ **अब यह ER Diagram मल्टी-कंपनी सपोर्ट के साथ तै