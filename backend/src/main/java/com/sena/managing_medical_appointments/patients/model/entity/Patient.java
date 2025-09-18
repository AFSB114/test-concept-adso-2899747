package com.sena.managing_medical_appointments.patients.model.entity;

import com.sena.managing_medical_appointments.shared.BaseEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;

@Entity
@Table(name = "patient", schema = "patients_schema")
@Data
@EqualsAndHashCode(callSuper = true)
public class Patient extends BaseEntity {

    @Column(name = "name", nullable = false, length = 100)
    @Schema(description = "Patient's first name", example = "John")
    private String name;

    @Column(name = "last_name", nullable = false, length = 100)
    @Schema(description = "Patient's last name", example = "Doe")
    private String lastName;

    @Column(name = "birth_date")
    @Schema(description = "Patient's birth date", example = "1990-01-01")
    private LocalDate birthDate;

    @Column(name = "phone", length = 20)
    @Schema(description = "Patient's phone number", example = "+1234567890")
    private String phone;

    @Column(name = "email", length = 150)
    @Schema(description = "Patient's email address", example = "john.doe@example.com")
    private String email;
}