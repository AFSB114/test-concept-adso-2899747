package com.sena.managing_medical_appointments.appointments.model.dto.req;

import com.sena.managing_medical_appointments.shared.BaseRequestDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class HospitalRequestDTO extends BaseRequestDTO {

    @Schema(description = "Hospital name", example = "General Hospital")
    private String name;

    @Schema(description = "Hospital address", example = "123 Main St, City, Country")
    private String address;
}