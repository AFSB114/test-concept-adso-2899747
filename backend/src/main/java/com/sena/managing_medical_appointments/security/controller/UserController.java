package com.sena.managing_medical_appointments.security.controller;

import com.sena.managing_medical_appointments.security.iservice.IUserService;
import com.sena.managing_medical_appointments.security.model.dto.req.UserRequestDTO;
import com.sena.managing_medical_appointments.security.model.dto.res.UserResponseDTO;
import com.sena.managing_medical_appointments.security.model.entity.User;
import com.sena.managing_medical_appointments.shared.AbstractController;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController extends AbstractController<User, UserRequestDTO, UserResponseDTO, IUserService> {

    public UserController(IUserService service) {
        super(service, "User");
    }
}