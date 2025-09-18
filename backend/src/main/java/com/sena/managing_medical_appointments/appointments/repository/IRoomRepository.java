package com.sena.managing_medical_appointments.appointments.repository;

import com.sena.managing_medical_appointments.appointments.model.entity.Room;
import com.sena.managing_medical_appointments.shared.IRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IRoomRepository extends IRepository<Room, Long> {
}