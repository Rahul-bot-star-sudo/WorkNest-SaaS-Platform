package com.worknest.modules.auth.users;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(unique = true, nullable = false)
    private RoleType name;

    // ✅ CORRECT GETTER
    public RoleType getName() {
        return name;
    }

    // ✅ CORRECT SETTER
    public void setName(RoleType name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }
}