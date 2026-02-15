### consept hierarchy
---
```
ENTERPRISE MANAGEMENT SYSTEM
├── 🔐 CORE SECURITY & AUTHENTICATION (System Foundation)
│   ├── SUPER ADMIN CREATION
│   │   ├── What it does:
│   │   │   ├── System bootstrap pe SUPER_ADMIN auto-create
│   │   │   └── Default credentials setup
│   │   ├── Tech Concepts:
│   │   │   ├── ApplicationRunner/CommandLineRunner
│   │   │   ├── BCryptPasswordEncoder
│   │   │   └── Role Enum (SUPER_ADMIN, COMPANY_ADMIN, WORKSPACE_MANAGER, EMPLOYEE)
│   │   └── What You Learn:
│   │       ├── Application initialization
│   │       ├── Password hashing
│   │       └── Role-based design
│   │
│   └── JWT AUTHENTICATION
│       ├── What it does:
│       │   ├── Login API → JWT token generate
│       │   ├── Token validation + Workspace context
│       │   └── Role & workspace extract from token
│       ├── Tech Concepts:
│       │   ├── JWT with custom claims (workspaceId, role)
│       │   ├── OncePerRequestFilter
│       │   └── SecurityContextHolder
│       └── What You Learn:
│           ├── Token-based auth with custom claims
│           ├── Multi-tenant context
│           └── Stateless architecture
│
├── 👑 MODULE 1: COMPANY MANAGEMENT (Super Admin Only)
│   ├── Feature: Company Registration
│   │   ├── What it does:
│   │   │   ├── Sirf SUPER_ADMIN hi new company create kare
│   │   │   ├── COMPANY_ADMIN credentials auto-generate
│   │   │   ├── Default workspace "General" auto-create
│   │   │   └── Company status (ACTIVE/INACTIVE)
│   │   ├── Tech Concepts:
│   │   │   ├── @PreAuthorize("hasRole('SUPER_ADMIN')")
│   │   │   ├── JWT role validation
│   │   │   ├── @OneToOne with User (COMPANY_ADMIN)
│   │   │   └── @OneToMany with Workspace (cascade)
│   │   └── What You Learn:
│   │       ├── Method-level security
│   │       ├── Nested object creation
│   │       └── Transaction management
│   │
│   └── Feature: Company Management
│       ├── What it does:
│       │   ├── View all companies (paginated)
│       │   ├── Update company status
│       │   ├── View all workspaces under company
│       │   └── Search by name
│       ├── Tech Concepts:
│       │   ├── @PreAuthorize("hasRole('SUPER_ADMIN')")
│       │   ├── Pageable interface
│       │   └── Specification for search
│       └── What You Learn:
│           ├── Pagination & Sorting
│           ├── Dynamic queries
│           └── Multi-level data access
│
├── 🏢 MODULE 2: WORKSPACE MANAGEMENT (Company Admin)
│   ├── Feature: Workspace Creation
│   │   ├── What it does:
│   │   │   ├── COMPANY_ADMIN multiple workspaces create kare
│   │   │   │   ├── eg: "Development", "Marketing", "Sales", "HR"
│   │   │   ├── Workspace Manager assign (WORKSPACE_MANAGER role)
│   │   │   ├── Workspace type (DEPARTMENT/PROJECT_BASED/CLIENT)
│   │   │   └── Workspace status (ACTIVE/INACTIVE)
│   │   ├── API Endpoints:
│   │   │   ├── POST /api/workspaces (Create workspace)
│   │   │   ├── PUT /api/workspaces/{id}/manager (Assign manager)
│   │   │   └── GET /api/workspaces (List all workspaces)
│   │   ├── Tech Concepts:
│   │   │   ├── @PreAuthorize("hasRole('COMPANY_ADMIN')")
│   │   │   ├── @ManyToOne with Company
│   │   │   ├── @OneToOne with User (Workspace Manager)
│   │   │   └── WorkspaceMember entity for employees
│   │   └── What You Learn:
│   │       ├── Workspace-based isolation
│   │       ├── Manager assignment pattern
│   │       └── Hierarchical access control
│   │
│   └── Feature: Workspace Overview Dashboard
│       ├── What it does:
│       │   ├── All workspaces list with managers
│       │   ├── Employee count per workspace
│       │   ├── Active projects per workspace
│       │   └── Workspace analytics
│       ├── Tech Concepts:
│       │   ├── @PreAuthorize("hasRole('COMPANY_ADMIN')")
│       │   │   └── JPQL with GROUP BY workspace
│       └── What You Learn:
│           ├── Cross-workspace reporting
│           ├── Data aggregation
│           └── Admin dashboard
│
├── 👥 MODULE 3: EMPLOYEE MANAGEMENT (Company Admin + Workspace Manager)
│   ├── Feature: Department/Role Management
│   │   ├── What it does:
│   │   │   ├── COMPANY_ADMIN: Create company-wide departments
│   │   │   ├── WORKSPACE_MANAGER: Create workspace-specific roles
│   │   │   └── Department/Role CRUD
│   │   ├── Tech Concepts:
│   │   │   ├── @PreAuthorize("hasAnyRole('COMPANY_ADMIN', 'WORKSPACE_MANAGER')")
│   │   │   ├── @ManyToOne with Company/Workspace
│   │   │   └── Hierarchical validation
│   │   └── What You Learn:
│   │       ├── Multi-level role hierarchy
│   │       ├── Context-based validation
│   │       └── Polymorphic relationships
│   │
│   └── Feature: Employee Onboarding & Assignment
│       ├── What it does:
│       │   ├── COMPANY_ADMIN: Add employees to company
│       │   ├── WORKSPACE_MANAGER: 
│       │   │   ├── Assign employees to workspace
│       │   │   ├── Remove from workspace
│       │   │   └── Set workspace-specific role
│       │   └── Employee profile with workspace memberships
│       ├── API Endpoints:
│       │   ├── POST /api/employees (Company Admin only)
│       │   ├── POST /api/workspaces/{id}/members (Workspace Manager)
│       │   ├── DELETE /api/workspaces/{id}/members/{empId}
│       │   └── GET /api/employees/workspace/{id} (Workspace members)
│       ├── Tech Concepts:
│       │   ├── @PreAuthorize with complex conditions
│       │   ├── WorkspaceMember join table with role
│       │   ├── @Query with workspace validation
│       │   └── Entity graphs for eager loading
│       └── What You Learn:
│           ├── Many-to-Many with extra columns
│           ├── Complex authorization logic
│           ├── Custom permission evaluators
│           └── N+1 problem and solutions
│
├── 📊 MODULE 4: PROJECT & TASK MANAGEMENT (Workspace-based)
│   ├── Feature: Workspace Projects
│   │   ├── What it does:
│   │   │   ├── WORKSPACE_MANAGER: 
│   │   │   │   ├── Create projects within workspace
│   │   │   │   ├── Assign project leads
│   │   │   │   └── Set project budget/deadline
│   │   │   ├── Project Lead (EMPLOYEE with lead role):
│   │   │   │   ├── Update project progress
│   │   │   │   ├── Create tasks
│   │   │   │   └── Assign team members
│   │   │   └── Team Members: View assigned tasks
│   │   ├── Data Model:
│   │   │   ├── Project (workspace_id, manager_id, lead_id)
│   │   │   ├── ProjectTeam (project_id, employee_id, role_in_project)
│   │   │   └── Task (project_id, assignee_id, created_by)
│   │   ├── Tech Concepts:
│   │   │   ├── @PreAuthorize("@workspaceSecurity.isManager(#workspaceId)")
│   │   │   ├── @PostAuthorize for return filtering
│   │   │   └── Custom permission annotations
│   │   └── What You Learn:
│   │       ├── Method security with parameters
│   │       ├── Custom security expressions
│   │       └── Row-level security
│   │
│   └── Feature: Cross-Workspace Restrictions
│       ├── What it does:
│       │   ├── Employee from Workspace A cannot see Workspace B projects
│       │   ├── Workspace Manager can only manage their workspace
│       │   ├── Company Admin can see all workspaces
│       │   └── Data isolation between different workspaces
│       ├── Implementation:
│       │   ├── Repository level: @Query with workspace_id = :workspaceId
│       │   ├── Service level: Validate workspace access
│       │   ├── Controller level: Extract workspace from JWT
│       │   └── Filter level: WorkspaceContext filter
│       └── What You Learn:
│           ├── Multi-tenancy implementation
│           ├── Data isolation patterns
│           └── Defense in depth security
│
├── 📈 MODULE 5: ROLE-BASED DASHBOARDS
│   ├── Feature: Company Admin Dashboard
│   │   ├── What it shows:
│   │   │   ├── All workspaces health
│   │   │   ├── Manager performance metrics
│   │   │   ├── Cross-workspace resource allocation
│   │   │   └── Company-wide analytics
│   │   └── Tech: Complex JPQL, Projections
│   │
│   ├── Feature: Workspace Manager Dashboard
│   │   ├── What it shows:
│   │   │   ├── Workspace members overview
│   │   │   ├── Workspace projects status
│   │   │   ├── Task completion rate
│   │   │   └── Resource utilization
│   │   └── Tech: Workspace-scoped queries
│   │
│   └── Feature: Employee Dashboard
│       ├── What it shows:
│       │   ├── My workspaces
│       │   ├── My assigned projects
│       │   ├── My tasks (across workspaces)
│       │   └── Workspace switching
│       └── Tech: Multi-workspace union queries
│
├── 🔄 MODULE 6: ADVANCED WORKSPACE FEATURES
│   ├── Feature: Workspace Transfer
│   │   ├── What it does:
│   │   │   ├── Company Admin can transfer employees between workspaces
│   │   │   ├── History of transfers maintained
│   │   │   └── Reassign tasks on transfer
│   │   └── Tech: Batch updates, Event listeners
│   │
│   ├── Feature: Manager Hierarchy
│   │   ├── What it does:
│   │   │   ├── Senior Manager over multiple workspaces
│   │   │   ├── Junior Manager under senior
│   │   │   ├── Temporary manager assignment (leave coverage)
│   │   │   └── Manager approval workflows
│   │   └── Tech: Self-referential relationships, Temporal data
│   │
│   └── Feature: Workspace Templates
│       ├── What it does:
│       │   ├── Company Admin creates workspace templates
│       │   │   ├── Development template (Dev, QA, DevOps roles)
│       │   │   ├── Marketing template (Content, SEO, Social)
│       │   │   └── Sales template (Inside, Field, Support)
│       │   ├── Quick workspace creation from template
│       │   └── Template versioning
│       └── Tech: JSON columns, Prototype pattern
│
└── 📁 DATABASE SCHEMA (Enhanced with Workspaces)

```sql
-- Core Tables
users (
    id BIGINT PK,
    email VARCHAR UNIQUE,
    password VARCHAR,
    role ENUM(SUPER_ADMIN, COMPANY_ADMIN, WORKSPACE_MANAGER, EMPLOYEE),
    created_at TIMESTAMP
)

