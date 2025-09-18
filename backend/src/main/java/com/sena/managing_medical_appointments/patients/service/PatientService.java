package com.sena.managing_medical_appointments.patients.service;

import com.sena.managing_medical_appointments.patients.iservice.IPatientService;
import com.sena.managing_medical_appointments.patients.model.dto.req.PatientRequestDTO;
import com.sena.managing_medical_appointments.patients.model.dto.res.PatientResponseDTO;
import com.sena.managing_medical_appointments.patients.model.entity.Patient;
import com.sena.managing_medical_appointments.patients.repository.IPatientRepository;
import com.sena.managing_medical_appointments.shared.AbstractService;
import com.sena.managing_medical_appointments.shared.IRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service implementation for Patient entity operations.
 * Extends AbstractService to inherit common CRUD operations.
 */
@Service
public class PatientService extends AbstractService<Patient, PatientRequestDTO, PatientResponseDTO> implements IPatientService {

    @Override
    protected IRepository<Patient, Long> getRepository() {
        return repository;
    }

    @Autowired
    private IPatientRepository repository;

    @Override
    public PatientResponseDTO mapToResDto(Patient entity) {
        PatientResponseDTO response = new PatientResponseDTO();
        response.setId(entity.getId());
        response.setName(entity.getName());
        response.setLastName(entity.getLastName());
        response.setBirthDate(entity.getBirthDate());
        response.setPhone(entity.getPhone());
        response.setEmail(entity.getEmail());
        return response;
    }

    @Override
    public Patient mapToEntity(PatientRequestDTO request) {
        Patient entity = new Patient();
        entity.setName(request.getName());
        entity.setLastName(request.getLastName());
        entity.setBirthDate(request.getBirthDate());
        entity.setPhone(request.getPhone());
        entity.setEmail(request.getEmail());
        return entity;
    }
}