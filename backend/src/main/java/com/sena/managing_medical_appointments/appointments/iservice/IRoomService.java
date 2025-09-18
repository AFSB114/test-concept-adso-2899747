package com.sena.managing_medical_appointments.appointments.iservice;

import com.sena.managing_medical_appointments.appointments.model.dto.req.RoomRequestDTO;
import com.sena.managing_medical_appointments.appointments.model.dto.res.RoomResponseDTO;
import com.sena.managing_medical_appointments.appointments.model.entity.Room;
import com.sena.managing_medical_appointments.shared.IService;

public interface IRoomService extends IService<Room, RoomRequestDTO, RoomResponseDTO> {
}