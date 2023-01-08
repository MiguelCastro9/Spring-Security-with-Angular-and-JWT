package com.api.model;

import com.api.enums.RoleNome;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 *
 * @author Miguel Castro
 */
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class RoleModel {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(name = "role_nome", nullable = false)
    private RoleNome roleNome;

    public RoleModel(Long id, RoleNome roleNome) {
        this.id = id;
        this.roleNome = roleNome;
    }

    public RoleModel() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public RoleNome getRoleNome() {
        return roleNome;
    }

    public void setRoleNome(RoleNome roleNome) {
        this.roleNome = roleNome;
    }
}
