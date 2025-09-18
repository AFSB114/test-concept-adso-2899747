package com.sena.managing_medical_appointments.appointments.model.entity;

import com.sena.managing_medical_appointments.shared.BaseEntity;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "room", schema = "appointments_schema")
@Data
@EqualsAndHashCode(callSuper = true)
public class Room extends BaseEntity {

    @Column(name = "name", nullable = false, length = 100)
    @Schema(description = "Room name", example = "Room 101")
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hospital_id", nullable = false)
    @Schema(description = "Associated hospital")
    private Hospital hospital;
}