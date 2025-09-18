package com.sena.managing_medical_appointments.doctors.iservice;

import com.sena.managing_medical_appointments.doctors.model.dto.req.ShiftRequestDTO;
import com.sena.managing_medical_appointments.doctors.model.dto.res.ShiftResponseDTO;
import com.sena.managing_medical_appointments.doctors.model.entity.Shift;
import com.sena.managing_medical_appointments.shared.IService;

public interface IShiftService extends IService<Shift,ShiftRequestDTO, ShiftResponseDTO> {
}