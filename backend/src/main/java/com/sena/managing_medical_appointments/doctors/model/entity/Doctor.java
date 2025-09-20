package com.sena.managing_medical_appointments.doctors.model.entity;

import com.sena.managing_medical_appointments.parameterization.model.entity.Specialty;
import com.sena.managing_medical_appointments.security.model.entity.User;
import com.sena.managing_medical_appointments.shared.BaseEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "doctor", schema = "doctors_schema")
@Data
@EqualsAndHashCode(callSuper = true)
public class Doctor extends BaseEntity {

    @Column(name = "name", nullable = false, length = 100)
    @NotBlank(message = "Name cannot be blank")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    @Pattern(regexp = "^[a-zA-ZÀ-ÿ\\s]+$", message = "Name can only contain letters and spaces")
    @Schema(description = "Doctor's first name", example = "Dr. Jane")
    private String name;

    @Column(name = "last_name", nullable = false, length = 100)
    @NotBlank(message = "Last name cannot be blank")
    @Size(min = 2, max = 100, message = "Last name must be between 2 and 100 characters")
    @Pattern(regexp = "^[a-zA-ZÀ-ÿ\\s]+$", message = "Last name can only contain letters and spaces")
    @Schema(description = "Doctor's last name", example = "Smith")
    private String lastName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "specialty_id", nullable = false)
    @Schema(description = "Doctor's specialty")
    private Specialty specialty;

    @Column(name = "phone", length = 20)
    @Pattern(regexp = "^\\+?[0-9\\s\\-\\(\\)]+$", message = "Phone number format is invalid")
    @Schema(description = "Doctor's phone number", example = "+1234567890")
    private String phone;

    @Column(name = "email", length = 150)
    @Email(message = "Email format is invalid")
    @Schema(description = "Doctor's email address", example = "jane.smith@example.com")
    private String email;
}