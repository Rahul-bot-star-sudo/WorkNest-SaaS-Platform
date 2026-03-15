package com.worknest.modules.users;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.worknest.modules.roles.Role;
import com.worknest.modules.roles.RoleRepository;

/*
SERVICE LOGIC

Step 5: Service receives request from controller

Step 6: Check if SuperAdmin already exists
        repository.count()

Step 7: If count > 0
        Stop creation

Step 8: If count == 0
        Continue creation

Step 9: Hash password

Step 10: Fetch SUPER_ADMIN role

Step 11: Assign role to admin

Step 12: Save SuperAdmin
 */
@Service
public class UserService {

    private final UserRepository repository;
    private final RoleRepository roleRepository;

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    // Constructor Injection
    public UserService(UserRepository repository,
            RoleRepository roleRepository) {
        this.repository = repository;
        this.roleRepository = roleRepository;
    }

    public User createSuperAdmin(User admin) {

        // Check if SUPER_ADMIN already exists
        if (repository.existsByRole_Name("SUPER_ADMIN")) {
            throw new IllegalStateException("Super Admin already exists");
        }

        // Hash password
        String hashedPassword = passwordEncoder.encode(admin.getPassword());
        admin.setPassword(hashedPassword);

        // Fetch SUPER_ADMIN role
        Role role = roleRepository.findByName("SUPER_ADMIN")
                .orElseThrow(() -> new RuntimeException("Role not found"));

        // Assign role
        admin.setRole(role);

        // Save user
        return repository.save(admin);
    }
}
