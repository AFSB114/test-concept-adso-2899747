package com.sena.managing_medical_appointments.patients.model.dto.req;

import com.sena.managing_medical_appointments.shared.BaseRequestDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;

@Data
@EqualsAndHashCode(callSuper = true)
public class PatientRequestDTO extends BaseRequestDTO {

    @NotBlank(message = "Name cannot be blank")
    @Size(min = 2, max = 100, message = "Name must be between 2 and 100 characters")
    @Pattern(regexp = "^[a-zA-ZÀ-ÿ\\s]+$", message = "Name can only contain letters and spaces")
    @Schema(description = "Patient's first name", example = "John")
    private String name;

    @NotBlank(message = "Last name cannot be blank")
    @Size(min = 2, max = 100, message = "Last name must be between 2 and 100 characters")
    @Pattern(regexp = "^[a-zA-ZÀ-ÿ\\s]+$", message = "Last name can only contain letters and spaces")
    @Schema(description = "Patient's last name", example = "Doe")
    private String lastName;

    @Past(message = "Birth date must be in the past")
    @Schema(description = "Patient's birth date", example = "1990-01-01")
    private LocalDate birthDate;

    @Pattern(regexp = "^\\+?[0-9\\s\\-\\(\\)]+$", message = "Phone number format is invalid")
    @Schema(description = "Patient's phone number", example = "+1234567890")
    private String phone;

    @Email(message = "Email format is invalid")
    @Schema(description = "Patient's email address", example = "john.doe@example.com")
    private String email;

    @NotNull(message = "User ID cannot be null")
    @Positive(message = "User ID must be positive")
    @Schema(description = "User ID for authentication", example = "1")
    private Long userId;
}