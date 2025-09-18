package com.sena.managing_medical_appointments.patients.repository;

import com.sena.managing_medical_appointments.patients.model.entity.Patient;
import com.sena.managing_medical_appointments.shared.IRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IPatientRepository extends IRepository<Patient, Long> {
}