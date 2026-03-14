package com.worknest.modules.superadmin;

import org.springframework.stereotype.Service;

/*
Algorithm Mapping

Step 3: Controller calls service layer
Step 4: Service checks if SuperAdmin already exists
Step 5: If exists → stop creation
Step 6: If not exists → save SuperAdmin
*/

@Service
public class SuperAdminService {

    private final SuperAdminRepository repository;

    public SuperAdminService(SuperAdminRepository repository) {
        this.repository = repository;
    }

    public SuperAdmin createSuperAdmin(SuperAdmin admin){

        // Step 4: check if super admin already exists
        if(repository.count() > 0){

            // Step 5: stop creation
            return repository.findAll().get(0);
        }

        // Step 6: save new super admin
        return repository.save(admin);
    }
}