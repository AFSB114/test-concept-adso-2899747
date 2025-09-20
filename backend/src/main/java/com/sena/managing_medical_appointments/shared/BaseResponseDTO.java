package com.sena.managing_medical_appointments.shared;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public abstract class BaseResponseDTO {
    @Schema(description = "Unique identifier of the entity", example = "1")
    private Long id;

    @Schema(description = "Timestamp when the entity was created", example = "2023-10-01T10:00:00")
    private LocalDateTime createdAt;

    @Schema(description = "Timestamp when the entity was last updated", example = "2023-10-01T10:00:00")
    private LocalDateTime updatedAt;

    @Schema(description = "Indicates if the entity is active or not", example = "true")
    private Boolean isActive = true;
}