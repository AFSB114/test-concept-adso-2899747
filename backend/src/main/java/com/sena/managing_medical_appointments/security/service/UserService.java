package com.sena.managing_medical_appointments.security.service;

import com.sena.managing_medical_appointments.parameterization.model.entity.Role;
import com.sena.managing_medical_appointments.security.iservice.IUserService;
import com.sena.managing_medical_appointments.security.model.dto.req.UserRequestDTO;
import com.sena.managing_medical_appointments.security.model.dto.res.UserResponseDTO;
import com.sena.managing_medical_appointments.security.model.entity.User;
import com.sena.managing_medical_appointments.security.repository.IUserRepository;
import com.sena.managing_medical_appointments.shared.AbstractService;
import com.sena.managing_medical_appointments.shared.IRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService extends AbstractService<User, UserRequestDTO, UserResponseDTO> implements IUserService {

    @Override
    protected IRepository<User, Long> getRepository() {
        return repository;
    }

    @Autowired
    private IUserRepository repository;

    @Override
    public UserResponseDTO mapToResDto(User entity) {
        UserResponseDTO response = new UserResponseDTO();
        response.setId(entity.getId());
        response.setUsername(entity.getUsername());
        response.setRoleId(entity.getRole().getId());
        response.setActive(entity.getActive());
        return response;
    }

    @Override
    public User mapToEntity(UserRequestDTO request) {
        Role role = new Role();
        role.setId(request.getRoleId());

        User entity = new User();
        entity.setUsername(request.getUsername());
        entity.setPassword(request.getPassword());
        entity.setRole(role);
        entity.setActive(request.getActive());

        return entity;
    }
}