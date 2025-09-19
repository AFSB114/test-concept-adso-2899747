package com.sena.managing_medical_appointments.patients.model.entity;

import com.sena.managing_medical_appointments.security.model.entity.User;
import com.sena.managing_medical_appointments.shared.BaseEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;

@Entity
@Table(name = "patient", schema = "patients_schema")
@Data
@EqualsAndHashCode(callSuper = true)
public class Patient extends BaseEntity {

    @Column(name = "name", nullable = false, length = 100)
    @NotBlank(message = "Name cannot be blank")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    @Pattern(regexp = "^[a-zA-ZÀ-ÿ\\s]+$", message = "Name can only contain letters and spaces")
    @Schema(description = "Patient's first name", example = "John")
    private String name;

    @Column(name = "last_name", nullable = false, length = 100)
    @NotBlank(message = "Last name cannot be blank")
    @Size(min = 2, max = 100, message = "Last name must be between 2 and 100 characters")
    @Pattern(regexp = "^[a-zA-ZÀ-ÿ\\s]+$", message = "Last name can only contain letters and spaces")
    @Schema(description = "Patient's last name", example = "Doe")
    private String lastName;

    @Column(name = "birth_date")
    @Past(message = "Birth date must be in the past")
    @Schema(description = "Patient's birth date", example = "1990-01-01")
    private LocalDate birthDate;

    @Column(name = "phone", length = 20)
    @Pattern(regexp = "^\\+?[0-9\\s\\-\\(\\)]+$", message = "Phone number format is invalid")
    @Schema(description = "Patient's phone number", example = "+1234567890")
    private String phone;

    @Column(name = "email", length = 150)
    @Email(message = "Email format is invalid")
    @Schema(description = "Patient's email address", example = "john.doe@example.com")
    private String email;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @Schema(description = "Associated user for authentication")
    private User user;
}