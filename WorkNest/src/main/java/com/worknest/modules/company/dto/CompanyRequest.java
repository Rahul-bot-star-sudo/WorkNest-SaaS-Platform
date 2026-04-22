package com.worknest.modules.company.dto;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@JsonIgnoreProperties(ignoreUnknown = false)
public class CompanyRequest {
    
    @NotBlank(message = "Company name is required")
    @Size(min = 3, max = 50, message = "Name must be 3 to 50 characters")
    private String name;

    public String getName(){
        return name;
    }

    public void setName(String name){
        this.name = name;
    }
}
