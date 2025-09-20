package com.sena.managing_medical_appointments.patients.repository;

import com.sena.managing_medical_appointments.patients.model.entity.MedicalHistory;
import com.sena.managing_medical_appointments.shared.IRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IMedicalHistoryRepository extends IRepository<MedicalHistory, Long> {

    @Query("SELECT mh FROM MedicalHistory mh WHERE mh.patient.id = :patientId AND mh.deletedAt IS NULL")
    List<MedicalHistory> findByPatientId(@Param("patientId") Long patientId);
}