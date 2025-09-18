package com.sena.managing_medical_appointments.doctors.iservice;

import com.sena.managing_medical_appointments.doctors.model.dto.req.DoctorRequestDTO;
import com.sena.managing_medical_appointments.doctors.model.dto.res.DoctorResponseDTO;
import com.sena.managing_medical_appointments.doctors.model.entity.Doctor;
import com.sena.managing_medical_appointments.shared.IService;

public interface IDoctorService extends IService<Doctor,DoctorRequestDTO, DoctorResponseDTO> {
}