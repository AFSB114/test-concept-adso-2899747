package com.sena.managing_medical_appointments.doctors.entity;

import com.sena.managing_medical_appointments.shared.BaseEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "shift", schema = "doctors_schema")
@Data
@EqualsAndHashCode(callSuper = true)
public class Shift extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    @Schema(description = "Associated doctor")
    private Doctor doctor;

    @Column(name = "date", nullable = false)
    @Schema(description = "Shift date", example = "2023-10-01")
    private LocalDate date;

    @Column(name = "start_time", nullable = false)
    @Schema(description = "Shift start time", example = "09:00:00")
    private LocalTime startTime;

    @Column(name = "end_time", nullable = false)
    @Schema(description = "Shift end time", example = "17:00:00")
    private LocalTime endTime;
}