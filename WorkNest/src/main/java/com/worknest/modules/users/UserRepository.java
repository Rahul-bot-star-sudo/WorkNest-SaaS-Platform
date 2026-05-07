// ==============================
// USER REPOSITORY
// package: com.worknest.modules.users
// ==============================

package com.worknest.modules.users;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

import com.worknest.modules.role.Role;
import com.worknest.modules.role.RoleType;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);

    boolean existsByRole(Role role);

    boolean existsByRole_Name(RoleType name);
}