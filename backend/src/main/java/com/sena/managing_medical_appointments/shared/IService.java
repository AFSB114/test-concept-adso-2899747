package com.sena.managing_medical_appointments.shared;

import com.sena.managing_medical_appointments.shared.BaseEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface IService<T extends BaseEntity, DReq, DRes> {
    /**
     * Retrieves all entities.
     *
     * @return A list of all entities.
     * @throws Exception If an error occurs while retrieving the entities.
     */
    List<T> all() throws Exception;

    /**
     * Retrieves all entities with state set to true.
     *
     * @return A list of entities with state set to true.
     * @throws Exception If an error occurs while retrieving the entities.
     */
    List<T> findByStateTrue() throws Exception;

    /**
     * Retrieves an entity by its ID.
     *
     * @param id The ID of the entity to retrieve.
     * @return An Optional containing the entity, or empty if not found.
     * @throws Exception If an error occurs while retrieving the entity.
     */
    Optional<T> findById(Long id) throws Exception;

    /**
     * Saves an entity.
     *
     * @param entity The entity to save.
     * @return The saved entity.
     * @throws Exception If an error occurs while saving the entity.
     */
    T save(T entity) throws Exception;

    /**
     * Updates an existing entity by its ID.
     *
     * @param id     The ID of the entity to update.
     * @param entity The updated entity.
     * @throws Exception If an error occurs while updating the entity.
     */
    void update(Long id, T entity) throws Exception;

    /**
     * Deletes an entity by its ID.
     *
     * @param id The ID of the entity to delete.
     * @throws Exception If an error occurs while deleting the entity.
     */
    void delete(Long id) throws Exception;

    /**
     * Retrieves all entities with pagination.
     *
     * @param pageable The pagination information.
     * @return A page of entities.
     * @throws Exception If an error occurs while retrieving the entities.
     */
    Page<T> findAll(Pageable pageable) throws Exception;

    DRes mapToResDto(T entity);

    T mapToEntity(DReq reqDto);
}