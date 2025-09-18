package com.sena.managing_medical_appointments.doctors.model.dto.req;

import com.sena.managing_medical_appointments.shared.BaseRequestDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@EqualsAndHashCode(callSuper = true)
public class ShiftRequestDTO extends BaseRequestDTO {

    @Schema(description = "Doctor ID", example = "1")
    private Long doctorId;

    @Schema(description = "Shift date", example = "2023-10-01")
    private LocalDate date;

    @Schema(description = "Shift start time", example = "09:00:00")
    private LocalTime startTime;

    @Schema(description = "Shift end time", example = "17:00:00")
    private LocalTime endTime;
}