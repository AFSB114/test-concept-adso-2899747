package com.sena.managing_medical_appointments.shared;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

/**
 * Abstract base service class that implements common CRUD operations.
 * All entity services should extend this class.
 *
 * @param <T> The entity type
 * @param <DReq> The request DTO type
 * @param <DRes> The response DTO type
 */
@Transactional(readOnly = true)
public abstract class AbstractService<T extends BaseEntity, DReq, DRes> implements IService<T, DReq, DRes> {

    protected abstract IRepository<T, Long> getRepository();

    @Override
    public List<T> all() throws Exception {
        return getRepository().findAll();
    }

    @Override
    public List<T> findByStateTrue() throws Exception {
        return getRepository().findByDeletedAtIsNull();
    }

    @Override
    public Optional<T> findById(Long id) throws Exception {
        return getRepository().findById(id);
    }

    @Override
    @Transactional
    public T save(T entity) throws Exception {
        return getRepository().save(entity);
    }

    @Override
    @Transactional
    public void update(Long id, T entity) throws Exception {
        getRepository().save(entity);
    }

    @Override
    @Transactional
    public void delete(Long id) throws Exception {
        getRepository().findById(id)
                .ifPresent(entity -> {
                    entity.setDeletedAt(LocalDateTime.now());
                    getRepository().save(entity);
                });
    }

    @Override
    public Page<T> findAll(Pageable pageable) throws Exception {
        return getRepository().findAll(pageable);
    }

    @Override
    public abstract DRes mapToResDto(T entity);

    @Override
    public abstract T mapToEntity(DReq reqDto);
}