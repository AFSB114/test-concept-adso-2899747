package com.sena.managing_medical_appointments.doctors.repository;

import com.sena.managing_medical_appointments.doctors.model.entity.Shift;
import com.sena.managing_medical_appointments.shared.IRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface IShiftRepository extends IRepository<Shift, Long> {

    @Query("SELECT s FROM Shift s WHERE s.doctor.id = :doctorId AND s.deletedAt IS NULL")
    List<Shift> findByDoctorId(@Param("doctorId") Long doctorId);
}