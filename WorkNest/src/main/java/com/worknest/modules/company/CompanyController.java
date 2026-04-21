package com.worknest.modules.company;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.worknest.modules.company.dto.ApiResponse;
import com.worknest.modules.company.dto.CompanyRequest;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/")
public class CompanyController {

    private final CompanyService companyService;

    public  CompanyController(CompanyService companyService) {
        this.companyService = companyService;
    }

    @PostMapping("/company")
    public ResponseEntity<ApiResponse> createCompany(@Valid @RequestBody CompanyRequest request) {
        companyService.createCompany(request.getName());
        ApiResponse response = new ApiResponse("success", "Company created successfully");
        return ResponseEntity.status(201).body(response);
    }
}
