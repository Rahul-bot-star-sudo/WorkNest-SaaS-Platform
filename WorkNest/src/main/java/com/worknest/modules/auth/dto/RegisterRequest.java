package com.worknest.modules.auth.dto;

// ==============================
// STEP 3: Create DTO
// MICRO-STEPS:
// 1. Create class RegisterRequest   <-- CURRENT STEP
// 2. Add email field
// 3. Add password field
// 4. Add getters/setters
// ==============================

public class RegisterRequest {// 1. Create class RegisterRequest 
    private String email;
    private String password;

    // Getter for email
    public String getEmail(){
        return email;
    }

    // setter for email
    public void setEmail(String email){
        this.email=email;
    }

    // getter for password
    public String getPassword(){
        return password;
    }

    //setter for password
    public void setPassword(String password){
        this.password = password;
    }
}
