package com.sena.managing_medical_appointments.parameterization.iservice;

import com.sena.managing_medical_appointments.parameterization.model.dto.req.SpecialtyRequestDTO;
import com.sena.managing_medical_appointments.parameterization.model.dto.res.SpecialtyResponseDTO;
import com.sena.managing_medical_appointments.parameterization.model.entity.Specialty;
import com.sena.managing_medical_appointments.shared.IService;

public interface ISpecialtyService extends IService<Specialty, SpecialtyRequestDTO, SpecialtyResponseDTO> {
}