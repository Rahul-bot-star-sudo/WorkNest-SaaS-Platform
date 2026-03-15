package com.worknest.modules.users;

import org.springframework.data.jpa.repository.JpaRepository;

/*
REPOSITORY ROLE

Step 10: Repository communicates with database

Sub-step 10.1 → save(admin)
Sub-step 10.2 → JPA sends request to Hibernate
Sub-step 10.3 → Hibernate generates SQL query
Sub-step 10.4 → Database executes INSERT query
*/

public interface UserRepository extends JpaRepository<User, Long> {

    boolean existsByRole_Name(String name);
}