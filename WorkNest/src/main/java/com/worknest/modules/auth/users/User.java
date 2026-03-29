package com.worknest.modules.auth.users;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

// ==============================
// STEP 1: Create User Entity
// MICRO-STEPS:
// 1. Create class User
// 2. Add @Entity annotation
// 3. Add id field
// 4. Add @GeneratedValue
// 5. Add email field
// 6. Add password field
// 7. Add role field   <-- CURRENT STEP
// ==============================

// ==============================
// STEP 2: Add Role Mapping
// MICRO-STEPS:
// 1. Create Role enum
// 2. Link role with User using @Enumerated
// ==============================

@Entity // 2. Add @Entity annotation
public class User { // 1. Create class User

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)// 4. Add @GeneratedValue
    private Long id;// 3. Add id field

    private String email;// 5. Add email field

    private String password;// 6. Add password field

    private Role role;// 7. Add role field

}