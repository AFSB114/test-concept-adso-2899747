package com.sena.managing_medical_appointments.appointments.model.dto.req;

import com.sena.managing_medical_appointments.shared.BaseRequestDTO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class RoomRequestDTO extends BaseRequestDTO {

    @Schema(description = "Room name", example = "Room 101")
    private String name;

    @Schema(description = "Hospital ID", example = "1")
    private Long hospitalId;
}