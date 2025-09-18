package com.sena.managing_medical_appointments.parameterization.service;

import com.sena.managing_medical_appointments.parameterization.model.dto.req.RoleRequestDTO;
import com.sena.managing_medical_appointments.parameterization.model.dto.res.RoleResponseDTO;
import com.sena.managing_medical_appointments.parameterization.iservice.IRoleService;
import com.sena.managing_medical_appointments.parameterization.model.entity.Role;
import com.sena.managing_medical_appointments.parameterization.repository.IRoleRepository;
import com.sena.managing_medical_appointments.shared.AbstractService;
import com.sena.managing_medical_appointments.shared.IRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service implementation for Role entity operations.
 * Extends AbstractService to inherit common CRUD operations.
 */
@Service
public class RoleService extends AbstractService<Role, RoleRequestDTO, RoleResponseDTO> implements IRoleService {

    @Override
    protected IRepository<Role, Long> getRepository() {
        return repository;
    }

    @Autowired
    private IRoleRepository repository;

    @Override
    public RoleResponseDTO mapToResDto(Role entity) {
        RoleResponseDTO response = new RoleResponseDTO();
        response.setId(entity.getId());
        response.setName(entity.getName());
        return response;
    }

    @Override
    public Role mapToEntity(RoleRequestDTO request) {
        Role entity = new Role();
        entity.setName(request.getName());
        return entity;
    }
}