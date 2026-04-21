package com.worknest.modules.company;

import org.springframework.stereotype.Service;
@Service
public class CompanyService {

    private final CompanyRepository companyRepository;

    public CompanyService(CompanyRepository companyRepository){
        this.companyRepository = companyRepository;
    }
    public String createCompany(String name){
        boolean exists = companyRepository.existsByName(name);
        if (exists){
            throw new RuntimeException("Company already exists");
        }

        Company company = new Company();
        company.setName(name);

        companyRepository.save(company);

        companyRepository.save(company);
        return "Company created sucessfully";
    }
}
