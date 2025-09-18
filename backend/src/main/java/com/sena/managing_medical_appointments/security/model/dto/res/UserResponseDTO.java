package com.sena.managing_medical_appointments.security.model.dto.res;

import com.sena.managing_medical_appointments.shared.BaseResponseDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class UserResponseDTO extends BaseResponseDTO {

    @Schema(description = "User's username", example = "john_doe")
    private String username;

    @Schema(description = "Role ID", example = "1")
    private Long roleId;

    @Schema(description = "Whether the user is active", example = "true")
    private Boolean active;
}