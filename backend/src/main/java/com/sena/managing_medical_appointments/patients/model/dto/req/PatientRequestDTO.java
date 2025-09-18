package com.sena.managing_medical_appointments.patients.dto.req;

import com.sena.managing_medical_appointments.shared.BaseRequestDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;

@Data
@EqualsAndHashCode(callSuper = true)
public class PatientRequestDTO extends BaseRequestDTO {

    @Schema(description = "Patient's first name", example = "John")
    private String name;

    @Schema(description = "Patient's last name", example = "Doe")
    private String lastName;

    @Schema(description = "Patient's birth date", example = "1990-01-01")
    private LocalDate birthDate;

    @Schema(description = "Patient's phone number", example = "+1234567890")
    private String phone;

    @Schema(description = "Patient's email address", example = "john.doe@example.com")
    private String email;
}