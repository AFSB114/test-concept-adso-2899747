package com.sena.managing_medical_appointments.appointments.model.entity;

import com.sena.managing_medical_appointments.shared.BaseEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "hospital", schema = "appointments_schema")
@Data
@EqualsAndHashCode(callSuper = true)
public class Hospital extends BaseEntity {

    @Column(name = "name", nullable = false, length = 200)
    @Schema(description = "Hospital name", example = "General Hospital")
    private String name;

    @Column(name = "address", columnDefinition = "TEXT")
    @Schema(description = "Hospital address", example = "123 Main St, City, Country")
    private String address;
}