package com.sena.managing_medical_appointments.doctors.service;

import com.sena.managing_medical_appointments.doctors.iservice.IDoctorService;
import com.sena.managing_medical_appointments.doctors.model.dto.req.DoctorRequestDTO;
import com.sena.managing_medical_appointments.doctors.model.dto.res.DoctorResponseDTO;
import com.sena.managing_medical_appointments.doctors.model.entity.Doctor;
import com.sena.managing_medical_appointments.doctors.repository.IDoctorRepository;
import com.sena.managing_medical_appointments.parameterization.model.entity.Specialty;
import com.sena.managing_medical_appointments.security.model.entity.User;
import com.sena.managing_medical_appointments.shared.AbstractService;
import com.sena.managing_medical_appointments.shared.IRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Service implementation for Doctor entity operations.
 * Extends AbstractService to inherit common CRUD operations.
 */
@Service
public class DoctorService extends AbstractService<Doctor, DoctorRequestDTO, DoctorResponseDTO> implements IDoctorService {

    @Override
    protected IRepository<Doctor, Long> getRepository() {
        return repository;
    }

    @Autowired
    private IDoctorRepository repository;

    @Override
    public DoctorResponseDTO mapToResDto(Doctor entity) {
        DoctorResponseDTO response = new DoctorResponseDTO();
        response.setId(entity.getId());
        response.setName(entity.getName());
        response.setLastName(entity.getLastName());
        response.setEmail(entity.getEmail());
        response.setPhone(entity.getPhone());
        response.setSpecialtyId(entity.getSpecialty().getId());
        response.setUserId(entity.getUser().getId());
        return response;
    }

    @Override
    public Doctor mapToEntity(DoctorRequestDTO request) {
        Specialty specialty = new Specialty();
        specialty.setId(request.getSpecialtyId());
        User user = new User();
        user.setId(request.getUserId());
        Doctor entity = new Doctor();
        entity.setName(request.getName());
        entity.setLastName(request.getLastName());
        entity.setEmail(request.getEmail());
        entity.setPhone(request.getPhone());
        entity.setSpecialty(specialty);
        entity.setUser(user);
        return entity;
    }
}