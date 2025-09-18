package com.sena.managing_medical_appointments.parameterization.repository;

import com.sena.managing_medical_appointments.parameterization.model.entity.AppointmentType;
import com.sena.managing_medical_appointments.shared.IRepository;

/**
 * Repository interface for AppointmentType entity operations.
 * Extends the base IRepository interface for common CRUD operations.
 */
public interface IAppointmentTypeRepository extends IRepository<AppointmentType, Long> {
    // Additional custom query methods can be added here if needed
}