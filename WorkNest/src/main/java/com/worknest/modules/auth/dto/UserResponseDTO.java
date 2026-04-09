package com.worknest.modules.auth.dto;

public class UserResponseDTO {

    private String email;
    private String role;

    public UserResponseDTO(String email, String role) {

        this.email = email;
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public String getRole() {
        return role;
    }
}
