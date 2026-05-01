package com.worknest.modules.role;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.worknest.modules.auth.users.Role;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    public List<Role> getRoles() {
        System.out.println("API HIT");
        return roleService.getAllRoles();
    }
}