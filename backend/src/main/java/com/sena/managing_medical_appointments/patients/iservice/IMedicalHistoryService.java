package com.sena.managing_medical_appointments.patients.iservice;

import com.sena.managing_medical_appointments.patients.model.dto.req.MedicalHistoryRequestDTO;
import com.sena.managing_medical_appointments.patients.model.dto.res.MedicalHistoryResponseDTO;
import com.sena.managing_medical_appointments.patients.model.entity.MedicalHistory;
import com.sena.managing_medical_appointments.shared.IService;

public interface IMedicalHistoryService extends IService<MedicalHistory, MedicalHistoryRequestDTO, MedicalHistoryResponseDTO> {
}