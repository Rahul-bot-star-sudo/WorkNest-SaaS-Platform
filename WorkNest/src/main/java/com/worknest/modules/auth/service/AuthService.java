package com.worknest.modules.auth.service;

import org.springframework.stereotype.Service;
import com.worknest.modules.auth.repository.UserRepository;
// ==============================
// STEP 5: Create Service Layer
// MICRO-STEPS:
// 1. Create class AuthService   <-- CURRENT STEP
// 2. Add @Service annotation
// 3. Inject UserRepository
// 4. Create registerSuperAdmin() method
// ==============================

// ==============================
// STEP 6: Password Hashing
// MICRO-STEPS:
// 1. Inject PasswordEncoder
// 2. Encode password before saving
// ==============================

// ==============================
// STEP 7: Validation
// MICRO-STEPS:
// 1. Check if SUPER_ADMIN exists
// 2. Throw exception if exists
// ==============================

@Service // mark this class as spring bean
public class AuthService {
    private final UserRepository userRepository; // inject dependacy
    
    // constructor Injection
    public AuthService(UserRepository userRepository){
        this.userRepository = userRepository;
    }
}
