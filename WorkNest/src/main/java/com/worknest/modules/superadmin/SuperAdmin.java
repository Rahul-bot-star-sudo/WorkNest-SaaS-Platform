package com.worknest.modules.superadmin;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

/*
Algorithm Mapping

Step 6: Service creates SuperAdmin object
Step 7: Repository saves object in PostgreSQL
This class represents database table
*/

@Entity
public class SuperAdmin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String email;

    private String password;

    // getter for id
    public Long getId() {
        return id;
    }

    // setter for id
    public void setId(Long id) {
        this.id = id;
    }

    // getter for name
    public String getName() {
        return name;
    }

    // setter for name
    public void setName(String name) {
        this.name = name;
    }

    // getter for email
    public String getEmail() {
        return email;
    }

    // setter for email
    public void setEmail(String email) {
        this.email = email;
    }

    // getter for password
    public String getPassword() {
        return password;
    }

    // setter for password
    public void setPassword(String password) {
        this.password = password;
    }
}