companies (
    id BIGINT PK,
    name VARCHAR,
    email VARCHAR,
    phone VARCHAR,
    address TEXT,
    status ENUM(ACTIVE, INACTIVE),
    created_by BIGINT FK (users.id)
)

-- Workspace Table (Multiple per company)
workspaces (
    id BIGINT PK,
    name VARCHAR,
    type ENUM(DEPARTMENT, PROJECT_BASED, CLIENT),
    description TEXT,
    company_id BIGINT FK (companies.id),
    manager_id BIGINT FK (users.id),  -- WORKSPACE_MANAGER
    status ENUM(ACTIVE, INACTIVE),
    created_at TIMESTAMP,
    settings JSON  -- Template-based settings
)

-- Junction table for workspace members with roles
workspace_members (
    workspace_id BIGINT FK (workspaces.id),
    employee_id BIGINT FK (employees.id),
    role_in_workspace VARCHAR,  -- e.g., 'SENIOR_DEV', 'TEAM_LEAD'
    joined_date DATE,
    assigned_by BIGINT FK (users.id),
    PRIMARY KEY (workspace_id, employee_id)
)

employees (
    id BIGINT PK,
    user_id BIGINT FK (users.id) UNIQUE,  -- Login credentials
    company_id BIGINT FK (companies.id),
    
    -- Personal Info
    photo VARCHAR,
    full_name VARCHAR,
    email VARCHAR,
    phone VARCHAR,
    address TEXT,
    
    -- Professional Info
    employee_id VARCHAR UNIQUE,
    designation VARCHAR,
    employment_type ENUM(FULL_TIME, PART_TIME, CONTRACT),
    joining_date DATE,
    
    created_at TIMESTAMP
)

