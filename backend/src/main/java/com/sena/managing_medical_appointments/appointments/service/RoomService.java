package com.sena.managing_medical_appointments.appointments.service;

import com.sena.managing_medical_appointments.appointments.iservice.IRoomService;
import com.sena.managing_medical_appointments.appointments.model.dto.req.RoomRequestDTO;
import com.sena.managing_medical_appointments.appointments.model.dto.res.RoomResponseDTO;
import com.sena.managing_medical_appointments.appointments.model.entity.Hospital;
import com.sena.managing_medical_appointments.appointments.model.entity.Room;
import com.sena.managing_medical_appointments.appointments.repository.IRoomRepository;
import com.sena.managing_medical_appointments.shared.AbstractService;
import com.sena.managing_medical_appointments.shared.IRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoomService extends AbstractService<Room, RoomRequestDTO, RoomResponseDTO> implements IRoomService {

    @Override
    protected IRepository<Room, Long> getRepository() {
        return repository;
    }

    @Autowired
    private IRoomRepository repository;

    @Override
    public RoomResponseDTO mapToResDto(Room entity) {
        RoomResponseDTO response = new RoomResponseDTO();
        response.setId(entity.getId());
        response.setName(entity.getName());
        response.setHospitalId(entity.getHospital().getId());
        return response;
    }

    @Override
    public Room mapToEntity(RoomRequestDTO request) {
        Hospital hospital = new Hospital();
        hospital.setId(request.getHospitalId());
        Room entity = new Room();
        entity.setName(request.getName());
        entity.setHospital(hospital);
        return entity;
    }
}