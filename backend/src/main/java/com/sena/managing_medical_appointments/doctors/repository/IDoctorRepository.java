package com.sena.managing_medical_appointments.doctors.repository;

import com.sena.managing_medical_appointments.doctors.model.entity.Doctor;
import com.sena.managing_medical_appointments.shared.IRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IDoctorRepository extends IRepository<Doctor, Long> {

    @Query("SELECT d FROM Doctor d WHERE d.specialty.id = :specialtyId AND d.deletedAt IS NULL")
    List<Doctor> findBySpecialtyId(@Param("specialtyId") Long specialtyId);
}