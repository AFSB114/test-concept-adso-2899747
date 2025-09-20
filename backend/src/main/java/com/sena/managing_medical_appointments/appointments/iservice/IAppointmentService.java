package com.sena.managing_medical_appointments.appointments.iservice;

import com.sena.managing_medical_appointments.appointments.model.dto.req.AppointmentRequestDTO;
import com.sena.managing_medical_appointments.appointments.model.dto.res.AppointmentResponseDTO;
import com.sena.managing_medical_appointments.appointments.model.entity.Appointment;
import com.sena.managing_medical_appointments.shared.IService;

import java.util.List;

public interface IAppointmentService extends IService<Appointment, AppointmentRequestDTO, AppointmentResponseDTO> {

    List<Appointment> findByPatientId(Long patientId);

    List<Appointment> findByDoctorId(Long doctorId);

    List<Appointment> findByDoctorIdAndDate(Long doctorId, String date);
}