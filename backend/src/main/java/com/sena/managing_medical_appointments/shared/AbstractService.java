package com.sena.managing_medical_appointments.shared;

import lombok.RequiredArgsConstructor;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Abstract base service class that implements common CRUD operations.
 * All entity services should extend this class.
 *
 * @param <T> The entity type
 * @param <ID> The entity's primary key type
 * @param <REQ> The request DTO type
 * @param <RES> The response DTO type
 */
@RequiredArgsConstructor
@Transactional(readOnly = true)
public abstract class AbstractService<T extends BaseEntity, ID, REQ, RES> implements IService<T, ID, REQ, RES> {

    protected final IRepository<T, ID> repository;

    /**
     * Convert entity to response DTO
     * @param entity The entity
     * @return Response DTO
     */
    protected abstract RES mapToResponse(T entity);

    /**
     * Convert request DTO to entity
     * @param request The request DTO
     * @return Entity
     */
    protected abstract T mapToEntity(REQ request);

    /**
     * Update entity with request data
     * @param entity The existing entity
     * @param request The request DTO
     * @return Updated entity
     */
    protected abstract T updateEntity(T entity, REQ request);

    @Override
    public List<RES> findAll() {
        return repository.findByDeletedAtIsNull()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public RES findById(ID id) {
        return repository.findById(id)
                .filter(entity -> entity.getDeletedAt() == null)
                .map(this::mapToResponse)
                .orElse(null);
    }

    @Override
    @Transactional
    public RES create(REQ request) {
        T entity = mapToEntity(request);
        entity.setCreatedAt(LocalDateTime.now());
        entity.setUpdatedAt(LocalDateTime.now());
        T savedEntity = repository.save(entity);
        return mapToResponse(savedEntity);
    }

    @Override
    @Transactional
    public RES update(ID id, REQ request) {
        return repository.findById(id)
                .filter(entity -> entity.getDeletedAt() == null)
                .map(entity -> {
                    T updatedEntity = updateEntity(entity, request);
                    updatedEntity.setUpdatedAt(LocalDateTime.now());
                    T savedEntity = repository.save(updatedEntity);
                    return mapToResponse(savedEntity);
                })
                .orElse(null);
    }

    @Override
    @Transactional
    public void delete(ID id) {
        repository.findById(id)
                .filter(entity -> entity.getDeletedAt() == null)
                .ifPresent(entity -> {
                    entity.setDeletedAt(LocalDateTime.now());
                    repository.save(entity);
                });
    }

    @Override
    public boolean existsById(ID id) {
        return repository.existsByIdAndDeletedAtIsNull(id);
    }
}