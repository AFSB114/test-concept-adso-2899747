package com.sena.managing_medical_appointments.security.repository;

import com.sena.managing_medical_appointments.security.model.entity.User;
import com.sena.managing_medical_appointments.shared.IRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository extends IRepository<User, Long> {
}