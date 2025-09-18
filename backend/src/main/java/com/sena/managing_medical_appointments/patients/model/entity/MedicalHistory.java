package com.sena.managing_medical_appointments.patients.entity;

import com.sena.managing_medical_appointments.shared.BaseEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@Entity
@Table(name = "medical_history", schema = "patients_schema")
@Data
@EqualsAndHashCode(callSuper = true)
public class MedicalHistory extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    @Schema(description = "Associated patient")
    private Patient patient;

    @Column(name = "description", nullable = false, columnDefinition = "TEXT")
    @Schema(description = "Medical history description", example = "Patient had surgery in 2020")
    private String description;

    @Column(name = "date", nullable = false)
    @Schema(description = "Date of the medical record", example = "2023-10-01T10:00:00")
    private LocalDateTime date;
}