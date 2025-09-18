package com.sena.managing_medical_appointments.parameterization.model.dto.req;

import com.sena.managing_medical_appointments.shared.BaseRequestDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class RoleRequestDTO extends BaseRequestDTO {

    @Schema(description = "Role name", example = "ADMIN")
    private String name;
}