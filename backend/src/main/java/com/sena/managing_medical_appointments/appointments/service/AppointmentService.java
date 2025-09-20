package com.sena.managing_medical_appointments.appointments.service;

import com.sena.managing_medical_appointments.appointments.iservice.IAppointmentService;
import com.sena.managing_medical_appointments.appointments.model.dto.req.AppointmentRequestDTO;
import com.sena.managing_medical_appointments.appointments.model.dto.res.AppointmentResponseDTO;
import com.sena.managing_medical_appointments.appointments.model.entity.Appointment;
import com.sena.managing_medical_appointments.appointments.repository.IAppointmentRepository;
import com.sena.managing_medical_appointments.appointments.repository.IRoomRepository;
import com.sena.managing_medical_appointments.doctors.model.entity.Doctor;
import com.sena.managing_medical_appointments.doctors.repository.IDoctorRepository;
import com.sena.managing_medical_appointments.parameterization.model.entity.AppointmentStatus;
import com.sena.managing_medical_appointments.parameterization.model.entity.AppointmentType;
import com.sena.managing_medical_appointments.parameterization.repository.IAppointmentStatusRepository;
import com.sena.managing_medical_appointments.parameterization.repository.IAppointmentTypeRepository;
import com.sena.managing_medical_appointments.patients.model.entity.Patient;
import com.sena.managing_medical_appointments.patients.repository.IPatientRepository;
import com.sena.managing_medical_appointments.appointments.model.entity.Room;
import com.sena.managing_medical_appointments.shared.AbstractService;
import com.sena.managing_medical_appointments.shared.IRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppointmentService extends AbstractService<Appointment, AppointmentRequestDTO, AppointmentResponseDTO> implements IAppointmentService {

    @Override
    protected IRepository<Appointment, Long> getRepository() {
        return repository;
    }

    @Autowired
    private IAppointmentRepository repository;

    @Autowired
    private IPatientRepository patientRepository;

    @Autowired
    private IDoctorRepository doctorRepository;

    @Autowired
    private IRoomRepository roomRepository;

    @Autowired
    private IAppointmentTypeRepository appointmentTypeRepository;

    @Autowired
    private IAppointmentStatusRepository appointmentStatusRepository;

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
        Patient patient = patientRepository.findById(request.getPatientId())
                .orElseThrow(() -> new RuntimeException("Patient not found"));

        Doctor doctor = doctorRepository.findById(request.getDoctorId())
                .orElseThrow(() -> new RuntimeException("Doctor not found"));

        Room room = null;
        if (request.getRoomId() != null) {
            room = roomRepository.findById(request.getRoomId())
                    .orElseThrow(() -> new RuntimeException("Room not found"));
        }

        AppointmentType appointmentType = appointmentTypeRepository.findById(request.getAppointmentTypeId())
                .orElseThrow(() -> new RuntimeException("Appointment type not found"));

        AppointmentStatus status = appointmentStatusRepository.findById(request.getStatusId())
                .orElseThrow(() -> new RuntimeException("Appointment status not found"));

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

    @Override
    public List<Appointment> findByPatientId(Long patientId) {
        return repository.findByPatientId(patientId);
    }

    @Override
    public List<Appointment> findByDoctorId(Long doctorId) {
        return repository.findByDoctorId(doctorId);
    }

    @Override
    public List<Appointment> findByDoctorIdAndDate(Long doctorId, String date) {
        return repository.findByDoctorIdAndDate(doctorId, date);
    }
}