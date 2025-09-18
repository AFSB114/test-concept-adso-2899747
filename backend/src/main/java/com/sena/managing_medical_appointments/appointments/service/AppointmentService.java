package com.sena.managing_medical_appointments.appointments.service;

import com.sena.managing_medical_appointments.appointments.iservice.IAppointmentService;
import com.sena.managing_medical_appointments.appointments.model.dto.req.AppointmentRequestDTO;
import com.sena.managing_medical_appointments.appointments.model.dto.res.AppointmentResponseDTO;
import com.sena.managing_medical_appointments.appointments.model.entity.Appointment;
import com.sena.managing_medical_appointments.appointments.repository.IAppointmentRepository;
import com.sena.managing_medical_appointments.doctors.model.entity.Doctor;
import com.sena.managing_medical_appointments.parameterization.model.entity.AppointmentStatus;
import com.sena.managing_medical_appointments.parameterization.model.entity.AppointmentType;
import com.sena.managing_medical_appointments.patients.model.entity.Patient;
import com.sena.managing_medical_appointments.appointments.model.entity.Room;
import com.sena.managing_medical_appointments.shared.AbstractService;
import com.sena.managing_medical_appointments.shared.IRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AppointmentService extends AbstractService<Appointment, AppointmentRequestDTO, AppointmentResponseDTO> implements IAppointmentService {

    @Override
    protected IRepository<Appointment, Long> getRepository() {
        return repository;
    }

    @Autowired
    private IAppointmentRepository repository;

    @Override
    public AppointmentResponseDTO mapToResDto(Appointment entity) {
        AppointmentResponseDTO response = new AppointmentResponseDTO();
        response.setId(entity.getId());
        response.setPatientId(entity.getPatient().getId());
        response.setDoctorId(entity.getDoctor().getId());
        response.setRoomId(entity.getRoom().getId());
        response.setAppointmentTypeId(entity.getAppointmentType().getId());
        response.setStatusId(entity.getStatus().getId());
        response.setDate(entity.getDate());
        response.setTime(entity.getTime());
        return response;
    }

    @Override
    public Appointment mapToEntity(AppointmentRequestDTO request) {
        Patient patient = new Patient();
        patient.setId(request.getPatientId());

        Doctor doctor = new Doctor();
        doctor.setId(request.getDoctorId());

        Room room = new Room();
        room.setId(request.getRoomId());

        AppointmentType appointmentType = new AppointmentType();
        appointmentType.setId(request.getAppointmentTypeId());

        AppointmentStatus status = new AppointmentStatus();
        status.setId(request.getStatusId());

        Appointment entity = new Appointment();
        entity.setPatient(patient);
        entity.setDoctor(doctor);
        entity.setRoom(room);
        entity.setAppointmentType(appointmentType);
        entity.setStatus(status);
        entity.setDate(request.getDate());
        entity.setTime(request.getTime());
        return entity;
    }
}