// ==============================
// API RESPONSE DTO
// package: com.worknest.modules.common.dto
// ==============================

package com.worknest.modules.users.dto;

public class ApiResponse {

    private String message;

    public ApiResponse(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}