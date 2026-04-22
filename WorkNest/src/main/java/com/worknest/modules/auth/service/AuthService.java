package com.worknest.modules.auth.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.worknest.config.JwtUtil;
import com.worknest.modules.auth.dto.LoginRequest;
import com.worknest.modules.auth.dto.LoginResponseDTO;
import com.worknest.modules.auth.dto.RegisterRequest;
import com.worknest.modules.auth.dto.UserResponseDTO;
import com.worknest.modules.auth.users.Role;
import com.worknest.modules.auth.users.RoleRepository;
import com.worknest.modules.auth.users.RoleType;
import com.worknest.modules.auth.users.User;
import com.worknest.modules.auth.users.UserRepository;
import com.worknest.modules.exception.InvalidPasswordException;
import com.worknest.modules.exception.SuperAdminAlreadyExistsException;
import com.worknest.modules.exception.UserNotFoundException;


@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AuthService(UserRepository userRepository,
            RoleRepository roleRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }
    @Transactional
    public UserResponseDTO registerSuperAdmin(RegisterRequest request) {
        // This part of the code in the `registerSuperAdmin` method of the `AuthService` class is responsible
        // for registering a new Super Admin user. Here's a breakdown of what each step is doing:

        // 1️⃣ Get role from DB
        Role superAdminRole = roleRepository.findByName(RoleType.SUPER_ADMIN)
                .orElseThrow(() -> new RuntimeException("SUPER_ADMIN role not found"));

        // 2️⃣ Check if already exists
        if (userRepository.existsByRole(superAdminRole)) {
            throw new SuperAdminAlreadyExistsException("Super Admin already exists");
        }

        // 3️⃣ Create user
        User user = new User();
        user.setEmail(request.getEmail());

        // ✅ Encode password (IMPORTANT)
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setRole(superAdminRole);

        User savedUser = userRepository.save(user);

        // 4️⃣ Return DTO
        return new UserResponseDTO(
                savedUser.getEmail(),
                savedUser.getRole().getName().name()
        );
    }

    public LoginResponseDTO login(LoginRequest request) {
        // 1. Fetch user
        User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new UserNotFoundException("User not found"));

        // 2. Check password
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new InvalidPasswordException("Invalid password");
        }
        
  
        // 4. Get role
        String role = user.getRole().getName().name();



        // 3️⃣ Dummy token
        String token = jwtUtil.generateToken(user.getEmail(), role);
        
        
        // 5️⃣ Return DTO
        return new LoginResponseDTO(token, role, user.getEmail());
    }

}
