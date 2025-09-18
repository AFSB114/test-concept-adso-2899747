package com.sena.managing_medical_appointments.parameterization.repository;

import com.sena.managing_medical_appointments.parameterization.model.entity.Specialty;
import com.sena.managing_medical_appointments.shared.IRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ISpecialtyRepository extends IRepository<Specialty, Long> {
    // Additional custom query methods can be added here if needed
}