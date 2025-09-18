package com.sena.managing_medical_appointments.patients.model.dto.req;

import com.sena.managing_medical_appointments.shared.BaseRequestDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;

@Data
@EqualsAndHashCode(callSuper = true)
public class MedicalHistoryRequestDTO extends BaseRequestDTO {

    @Schema(description = "Patient ID associated with the medical history", example = "1")
    private Long patientId;

    @Schema(description = "Medical history description", example = "Patient had surgery in 2020")
    private String description;

    @Schema(description = "Date of the medical record", example = "2023-10-01T10:00:00")
    private LocalDateTime date;
}