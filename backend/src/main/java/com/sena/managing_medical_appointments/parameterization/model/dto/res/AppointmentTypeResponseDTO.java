package com.sena.managing_medical_appointments.parameterization.model.dto.res;

import com.sena.managing_medical_appointments.shared.BaseResponseDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class AppointmentTypeResponseDTO extends BaseResponseDTO {

    @Schema(description = "Appointment type name", example = "Consultation")
    private String name;

    @Schema(description = "Appointment type description", example = "General medical consultation")
    private String description;
}