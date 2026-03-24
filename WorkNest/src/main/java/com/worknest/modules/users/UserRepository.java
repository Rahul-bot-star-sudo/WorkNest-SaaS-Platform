package com.worknest.modules.users;

import org.springframework.data.jpa.repository.JpaRepository;

// Step 8: Repository Layer (DB interaction)
public interface UserRepository extends JpaRepository<User, Long> {

    // Step 4.2: Check existence of SUPER_ADMIN
    boolean existsByRole_Name(String name);
}