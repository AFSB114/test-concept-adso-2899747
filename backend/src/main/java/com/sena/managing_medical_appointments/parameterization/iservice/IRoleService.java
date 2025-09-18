package com.sena.managing_medical_appointments.parameterization.iservice;

import com.sena.managing_medical_appointments.parameterization.model.dto.req.RoleRequestDTO;
import com.sena.managing_medical_appointments.parameterization.model.dto.res.RoleResponseDTO;
import com.sena.managing_medical_appointments.parameterization.model.entity.Role;
import com.sena.managing_medical_appointments.shared.IService;

/**
 * Service interface for Role entity operations.
 * Extends the base IService interface for common CRUD operations.
 */
public interface IRoleService extends IService<Role, RoleRequestDTO, RoleResponseDTO> {

    RoleResponseDTO mapToResDto(Role entity);

    Role mapToEntity(RoleRequestDTO request);
}