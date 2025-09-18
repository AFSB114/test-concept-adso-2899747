package com.sena.managing_medical_appointments.appointments.model.dto.res;

import com.sena.managing_medical_appointments.shared.BaseResponseDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class RoomResponseDTO extends BaseResponseDTO {

    @Schema(description = "Room name", example = "Room 101")
    private String name;

    @Schema(description = "Hospital ID", example = "1")
    private Long hospitalId;
}