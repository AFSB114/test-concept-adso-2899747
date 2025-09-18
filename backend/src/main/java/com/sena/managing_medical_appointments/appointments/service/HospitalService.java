package com.sena.managing_medical_appointments.appointments.service;

import com.sena.managing_medical_appointments.appointments.iservice.IHospitalService;
import com.sena.managing_medical_appointments.appointments.model.dto.req.HospitalRequestDTO;
import com.sena.managing_medical_appointments.appointments.model.dto.res.HospitalResponseDTO;
import com.sena.managing_medical_appointments.appointments.model.entity.Hospital;
import com.sena.managing_medical_appointments.appointments.repository.IHospitalRepository;
import com.sena.managing_medical_appointments.shared.AbstractService;
import com.sena.managing_medical_appointments.shared.IRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HospitalService extends AbstractService<Hospital, HospitalRequestDTO, HospitalResponseDTO> implements IHospitalService {

    @Override
    protected IRepository<Hospital, Long> getRepository() {
        return repository;
    }

    @Autowired
    private IHospitalRepository repository;

    @Override
    public HospitalResponseDTO mapToResDto(Hospital entity) {
        HospitalResponseDTO response = new HospitalResponseDTO();
        response.setId(entity.getId());
        response.setName(entity.getName());
        response.setAddress(entity.getAddress());
        return response;
    }

    @Override
    public Hospital mapToEntity(HospitalRequestDTO request) {
        Hospital entity = new Hospital();
        entity.setName(request.getName());
        entity.setAddress(request.getAddress());
        return entity;
    }
}