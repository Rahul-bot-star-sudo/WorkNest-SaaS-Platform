package com.worknest.modules.auth.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.worknest.modules.auth.users.User;
import com.worknest.modules.auth.service.AuthService;

// ==============================
// STEP 8: Create Controller Layer
// MICRO-STEPS:
// 1. Create class AuthController
// 2. Add @RestController (mark as API controller)
// 3. Add @RequestMapping("/auth") (base URL)
// ==============================

// ==============================
// STEP 9: Create API Endpoint
// MICRO-STEPS:
// 1. Inject AuthService
// 2. Add POST mapping /register-super-admin
// 3. Accept request body (User)
// 4. Call service layer
// 5. Return response (JSON)
// ==============================

@RestController // ✅ Marks this class as REST API controller (returns JSON)
@RequestMapping("/auth") // ✅ Base URL for all endpoints → /auth
public class AuthController {

    // ==============================
    // STEP 9.1: Dependency Injection
    // ==============================

    private final AuthService authService; // Service layer reference

    // ✅ Constructor Injection (Recommended)
    public AuthController(AuthService authService){
        this.authService = authService;
    }

    // ==============================
    // STEP 9.2: Create POST API
    // ==============================

    @PostMapping("/register-super-admin") // ✅ Endpoint → POST /auth/register-super-admin
    public User registerSuperAdmin(@RequestBody User user) {

        // ==============================
        // STEP 9.3: Call Service Layer
        // ==============================
        User savedUser = authService.registerSuperAdmin(user);

        // ==============================
        // STEP 9.4: Return Response
        // ==============================
        return savedUser; // automatically converted to JSON
    }
}