departments (
    id BIGINT PK,
    name VARCHAR,
    company_id BIGINT FK (companies.id),
    head_employee_id BIGINT FK (employees.id)
)

projects (
    id BIGINT PK,
    name VARCHAR,
    description TEXT,
    workspace_id BIGINT FK (workspaces.id),
    manager_id BIGINT FK (users.id),  -- Workspace Manager
    lead_id BIGINT FK (employees.id),  -- Project Lead
    start_date DATE,
    end_date DATE,
    status ENUM(ACTIVE, COMPLETED, HOLD),
    progress INT,
    budget DECIMAL,
    created_at TIMESTAMP
)

project_team (
    project_id BIGINT FK (projects.id),
    employee_id BIGINT FK (employees.id),
    role_in_project VARCHAR,
    assigned_date DATE,
    PRIMARY KEY (project_id, employee_id)
)

tasks (
    id BIGINT PK,
    title VARCHAR,
    description TEXT,
    project_id BIGINT FK (projects.id),
    workspace_id BIGINT FK (workspaces.id),  -- Denormalized for quick access
    assignee_id BIGINT FK (employees.id),
    created_by BIGINT FK (users.id),
    due_date DATE,
    priority ENUM(HIGH, MEDIUM, LOW),
    status ENUM(TODO, DOING, DONE),
    attachments TEXT,  -- JSON array of file paths
    created_at TIMESTAMP,
    updated_at TIMESTAMP
)

