package com.worknest.modules.users;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/*
ALGORITHM FLOW

Step 1: Client sends POST request from Postman
Step 2: Spring routes request to controller
Step 3: Controller converts JSON → SuperAdmin object
Step 4: Controller calls service layer
Step 12: Controller returns response to client
*/

@RestController
@RequestMapping("/superadmin")
public class UserController {

    private final UserService service;

    public UserController(UserService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> create(@RequestBody User admin){

        try{
            // Step 4: Call service layer
            User savedAdmin = service.createSuperAdmin(admin);

            // Step 12: Return success response
            return ResponseEntity.ok(savedAdmin);

        }catch (Exception e){

            // Return proper error instead of 500
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}