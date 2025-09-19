package com.sena.managing_medical_appointments.appointments.controller;

import com.sena.managing_medical_appointments.appointments.iservice.IRoomService;
import com.sena.managing_medical_appointments.appointments.model.dto.req.RoomRequestDTO;
import com.sena.managing_medical_appointments.appointments.model.dto.res.RoomResponseDTO;
import com.sena.managing_medical_appointments.appointments.model.entity.Room;
import com.sena.managing_medical_appointments.shared.AbstractController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/rooms")
public class RoomController extends AbstractController<Room, RoomRequestDTO, RoomResponseDTO, IRoomService> {

    public RoomController(IRoomService service) {
        super(service, "Room");
    }
}