task_comments (
    id BIGINT PK,
    task_id BIGINT FK (tasks.id),
    user_id BIGINT FK (users.id),
    comment TEXT,
    created_at TIMESTAMP
)

workspace_templates (
    id BIGINT PK,
    name VARCHAR,
    company_id BIGINT FK (companies.id),
    configuration JSON,  -- Default roles, project types
    created_at TIMESTAMP
)

manager_hierarchy (
    id BIGINT PK,
    senior_manager_id BIGINT FK (users.id),
    junior_manager_id BIGINT FK (users.id),
    workspace_id BIGINT FK (workspaces.id),
    valid_from DATE,
    valid_to DATE,  -- NULL for permanent
    status ENUM(ACTIVE, EXPIRED)
)

---

1. System Initialization
   └── SUPER_ADMIN created

2. Company Creation (SUPER_ADMIN)
   └── Create Company "TechCorp"
       ├── COMPANY_ADMIN created (john@techcorp.com)
       └── Default Workspace "General" auto-created

3. Workspace Setup (COMPANY_ADMIN)
   ├── Create Workspace "Development"
   │   ├── Assign Manager: "alice@techcorp.com" (WORKSPACE_MANAGER)
   │   └── Template: Software Development
   │
   ├── Create Workspace "Marketing"
   │   ├── Assign Manager: "bob@techcorp.com" (WORKSPACE_MANAGER)
   │   └── Template: Digital Marketing
   │
   └── Create Workspace "Client Projects"
       ├── Assign Manager: "charlie@techcorp.com"
       └── Template: Client Delivery

4. Employee Onboarding (COMPANY_ADMIN)
   ├── Add Employee: "david@techcorp.com" (EMPLOYEE)
   └── Assign to default workspace "General"

5. Workspace Assignment (WORKSPACE_MANAGER)
   ├── Development Manager adds david to Development workspace
   ├── Set role: "Frontend Developer"
   └── David can now access Development workspace projects

6. Project Creation (WORKSPACE_MANAGER)
   ├── Development Manager creates "Mobile App 2024"
   ├── Assign Project Lead: "emma@techcorp.com"
   └── Add Team Members from workspace

7. Task Assignment (Project Lead)
   ├── Create tasks for team members
   └── Track progress within workspace

8. Cross-Workspace Access
   ├── David works in Development and General workspaces
   ├── Can switch between workspaces in UI
   └── Sees only projects from assigned workspaces
