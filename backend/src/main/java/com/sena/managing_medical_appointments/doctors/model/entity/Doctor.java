package com.sena.managing_medical_appointments.doctors.model.entity;

import com.sena.managing_medical_appointments.parameterization.model.entity.Specialty;
import com.sena.managing_medical_appointments.shared.BaseEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "doctor", schema = "doctors_schema")
@Data
@EqualsAndHashCode(callSuper = true)
public class Doctor extends BaseEntity {

    @Column(name = "name", nullable = false, length = 100)
    @Schema(description = "Doctor's first name", example = "Dr. Jane")
    private String name;

    @Column(name = "last_name", nullable = false, length = 100)
    @Schema(description = "Doctor's last name", example = "Smith")
    private String lastName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "specialty_id", nullable = false)
    @Schema(description = "Doctor's specialty")
    private Specialty specialty;

    @Column(name = "phone", length = 20)
    @Schema(description = "Doctor's phone number", example = "+1234567890")
    private String phone;

    @Column(name = "email", length = 150)
    @Schema(description = "Doctor's email address", example = "jane.smith@example.com")
    private String email;
}