package com.sena.managing_medical_appointments.parameterization.service;

import com.sena.managing_medical_appointments.parameterization.iservice.ISpecialtyService;
import com.sena.managing_medical_appointments.parameterization.model.dto.req.SpecialtyRequestDTO;
import com.sena.managing_medical_appointments.parameterization.model.dto.res.SpecialtyResponseDTO;
import com.sena.managing_medical_appointments.parameterization.model.entity.Specialty;
import com.sena.managing_medical_appointments.parameterization.repository.ISpecialtyRepository;
import com.sena.managing_medical_appointments.shared.AbstractService;
import com.sena.managing_medical_appointments.shared.IRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service implementation for Specialty entity operations.
 * Extends AbstractService to inherit common CRUD operations.
 */
@Service
public class SpecialtyService extends AbstractService<Specialty, SpecialtyRequestDTO, SpecialtyResponseDTO> implements ISpecialtyService {

    @Override
    protected IRepository<Specialty, Long> getRepository() {
        return repository;
    }

    @Autowired
    private ISpecialtyRepository repository;

    @Override
    public SpecialtyResponseDTO mapToResDto(Specialty entity) {
        SpecialtyResponseDTO response = new SpecialtyResponseDTO();
        response.setId(entity.getId());
        response.setName(entity.getName());
        response.setDescription(entity.getDescription());
        return response;
    }

    @Override
    public Specialty mapToEntity(SpecialtyRequestDTO request) {
        Specialty entity = new Specialty();
        entity.setName(request.getName());
        entity.setDescription(request.getDescription());
        return entity;
    }
}