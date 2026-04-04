package com.worknest.modules.auth.service;

import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.worknest.modules.auth.users.UserRepository;
import com.worknest.modules.auth.users.Role;
import com.worknest.modules.auth.users.User;

// ==============================
// STEP 5: Create Service Layer
// MICRO-STEPS:
// 1. Create class AuthService
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

    private final UserRepository userRepository; 
    private final PasswordEncoder passwordEncoder;

    // ✅ Correct Constructor Injection
    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // STEP 5.4 create method
    public User registerSuperAdmin(User user){

        // STEP 7.1 check existence 
        boolean exists = userRepository.existsByRole(Role.SUPER_ADMIN);

        // STEP 7.2 throw exception
        if (exists){
            throw new IllegalStateException("Super Admin already exists");
        }

        // STEP 6 password hashing
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        // ✅ Set role (important)
        user.setRole(Role.SUPER_ADMIN);

        // ✅ Save user in DB (FINAL STEP)
        return userRepository.save(user);
    }
}