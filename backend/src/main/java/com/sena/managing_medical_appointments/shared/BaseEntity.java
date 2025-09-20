package com.sena.managing_medical_appointments.shared;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.springframework.data.annotation.CreatedBy;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@MappedSuperclass
@EntityListeners(AuditingEntityListener.class)
@Data
@EqualsAndHashCode(of = "id")
public abstract class BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Schema(description = "Unique identifier of the entity", example = "1")
    private Long id;

    @CreatedDate
    @Column(name = "created_at", nullable = false, updatable = false)
    @Schema(description = "Timestamp when the entity was created", example = "2023-10-01T10:00:00")
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    @Schema(description = "Timestamp when the entity was last updated", example = "2023-10-01T10:00:00")
    private LocalDateTime updatedAt;

    @Column(name = "deleted_at")
    @Schema(description = "Timestamp when the entity was deleted (soft delete)", example = "2023-10-01T10:00:00")
    private LocalDateTime deletedAt;

    @CreatedBy
    @Column(name = "created_by")
    @Schema(description = "User who created the entity", example = "admin")
    private String createdBy;

    @LastModifiedBy
    @Column(name = "updated_by")
    @Schema(description = "User who last updated the entity", example = "admin")
    private String updatedBy;

    @Column(name = "deleted_by")
    @Schema(description = "User who deleted the entity", example = "admin")
    private String deletedBy;

    @Column(name = "isActive")
    @Schema(description = "Indicates if the entity is active or not", example = "true")
    private Boolean isActive = true;
}