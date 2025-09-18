package com.sena.managing_medical_appointments.doctors.repository;

import com.sena.managing_medical_appointments.doctors.model.entity.Shift;
import com.sena.managing_medical_appointments.shared.IRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IShiftRepository extends IRepository<Shift, Long> {
}