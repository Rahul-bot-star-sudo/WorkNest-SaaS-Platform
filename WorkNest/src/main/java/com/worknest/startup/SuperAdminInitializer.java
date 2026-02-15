package com.worknest.startup;

import java.util.Optional;

import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.worknest.entity.Role;
import com.worknest.entity.User;
import com.worknest.repository.RoleRepository;
import com.worknest.repository.UserRepository;

@Component
public class SuperAdminInitializer implements ApplicationRunner {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    public SuperAdminInitializer(UserRepository userRepository,
                                 RoleRepository roleRepository,
                                 PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {

        Optional<Role> roleOptional = roleRepository.findByName("SUPER_ADMIN");

        if (roleOptional.isEmpty()) {
            System.out.println("SUPER_ADMIN role not found in database.");
            return;
        }

        Role superAdminRole = roleOptional.get();

        boolean exists = userRepository.findAll()
                .stream()
                .anyMatch(user -> user.getRoles().contains(superAdminRole));

        if (exists) {
            System.out.println("Super Admin already exists.");
            return;
        }

        User superAdmin = new User();
        superAdmin.setEmail("superadmin@worknest.com");
        superAdmin.setPassword(passwordEncoder.encode("Admin@123"));
        superAdmin.setIsActive(true);
        superAdmin.getRoles().add(superAdminRole);

        userRepository.save(superAdmin);

        System.out.println("Super Admin created successfully.");
    }
}
