package com.sena.managing_medical_appointments.parameterization.model.entity;

import com.sena.managing_medical_appointments.shared.BaseEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "specialty", schema = "parameterization_schema")
@Data
@EqualsAndHashCode(callSuper = true)
public class Specialty extends BaseEntity {

    @Column(name = "name", nullable = false, length = 100)
    @Schema(description = "Specialty name", example = "Cardiology")
    private String name;

    @Column(name = "description", columnDefinition = "TEXT")
    @Schema(description = "Specialty description", example = "Study and treatment of heart diseases")
    private String description;
}