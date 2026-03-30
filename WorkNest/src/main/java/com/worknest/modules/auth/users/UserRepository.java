package com.worknest.modules.auth.users;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

// ==============================
// STEP 4: Create Repository
// MICRO-STEPS:
// 1. Create interface UserRepository   <-- CURRENT STEP
// 2. Extend JpaRepository
// 3. Add method findByEmail()
// 4. Add method existsByRole()
// ==============================

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    boolean existsByRole(Role role);
}
