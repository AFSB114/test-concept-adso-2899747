package com.sena.managing_medical_appointments.parameterization.model.entity;

import com.sena.managing_medical_appointments.shared.BaseEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "appointment_type", schema = "parameterization_schema")
@Data
@EqualsAndHashCode(callSuper = true)
public class AppointmentType extends BaseEntity {

    @Column(name = "name", nullable = false, length = 100)
    @Schema(description = "Appointment type name", example = "Consultation")
    private String name;

    @Column(name = "description", columnDefinition = "TEXT")
    @Schema(description = "Appointment type description", example = "General medical consultation")
    private String description;
}