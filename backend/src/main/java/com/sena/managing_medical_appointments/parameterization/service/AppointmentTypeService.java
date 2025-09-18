package com.sena.managing_medical_appointments.parameterization.service;

import com.sena.managing_medical_appointments.parameterization.model.dto.req.AppointmentTypeRequestDTO;
import com.sena.managing_medical_appointments.parameterization.model.dto.res.AppointmentTypeResponseDTO;
import com.sena.managing_medical_appointments.parameterization.iservice.IAppointmentTypeService;
import com.sena.managing_medical_appointments.parameterization.model.entity.AppointmentType;
import com.sena.managing_medical_appointments.parameterization.repository.IAppointmentTypeRepository;
import com.sena.managing_medical_appointments.shared.AbstractService;
import com.sena.managing_medical_appointments.shared.IRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service implementation for AppointmentType entity operations.
 * Extends AbstractService to inherit common CRUD operations.
 */
@Service
public class AppointmentTypeService extends AbstractService<AppointmentType, AppointmentTypeRequestDTO, AppointmentTypeResponseDTO> implements IAppointmentTypeService {

    @Override
    protected IRepository<AppointmentType, Long> getRepository() {
        return repository;
    }

    @Autowired
    private IAppointmentTypeRepository repository;

    @Override
    public AppointmentTypeResponseDTO mapToResDto(AppointmentType entity) {
        AppointmentTypeResponseDTO response = new AppointmentTypeResponseDTO();
        response.setId(entity.getId());
        response.setName(entity.getName());
        response.setDescription(entity.getDescription());
        return response;
    }

    @Override
    public AppointmentType mapToEntity(AppointmentTypeRequestDTO request) {
        AppointmentType entity = new AppointmentType();
        entity.setName(request.getName());
        entity.setDescription(request.getDescription());
        return entity;
    }
}