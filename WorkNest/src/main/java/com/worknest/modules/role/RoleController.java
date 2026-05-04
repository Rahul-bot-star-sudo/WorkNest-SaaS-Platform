package com.worknest.modules.role;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.worknest.modules.auth.users.Role;
import com.worknest.modules.role.dto.RoleResponse;

@RestController
@RequestMapping("/api/v1/roles")
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    @GetMapping
    public List<RoleResponse> getRoles() {
        return roleService.getAllRoles();
    }
}