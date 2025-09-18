package com.sena.managing_medical_appointments.doctors.service;

import com.sena.managing_medical_appointments.doctors.iservice.IShiftService;
import com.sena.managing_medical_appointments.doctors.model.dto.req.ShiftRequestDTO;
import com.sena.managing_medical_appointments.doctors.model.dto.res.ShiftResponseDTO;
import com.sena.managing_medical_appointments.doctors.model.entity.Shift;
import com.sena.managing_medical_appointments.doctors.repository.IShiftRepository;
import com.sena.managing_medical_appointments.shared.AbstractService;
import com.sena.managing_medical_appointments.shared.IRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service implementation for Shift entity operations.
 * Extends AbstractService to inherit common CRUD operations.
 */
@Service
public class ShiftService extends AbstractService<Shift, ShiftRequestDTO, ShiftResponseDTO> implements IShiftService {

    @Override
    protected IRepository<Shift, Long> getRepository() {
        return repository;
    }

    @Autowired
    private IShiftRepository repository;

    @Override
    public ShiftResponseDTO mapToResDto(Shift entity) {
        ShiftResponseDTO response = new ShiftResponseDTO();
        response.setId(entity.getId());
        response.setDoctorName(entity.getDoctorName());
        response.setDate(entity.getDate());
        response.setStartTime(entity.getStartTime());
        response.setEndTime(entity.getEndTime());
        return response;
    }

    @Override
    public Shift mapToEntity(ShiftRequestDTO request) {
        Shift entity = new Shift();
        entity.setDoctorName(request.getDoctorName());
        entity.setDate(request.getDate());
        entity.setStartTime(request.getStartTime());
        entity.setEndTime(request.getEndTime());
        return entity;
    }
}