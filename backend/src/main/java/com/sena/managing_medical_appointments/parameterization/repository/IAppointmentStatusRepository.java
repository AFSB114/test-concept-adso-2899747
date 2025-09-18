package com.sena.managing_medical_appointments.parameterization.repository;

import com.sena.managing_medical_appointments.parameterization.model.entity.AppointmentStatus;
import com.sena.managing_medical_appointments.shared.IRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IAppointmentStatusRepository extends IRepository<AppointmentStatus, Long> {
    // Additional custom query methods can be added here if needed
}