```
---
### Module Hierarchy
---

# 🎓 **कॉलेज प्रोजेक्ट: एंटरप्राइज मैनेजमेंट सिस्टम (सिम्प्लिफाइड)**

## 📋 **चुने गए मॉड्यूल (Selected Modules)**

मैंने सिर्फ **3 मुख्य मॉड्यूल** रखे हैं जो आपस में जुड़े हुए हैं और प्रभावशाली दिखेंगे:

```
ENTERPRISE MANAGEMENT SYSTEM
├── 1. COMPANY MANAGEMENT (Super Admin)
├── 2. EMPLOYEE MANAGEMENT (HR)
└── 3. PROJECT & TASK MANAGEMENT (Workspace)
```

---

## 🏢 **1. COMPANY MANAGEMENT (Super Admin)**

```
COMPANY MANAGEMENT
├── 1.1 COMPANY REGISTRATION
│   ├── Company Name
│   ├── Admin Email
│   ├── Phone Number
│   └── Address
│
├── 1.2 COMPANY LIST
│   ├── View All Companies
│   ├── Search by Name
│   ├── Status (Active/Inactive)
│   └── Quick Actions (View/Edit/Delete)
│
└── 1.3 COMPANY DETAILS
    ├── Basic Info
    ├── Contact Details
    └── Company Status
```

**✅ क्या हटाया:**
- Domain Setup (बहुत टेक्निकल)
- Plan Assignment (सिम्पल स्टेटस रखा)
- Welcome Email Automation (बाद में जोड़ सकते हैं)
- Export/Bulk Actions

---

## 👥 **2. EMPLOYEE MANAGEMENT (HR)**

```
EMPLOYEE MANAGEMENT
├── 2.1 EMPLOYEE DIRECTORY
│   ├── Employee List
│   │   ├── Photo
│   │   ├── Name
│   │   ├── Department
│   │   ├── Designation
│   │   └── Status (Active/Inactive)
│   │
│   └── Search & Filter
│       ├── Search by Name/ID
│       ├── Filter by Department
│       └── Filter by Status
│
├── 2.2 EMPLOYEE PROFILE
│   ├── Personal Information
│   │   ├── Full Name & Photo
│   │   ├── Date of Birth
│   │   ├── Gender
│   │   ├── Email & Phone
│   │   └── Address
│   │
│   └── Professional Information
│       ├── Employee ID
│       ├── Department
│       ├── Designation
│       ├── Date of Joining
│       ├── Reporting Manager
│       └── Employment Type
│
└── 2.3 DEPARTMENT MANAGEMENT
    ├── Department List
    ├── Add/Edit Department
    └── Department Head
```

**✅ क्या हटाया:**
- Blood Group, Marital Status (अनावश्यक)
- Emergency Contact (प्राइवेसी इश्यू)
- Permanent/Current Address (सिर्फ एक एड्रेस)
- Skills Search (कॉम्प्लेक्स)
- System Access/Login Details (अलग से यूजर टेबल)

---

## 📊 **3. PROJECT & TASK MANAGEMENT**

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

**✅ क्या हटाया:**
- Workspace Concept (सीधे प्रोजेक्ट से शुरू)
- Multiple Views (सिर्फ लिस्ट व्यू)
- Time Tracking (कॉम्प्लेक्स)
- Checklists (सिर्फ टास्क)
- Tags/Labels
- Task Operations (Duplicate/Move/Copy)
- Advanced Reports
- Team Tasks Section

---

## 🗄️ **डेटाबेस स्ट्रक्चर (सिम्पल)**

```sql
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
    company_id INT,
    name VARCHAR(100) NOT NULL,
    head_id INT NULL,
    FOREIGN KEY (company_id) REFERENCES companies(id)
);

-- 3. Employees Table
CREATE TABLE employees (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT,
    employee_id VARCHAR(50) UNIQUE,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    email VARCHAR(100),
    phone VARCHAR(20),
    photo VARCHAR(255),
    dob DATE,
    gender ENUM('Male', 'Female', 'Other'),
    address TEXT,
    department_id INT,
    designation VARCHAR(100),
    joining_date DATE,
    reporting_manager INT NULL,
    employment_type ENUM('Full-time', 'Part-time', 'Contract'),
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    FOREIGN KEY (company_id) REFERENCES companies(id),
    FOREIGN KEY (department_id) REFERENCES departments(id),
    FOREIGN KEY (reporting_manager) REFERENCES employees(id)
);

