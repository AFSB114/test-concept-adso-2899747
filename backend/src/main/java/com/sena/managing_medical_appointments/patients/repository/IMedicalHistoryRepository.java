package com.sena.managing_medical_appointments.patients.repository;

import com.sena.managing_medical_appointments.patients.model.entity.MedicalHistory;
import com.sena.managing_medical_appointments.shared.IRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IMedicalHistoryRepository extends IRepository<MedicalHistory, Long> {
}