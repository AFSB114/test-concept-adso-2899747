package com.sena.managing_medical_appointments.parameterization.model.dto.req;

import com.sena.managing_medical_appointments.shared.BaseRequestDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class SpecialtyRequestDTO extends BaseRequestDTO {

    @Schema(description = "Specialty name", example = "Cardiology")
    private String name;

    @Schema(description = "Specialty description", example = "Study and treatment of heart diseases")
    private String description;
}