// ==============================
// USER SERVICE
// package: com.worknest.modules.users
// ==============================

package com.worknest.modules.users;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.worknest.modules.users.dto.ApiResponse;
import com.worknest.modules.role.Role;
import com.worknest.modules.role.RoleRepository;
import com.worknest.modules.role.RoleType;
import com.worknest.modules.users.dto.CreateUserRequestDto;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(
            UserRepository userRepository,
            RoleRepository roleRepository,
            PasswordEncoder passwordEncoder) {

        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public ApiResponse createUser(CreateUserRequestDto dto) {

        // CHECK EMAIL
        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        // GET ROLE
        Role role = roleRepository.findById(dto.getRoleId())
                .orElseThrow(() -> new RuntimeException("Role not found"));

        // CHECK SUPER ADMIN
        if (role.getName() == RoleType.SUPER_ADMIN
                && userRepository.existsByRole_Name(RoleType.SUPER_ADMIN)) {

            throw new RuntimeException("SUPER_ADMIN already exists");
        }

        // CREATE USER
        User user = new User();

        user.setEmail(dto.getEmail());

        // PASSWORD ENCODE
        user.setPassword(passwordEncoder.encode(dto.getPassword()));

        user.setRole(role);

        // SAVE
        userRepository.save(user);

        return new ApiResponse("User created successfully");
    }
}