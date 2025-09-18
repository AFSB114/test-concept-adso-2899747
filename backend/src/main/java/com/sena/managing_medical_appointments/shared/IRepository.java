package com.sena.managing_medical_appointments.shared;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.NoRepositoryBean;

import java.util.List;

/**
 * Base repository interface that provides common CRUD operations for all entities.
 * All entity repositories should extend this interface.
 *
 * @param <T> The entity type
 * @param <ID> The entity's primary key type
 */
@NoRepositoryBean
public interface IRepository<T extends BaseEntity, ID> extends JpaRepository<T, ID> {

    /**
     * Find all entities that are not soft deleted
     * @return List of active entities
     */
    List<T> findByDeletedAtIsNull();

    /**
     * Find all entities including soft deleted ones
     * @return List of all entities
     */
    List<T> findAll();

    /**
     * Soft delete an entity by setting deletedAt timestamp
     * @param entity The entity to soft delete
     */
    default void softDelete(T entity) {
        // This will be implemented by concrete repositories
        // using @Modifying and @Query annotations
    }

    /**
     * Check if entity exists and is not soft deleted
     * @param id The entity ID
     * @return true if entity exists and is active
     */
    boolean existsByIdAndDeletedAtIsNull(ID id);
}