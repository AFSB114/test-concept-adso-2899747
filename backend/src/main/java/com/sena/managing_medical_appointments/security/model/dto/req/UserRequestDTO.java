package com.sena.managing_medical_appointments.security.model.dto.req;

import com.sena.managing_medical_appointments.shared.BaseRequestDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class UserRequestDTO extends BaseRequestDTO {

    @NotBlank(message = "Username cannot be blank")
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    @Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "Username can only contain letters, numbers, and underscores")
    @Schema(description = "User's username", example = "john_doe")
    private String username;

    @NotBlank(message = "Password cannot be blank")
    @Size(min = 8, max = 255, message = "Password must be between 8 and 255 characters")
    @Schema(description = "User's password", example = "password123")
    private String password;

    @NotNull(message = "Role ID cannot be null")
    @Positive(message = "Role ID must be positive")
    @Schema(description = "Role ID", example = "1")
    private Long roleId;

    @Schema(description = "Whether the user is active", example = "true")
    private Boolean active = true;
}