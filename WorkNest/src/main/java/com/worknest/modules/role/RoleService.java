package com.worknest.modules.role;

import java.util.List;

import org.springframework.stereotype.Service;

import com.worknest.modules.auth.users.Role;
import com.worknest.modules.auth.users.RoleRepository;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }
}