package com.worknest.modules.superadmin;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/*
Algorithm Mapping

Step 1: Client sends HTTP request
Step 2: Controller receives request
Step 3: Controller calls service layer
Step 8: Controller returns response
*/

@RestController
@RequestMapping("/superadmin")
public class SuperAdminController {

    private final SuperAdminService service;

    public SuperAdminController(SuperAdminService service) {
        this.service = service;
    }

    @PostMapping
    public SuperAdmin create(@RequestBody SuperAdmin admin){

        // Step 3: call service
        return service.createSuperAdmin(admin);
    }
}