package com.sena.managing_medical_appointments.appointments.iservice;

import com.sena.managing_medical_appointments.appointments.model.dto.req.HospitalRequestDTO;
import com.sena.managing_medical_appointments.appointments.model.dto.res.HospitalResponseDTO;
import com.sena.managing_medical_appointments.appointments.model.entity.Hospital;
import com.sena.managing_medical_appointments.shared.IService;

public interface IHospitalService extends IService<Hospital, HospitalRequestDTO, HospitalResponseDTO> {
}