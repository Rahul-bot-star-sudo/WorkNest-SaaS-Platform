package com.worknest.modules.users;

import com.worknest.modules.roles.Role;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

// Step 10.5: Entity → Database table mapping
@Entity
@Table(name = "users")
public class User {

    // Step 10.7–10.8: Primary key (auto increment)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Step 10.9–10.11: Table columns
    private String name;
    private String email;
    private String password;

    // Step 10.12–10.13: Many users → One role (foreign key)
    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    // Getters & Setters (Step 10.14+)
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public Role getRole() { return role; }
    public void setRole(Role role) { this.role = role; }
}