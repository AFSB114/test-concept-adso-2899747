package com.sena.managing_medical_appointments.security.model.dto.req;

import com.sena.managing_medical_appointments.shared.BaseRequestDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class UserRequestDTO extends BaseRequestDTO {

    @Schema(description = "User's username", example = "john_doe")
    private String username;

    @Schema(description = "User's password", example = "password123")
    private String password;

    @Schema(description = "Role ID", example = "1")
    private Long roleId;

    @Schema(description = "Whether the user is active", example = "true")
    private Boolean active = true;
}