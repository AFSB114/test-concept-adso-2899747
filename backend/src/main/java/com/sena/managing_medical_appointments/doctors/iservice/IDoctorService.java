package com.sena.managing_medical_appointments.doctors.service;

import com.sena.managing_medical_appointments.doctors.model.dto.req.DoctorRequestDTO;
import com.sena.managing_medical_appointments.doctors.model.dto.res.DoctorResponseDTO;
import com.sena.managing_medical_appointments.shared.IService;

public interface IDoctorService extends IService<DoctorRequestDTO, DoctorResponseDTO, Long> {
}