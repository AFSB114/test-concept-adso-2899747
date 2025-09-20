package com.sena.managing_medical_appointments.patients.service;

import com.sena.managing_medical_appointments.patients.iservice.IMedicalHistoryService;
import com.sena.managing_medical_appointments.patients.model.dto.req.MedicalHistoryRequestDTO;
import com.sena.managing_medical_appointments.patients.model.dto.res.MedicalHistoryResponseDTO;
import com.sena.managing_medical_appointments.patients.model.entity.MedicalHistory;
import com.sena.managing_medical_appointments.patients.model.entity.Patient;
import com.sena.managing_medical_appointments.patients.repository.IMedicalHistoryRepository;
import com.sena.managing_medical_appointments.shared.AbstractService;
import com.sena.managing_medical_appointments.shared.IRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service implementation for MedicalHistory entity operations.
 * Extends AbstractService to inherit common CRUD operations.
 */
@Service
public class MedicalHistoryService extends AbstractService<MedicalHistory, MedicalHistoryRequestDTO, MedicalHistoryResponseDTO> implements IMedicalHistoryService {

    @Override
    protected IRepository<MedicalHistory, Long> getRepository() {
        return repository;
    }

    @Autowired
    private IMedicalHistoryRepository repository;

    @Override
    public MedicalHistoryResponseDTO mapToResDto(MedicalHistory entity) {
        MedicalHistoryResponseDTO response = new MedicalHistoryResponseDTO();
        response.setId(entity.getId());
        response.setPatientId(entity.getPatient().getId());
        response.setDescription(entity.getDescription());
        response.setDate(entity.getDate());
        return response;
    }

    @Override
    public MedicalHistory mapToEntity(MedicalHistoryRequestDTO request) {
        Patient patient = new Patient();
        patient.setId(request.getPatientId());
        MedicalHistory entity = new MedicalHistory();
        entity.setPatient(patient);
        entity.setDescription(request.getDescription());
        entity.setDate(request.getDate());
        return entity;
    }

    @Override
    public List<MedicalHistory> findByPatientId(Long patientId) {
        return repository.findByPatientId(patientId);
    }
}