package com.sena.managing_medical_appointments.patients.iservice;

import com.sena.managing_medical_appointments.patients.model.dto.req.PatientRequestDTO;
import com.sena.managing_medical_appointments.patients.model.dto.res.PatientResponseDTO;
import com.sena.managing_medical_appointments.patients.model.entity.Patient;
import com.sena.managing_medical_appointments.shared.IService;

public interface IPatientService extends IService<Patient, PatientRequestDTO, PatientResponseDTO> {
}