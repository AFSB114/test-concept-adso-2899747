package com.sena.managing_medical_appointments.security.iservice;

import com.sena.managing_medical_appointments.security.model.dto.req.UserRequestDTO;
import com.sena.managing_medical_appointments.security.model.dto.res.UserResponseDTO;
import com.sena.managing_medical_appointments.security.model.entity.User;
import com.sena.managing_medical_appointments.shared.IService;

public interface IUserService extends IService<User, UserRequestDTO, UserResponseDTO> {
}