-- 4. Projects Table
CREATE TABLE projects (
    id INT PRIMARY KEY AUTO_INCREMENT,
    company_id INT,
    name VARCHAR(200),
    description TEXT,
    start_date DATE,
    end_date DATE,
    manager_id INT,
    status ENUM('Active', 'Completed', 'On Hold') DEFAULT 'Active',
    progress INT DEFAULT 0,
    FOREIGN KEY (company_id) REFERENCES companies(id),
    FOREIGN KEY (manager_id) REFERENCES employees(id)
);

-- 5. Project Team Table
CREATE TABLE project_team (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT,
    employee_id INT,
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

-- 6. Tasks Table
CREATE TABLE tasks (
    id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT,
    title VARCHAR(200),
    description TEXT,
    assignee_id INT,
    due_date DATE,
    priority ENUM('High', 'Medium', 'Low') DEFAULT 'Medium',
    status ENUM('Todo', 'Doing', 'Done') DEFAULT 'Todo',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (assignee_id) REFERENCES employees(id)
);

-- 7. Task Attachments Table
CREATE TABLE task_attachments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    task_id INT,
    file_name VARCHAR(255),
    file_path VARCHAR(255),
    uploaded_by INT,
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id),
    FOREIGN KEY (uploaded_by) REFERENCES employees(id)
);

-- 8. Task Comments Table
CREATE TABLE task_comments (
    id INT PRIMARY KEY AUTO_INCREMENT,
    task_id INT,
    employee_id INT,
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(id),
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

-- 9. Users Table (Login)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT UNIQUE,
    username VARCHAR(50) UNIQUE,
    password VARCHAR(255),
    role ENUM('Super Admin', 'Company Admin', 'Manager', 'Employee') DEFAULT 'Employee',
    last_login TIMESTAMP NULL,
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);
```

---

## 🎨 **प्रोजेक्ट की मुख्य विशेषताएं**

### **टेक स्टैक सुझाव:**
- **Frontend:** HTML, CSS, JavaScript, Bootstrap (सिम्पल और अट्रैक्टिव)
- **Backend:** PHP (Core PHP या Laravel) या Python (Django/Flask)
- **Database:** MySQL
- **Features:** 
  - Login/Logout System
  - Role-based Access
  - File Upload (Attachments)
  - AJAX for better UX

### **यूजर रोल्स:**
1. **Super Admin** - सब कुछ देख सकता है
2. **Company Admin** - अपनी कंपनी के एम्प्लॉई और प्रोजेक्ट मैनेज कर सकता है
3. **Manager** - प्रोजेक्ट और टास्क बना सकता है, टीम असाइन कर सकता है
4. **Employee** - अपने टास्क देख और अपडेट कर सकता है

### **यूआई फीचर्स:**
- डैशबोर्ड with Charts (Chart.js)
- Responsive Design (Mobile Friendly)
- Profile Pages with Photo Upload
- Search and Filter Options
- Status Badges (Active/Inactive, Priority)

---

## ⏱️ **डेवलपमेंट टाइमलाइन (3 महीने)**

| Week | Work |
|------|------|
| 1-2 | Database Design, Login System |
| 3-4 | Company & Employee Management |
| 5-6 | Department & Project Management |
| 7-8 | Task Management |
| 9-10 | Dashboard & Reports |
| 11-12 | Testing, Documentation, Presentation |

---

## 🌟 **यह प्रोजेक्ट क्यों अच्छा है?**

1. **कम्प्लीट सिस्टम** - तीनों मॉड्यूल आपस में जुड़े हैं
2. **प्रैक्टिकल यूज** - रियल कंपनियों में ऐसे ही सिस्टम use होते हैं
3. **स्कोप फॉर इंप्रूवमेंट** - बेस प्रोजेक्ट तैयार है, फ्यूचर में और फीचर जोड़ सकते हैं
4. **इम्प्रेसिव फीचर्स** - Role-based Access, File Upload, Comments, Dashboard
5. **डॉक्यूमेंटेशन** - SRS, ER Diagram, Use Case Diagrams बना सकते हैं

---

**क्या आप चाहते हैं कि मैं:**
1. **इसका SRS (Software Requirement Specification) डॉक्यूमेंट तैयार करूं?**
2. **स्क्रीन्स के मॉकअप्स बनाऊं?**
3. **प्रेजेंटेशन के लिए पॉइंट्स तैयार करूं?**