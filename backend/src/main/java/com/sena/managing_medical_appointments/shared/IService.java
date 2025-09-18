package com.sena.managing_medical_appointments.shared;

import java.util.List;

/**
 * Base service interface that provides common CRUD operations for all entities.
 * All entity services should implement this interface.
 *
 * @param <T> The entity type
 * @param <ID> The entity's primary key type
 * @param <REQ> The request DTO type
 * @param <RES> The response DTO type
 */
public interface IService<T, ID, REQ, RES> {

    /**
     * Find all active entities (not soft deleted)
     * @return List of response DTOs
     */
    List<RES> findAll();

    /**
     * Find entity by ID
     * @param id The entity ID
     * @return Response DTO or null if not found
     */
    RES findById(ID id);

    /**
     * Create a new entity
     * @param request The request DTO
     * @return Created response DTO
     */
    RES create(REQ request);

    /**
     * Update an existing entity
     * @param id The entity ID
     * @param request The request DTO
     * @return Updated response DTO
     */
    RES update(ID id, REQ request);

    /**
     * Soft delete an entity
     * @param id The entity ID
     */
    void delete(ID id);

    /**
     * Check if entity exists and is active
     * @param id The entity ID
     * @return true if entity exists and is active
     */
    boolean existsById(ID id);
}