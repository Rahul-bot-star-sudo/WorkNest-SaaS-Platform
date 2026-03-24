package com.worknest.modules.users;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.worknest.modules.roles.Role;
import com.worknest.modules.roles.RoleRepository;

// Step 4: Service Layer (Business Logic)
@Service
public class UserService {

    // Step 4.2: Repository for DB operations
    private final UserRepository repository;

    // Step 6.1: Role repository for fetching role
    private final RoleRepository roleRepository;

    // Step 5.2: Password encoder (hashing)
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Step 4.1: Constructor Injection
    public UserService(UserRepository repository,
            RoleRepository roleRepository) {
        this.repository = repository;
        this.roleRepository = roleRepository;
    }

    // Step 4.1: Method called from Controller
    public User createSuperAdmin(User admin) {

        // Step 4.2: Check if SUPER_ADMIN exists
        if (repository.existsByRole_Name("SUPER_ADMIN")) {

            // Step 4.4: If exists → stop flow
            throw new IllegalStateException("Super Admin already exists");
        }

        // Step 5.1–5.4: Password hashing
        String hashedPassword = passwordEncoder.encode(admin.getPassword());
        admin.setPassword(hashedPassword);

        // Step 6.1–6.5: Fetch role from DB
        Role role = roleRepository.findByName("SUPER_ADMIN")
                .orElseThrow(() -> new RuntimeException("Role not found"));

        // Step 7.1–7.2: Assign role
        admin.setRole(role);

        // Step 8.1–8.3: Save user via repository
        return repository.save(admin);
    }
}