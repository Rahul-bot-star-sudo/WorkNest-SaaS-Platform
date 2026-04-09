package com.worknest.modules.auth.controller;

import org.springframework.web.bind.annotation.*;

import com.worknest.modules.auth.dto.UserResponseDTO;
import com.worknest.modules.auth.dto.RegisterRequest;
import com.worknest.modules.auth.service.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register-super-admin")
    public UserResponseDTO registerSuperAdmin(@RequestBody RegisterRequest request) {

        System.out.println("API HIT");

        return authService.registerSuperAdmin(request);
    }
}