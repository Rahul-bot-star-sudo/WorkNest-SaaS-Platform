// ==============================
// CREATE USER REQUEST DTO
// package: com.worknest.modules.users.dto
// ==============================

package com.worknest.modules.users.dto;

public class CreateUserRequestDto {

    private String email;
    private String password;
    private Long roleId;

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }
}