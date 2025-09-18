package com.sena.managing_medical_appointments.appointments.repository;

import com.sena.managing_medical_appointments.appointments.model.entity.Hospital;
import com.sena.managing_medical_appointments.shared.IRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IHospitalRepository extends IRepository<Hospital, Long> {
}