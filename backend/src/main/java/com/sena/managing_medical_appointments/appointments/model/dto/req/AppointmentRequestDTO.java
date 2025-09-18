package com.sena.managing_medical_appointments.appointments.model.dto.req;

import com.sena.managing_medical_appointments.shared.BaseRequestDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@EqualsAndHashCode(callSuper = true)
public class AppointmentRequestDTO extends BaseRequestDTO {

    @Schema(description = "Patient ID", example = "1")
    private Long patientId;

    @Schema(description = "Doctor ID", example = "1")
    private Long doctorId;

    @Schema(description = "Room ID", example = "1")
    private Long roomId;

    @Schema(description = "Appointment type ID", example = "1")
    private Long appointmentTypeId;

    @Schema(description = "Appointment status ID", example = "1")
    private Long statusId;

    @Schema(description = "Appointment date", example = "2023-10-01")
    private LocalDate date;

    @Schema(description = "Appointment time", example = "10:00:00")
    private LocalTime time;
}