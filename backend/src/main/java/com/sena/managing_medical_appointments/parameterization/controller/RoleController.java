package com.sena.managing_medical_appointments.parameterization.controller;

import com.sena.managing_medical_appointments.parameterization.model.dto.req.RoleRequestDTO;
import com.sena.managing_medical_appointments.parameterization.model.dto.res.RoleResponseDTO;
import com.sena.managing_medical_appointments.parameterization.model.entity.Role;
import com.sena.managing_medical_appointments.parameterization.iservice.IRoleService;
import com.sena.managing_medical_appointments.shared.AbstractController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/roles")
public class RoleController extends AbstractController<Role, RoleRequestDTO, RoleResponseDTO, IRoleService> {

    public RoleController(IRoleService service) {
        super(service, "Role");
    }
}