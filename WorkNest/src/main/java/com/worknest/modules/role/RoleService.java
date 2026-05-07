package com.worknest.modules.role;

import java.util.List;

import org.springframework.stereotype.Service;

import com.worknest.modules.role.RoleRepository;
import com.worknest.modules.role.dto.RoleResponse;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }


   public List<String> getAllRoleNames() {
    return roleRepository.findAll()
            .stream()
            .map(role -> role.getName().name())
            .toList();
}

public List<RoleResponse> getAllRoles() {
    return roleRepository.findAll()
            .stream()
            .map(role -> new RoleResponse(
                    role.getName().name()   // enum → string
            ))
            .toList();
}
}