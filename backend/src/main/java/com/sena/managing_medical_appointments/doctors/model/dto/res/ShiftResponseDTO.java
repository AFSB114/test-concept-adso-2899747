package com.sena.managing_medical_appointments.doctors.model.dto.res;

import com.sena.managing_medical_appointments.shared.BaseResponseDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@EqualsAndHashCode(callSuper = true)
public class ShiftResponseDTO extends BaseResponseDTO {

    @Schema(description = "Doctor's full name", example = "Dr. Jane Smith")
    private String doctorName;

    @Schema(description = "Shift date", example = "2023-10-01")
    private LocalDate date;

    @Schema(description = "Shift start time", example = "09:00:00")
    private LocalTime startTime;

    @Schema(description = "Shift end time", example = "17:00:00")
    private LocalTime endTime;
}