package com.sena.managing_medical_appointments.appointments.model.entity;

import com.sena.managing_medical_appointments.doctors.model.entity.Doctor;
import com.sena.managing_medical_appointments.parameterization.model.entity.AppointmentStatus;
import com.sena.managing_medical_appointments.parameterization.model.entity.AppointmentType;
import com.sena.managing_medical_appointments.patients.model.entity.Patient;
import com.sena.managing_medical_appointments.shared.BaseEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "appointment", schema = "appointments_schema")
@Data
@EqualsAndHashCode(callSuper = true)
public class Appointment extends BaseEntity {

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "patient_id", nullable = false)
    @Schema(description = "Associated patient")
    private Patient patient;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "doctor_id", nullable = false)
    @Schema(description = "Associated doctor")
    private Doctor doctor;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    @Schema(description = "Associated room")
    private Room room;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "appointment_type_id", nullable = false)
    @Schema(description = "Appointment type")
    private AppointmentType appointmentType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "status_id", nullable = false)
    @Schema(description = "Appointment status")
    private AppointmentStatus status;

    @Column(name = "date", nullable = false)
    @Schema(description = "Appointment date", example = "2023-10-01")
    private LocalDate date;

    @Column(name = "time", nullable = false)
    @Schema(description = "Appointment time", example = "10:00:00")
    private LocalTime time;
}