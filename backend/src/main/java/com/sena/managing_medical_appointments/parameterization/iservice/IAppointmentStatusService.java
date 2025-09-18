package com.sena.managing_medical_appointments.parameterization.iservice;

import com.sena.managing_medical_appointments.parameterization.model.dto.req.AppointmentStatusRequestDTO;
import com.sena.managing_medical_appointments.parameterization.model.dto.res.AppointmentStatusResponseDTO;
import com.sena.managing_medical_appointments.parameterization.model.entity.AppointmentStatus;
import com.sena.managing_medical_appointments.shared.IService;

public interface IAppointmentStatusService extends IService<AppointmentStatus, AppointmentStatusRequestDTO, AppointmentStatusResponseDTO> {
}