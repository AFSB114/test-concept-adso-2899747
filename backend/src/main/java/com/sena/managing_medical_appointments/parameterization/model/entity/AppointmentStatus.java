package com.sena.managing_medical_appointments.parameterization.model.entity;

import com.sena.managing_medical_appointments.shared.BaseEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "appointment_status", schema = "parameterization_schema")
@Data
@EqualsAndHashCode(callSuper = true)
public class AppointmentStatus extends BaseEntity {

    @Column(name = "name", nullable = false, length = 50)
    @Schema(description = "Appointment status name", example = "SCHEDULED")
    private String name;
}