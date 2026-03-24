package com.worknest.modules.users;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// Controller Layer
@RestController
@RequestMapping("/super-admin")
public class UserController {

    private final UserService service;

    // Constructor Injection
    public UserController(UserService service) {
        this.service = service;
    }

    // POST → /super-admin/register
    @PostMapping("/register")
    public ResponseEntity<?> registerSuperAdmin(@RequestBody User admin) {

        try {
            User savedAdmin = service.createSuperAdmin(admin);

            // ✅ Return 201 CREATED (better than 200)
            return ResponseEntity.status(HttpStatus.CREATED).body(savedAdmin);

        } catch (Exception e) {

            // ✅ Better error message
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Error: " + e.getMessage());
        }
    }
}