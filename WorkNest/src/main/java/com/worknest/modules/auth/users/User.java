package com.worknest.modules.auth.users;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

// ==============================
// STEP 1: Create User Entity
// MICRO-STEPS:
// 1. Create class User
// 2. Add @Entity annotation
// 3. Add id field   <-- CURRENT STEP
// 4. Add email field
// 5. Add password field
// 6. Add role field
// ==============================

// ==============================
// STEP 2: Add Role Mapping
// MICRO-STEPS:
// 1. Create Role enum
// 2. Link role with User using @Enumerated
// ==============================

@Entity
public class User {

    @Id
    private Long id;

}