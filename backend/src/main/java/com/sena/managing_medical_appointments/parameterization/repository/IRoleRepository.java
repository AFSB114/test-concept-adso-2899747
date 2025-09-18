package com.sena.managing_medical_appointments.parameterization.repository;

import com.sena.managing_medical_appointments.parameterization.model.entity.Role;
import com.sena.managing_medical_appointments.shared.IRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for Role entity operations.
 * Extends the base IRepository interface for common CRUD operations.
 */
@Repository
public interface IRoleRepository extends IRepository<Role, Long> {
    // Additional custom query methods can be added here if needed
}