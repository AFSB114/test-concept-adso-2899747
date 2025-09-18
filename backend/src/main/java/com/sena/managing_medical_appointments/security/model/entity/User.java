package com.sena.managing_medical_appointments.security.model.entity;

import com.sena.managing_medical_appointments.doctors.model.entity.Doctor;
import com.sena.managing_medical_appointments.parameterization.model.entity.Role;
import com.sena.managing_medical_appointments.patients.model.entity.Patient;
import com.sena.managing_medical_appointments.shared.BaseEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "user", schema = "security_schema")
@Data
@EqualsAndHashCode(callSuper = true)
public class User extends BaseEntity {

    @Column(name = "username", nullable = false, length = 50)
    @Schema(description = "User's username", example = "john_doe")
    private String username;

    @Column(name = "password", nullable = false, length = 255)
    @Schema(description = "User's password (hashed)", example = "$2a$10$...")
    private String password;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "role_id", nullable = false)
    @Schema(description = "User's role")
    private Role role;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id")
    @Schema(description = "Associated patient (if applicable)")
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id")
    @Schema(description = "Associated doctor (if applicable)")
    private Doctor doctor;

    @Column(name = "active", nullable = false)
    @Schema(description = "Whether the user is active", example = "true")
    private Boolean active = true;
}