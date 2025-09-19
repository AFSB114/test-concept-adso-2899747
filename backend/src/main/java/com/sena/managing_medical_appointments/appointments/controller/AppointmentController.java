package com.sena.managing_medical_appointments.appointments.controller;

import com.sena.managing_medical_appointments.appointments.iservice.IAppointmentService;
import com.sena.managing_medical_appointments.appointments.model.dto.req.AppointmentRequestDTO;
import com.sena.managing_medical_appointments.appointments.model.dto.res.AppointmentResponseDTO;
import com.sena.managing_medical_appointments.appointments.model.entity.Appointment;
import com.sena.managing_medical_appointments.shared.AbstractController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController extends AbstractController<Appointment, AppointmentRequestDTO, AppointmentResponseDTO, IAppointmentService> {

    public AppointmentController(IAppointmentService service) {
        super(service, "Appointment");
    }
}