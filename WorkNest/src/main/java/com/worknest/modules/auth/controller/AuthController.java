package com.worknest.modules.auth.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.worknest.modules.auth.dto.LoginRequest;
import com.worknest.modules.auth.dto.LoginResponseDTO;
import com.worknest.modules.auth.dto.RegisterRequest;
import com.worknest.modules.auth.dto.UserResponseDTO;
import com.worknest.modules.auth.service.AuthService;

import jakarta.validation.Valid;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/super-admin/register")
    public UserResponseDTO registerSuperAdmin(@RequestBody RegisterRequest request) {
        return authService.registerSuperAdmin(request);
    }

    @PostMapping("/login")
    public LoginResponseDTO login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }
}
