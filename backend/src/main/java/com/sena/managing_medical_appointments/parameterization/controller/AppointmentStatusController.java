package com.sena.managing_medical_appointments.parameterization.controller;

import com.sena.managing_medical_appointments.parameterization.model.dto.req.AppointmentStatusRequestDTO;
import com.sena.managing_medical_appointments.parameterization.model.dto.res.AppointmentStatusResponseDTO;
import com.sena.managing_medical_appointments.parameterization.model.entity.AppointmentStatus;
import com.sena.managing_medical_appointments.parameterization.iservice.IAppointmentStatusService;
import com.sena.managing_medical_appointments.shared.AbstractController;
import com.sena.managing_medical_appointments.shared.ApiResponseDto;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/appointment-statuses")
public class AppointmentStatusController extends AbstractController<AppointmentStatus, AppointmentStatusRequestDTO, AppointmentStatusResponseDTO, IAppointmentStatusService> {

    public AppointmentStatusController(IAppointmentStatusService service) {
        super(service, "AppointmentStatus");
    }
}