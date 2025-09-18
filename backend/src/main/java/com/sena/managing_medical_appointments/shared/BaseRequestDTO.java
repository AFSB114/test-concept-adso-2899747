package com.sena.managing_medical_appointments.shared;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public abstract class BaseRequestDTO {

    @Schema(description = "Unique identifier of the entity", example = "1")
    private Long id;

    @Schema(description = "Timestamp when the entity was created", example = "2023-10-01T10:00:00")
    private LocalDateTime createdAt;

    @Schema(description = "Timestamp when the entity was last updated", example = "2023-10-01T10:00:00")
    private LocalDateTime updatedAt;

    @Schema(description = "Timestamp when the entity was deleted (soft delete)", example = "2023-10-01T10:00:00")
    private LocalDateTime deletedAt;

    @Schema(description = "User who created the entity", example = "admin")
    private String createdBy;

    @Schema(description = "User who last updated the entity", example = "admin")
    private String updatedBy;

    @Schema(description = "User who deleted the entity", example = "admin")
    private String deletedBy;
}