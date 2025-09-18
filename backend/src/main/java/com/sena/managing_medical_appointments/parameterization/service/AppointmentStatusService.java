package com.sena.managing_medical_appointments.parameterization.service;

import com.sena.managing_medical_appointments.parameterization.model.dto.req.AppointmentStatusRequestDTO;
import com.sena.managing_medical_appointments.parameterization.model.dto.res.AppointmentStatusResponseDTO;
import com.sena.managing_medical_appointments.parameterization.iservice.IAppointmentStatusService;
import com.sena.managing_medical_appointments.parameterization.model.entity.AppointmentStatus;
import com.sena.managing_medical_appointments.parameterization.repository.IAppointmentStatusRepository;
import com.sena.managing_medical_appointments.shared.AbstractService;
import com.sena.managing_medical_appointments.shared.IRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service implementation for AppointmentStatus entity operations.
 * Extends AbstractService to inherit common CRUD operations.
 */
@Service
public class AppointmentStatusService extends AbstractService<AppointmentStatus, AppointmentStatusRequestDTO, AppointmentStatusResponseDTO> implements IAppointmentStatusService {

    @Override
    protected IRepository<AppointmentStatus, Long> getRepository() {
        return repository;
    }

    @Autowired
    private IAppointmentStatusRepository repository;

    @Override
    public AppointmentStatusResponseDTO mapToResDto(AppointmentStatus entity) {
        AppointmentStatusResponseDTO response = new AppointmentStatusResponseDTO();
        response.setId(entity.getId());
        response.setName(entity.getName());
        return response;
    }

    @Override
    public AppointmentStatus mapToEntity(AppointmentStatusRequestDTO request) {
        AppointmentStatus entity = new AppointmentStatus();
        entity.setName(request.getName());
        return entity;
    }
}