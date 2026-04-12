package com.worknest.modules.auth.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.worknest.modules.auth.dto.RegisterRequest;
import com.worknest.modules.auth.dto.UserResponseDTO;
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
        return authService.registerSuperAdmin(request);
    }
}