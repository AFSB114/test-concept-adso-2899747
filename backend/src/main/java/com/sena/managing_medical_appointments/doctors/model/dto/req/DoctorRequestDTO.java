package com.sena.managing_medical_appointments.doctors.model.dto.req;

import com.sena.managing_medical_appointments.shared.BaseRequestDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class DoctorRequestDTO extends BaseRequestDTO {

    @Schema(description = "Doctor's first name", example = "Dr. Jane")
    private String name;

    @Schema(description = "Doctor's last name", example = "Smith")
    private String lastName;

    @Schema(description = "Doctor's specialty ID", example = "1")
    private Long specialtyId;

    @Schema(description = "Doctor's phone number", example = "+1234567890")
    private String phone;

    @Schema(description = "Doctor's email address", example = "jane.smith@example.com")
    private String email;

//    @Schema(description = "User ID for authentication", example = "1")
//    private Long userId;
}