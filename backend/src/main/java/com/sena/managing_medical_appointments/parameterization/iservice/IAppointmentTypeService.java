package com.sena.managing_medical_appointments.parameterization.iservice;

import com.sena.managing_medical_appointments.parameterization.model.dto.req.AppointmentTypeRequestDTO;
import com.sena.managing_medical_appointments.parameterization.model.dto.res.AppointmentTypeResponseDTO;
import com.sena.managing_medical_appointments.parameterization.model.entity.AppointmentType;
import com.sena.managing_medical_appointments.shared.IService;

public interface IAppointmentTypeService extends IService<AppointmentType, AppointmentTypeRequestDTO, AppointmentTypeResponseDTO> {
}