package com.worknest.modules.superadmin;

import org.springframework.data.jpa.repository.JpaRepository;

/*
Algorithm Mapping

Step 7: Repository interacts with database
Step 7: Save SuperAdmin into PostgreSQL
*/

public interface SuperAdminRepository
        extends JpaRepository<SuperAdmin, Long> {
}