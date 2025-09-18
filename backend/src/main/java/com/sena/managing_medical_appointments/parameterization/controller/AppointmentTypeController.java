package com.sena.managing_medical_appointments.parameterization.controller;

import com.sena.managing_medical_appointments.parameterization.model.dto.req.AppointmentTypeRequestDTO;
import com.sena.managing_medical_appointments.parameterization.model.dto.res.AppointmentTypeResponseDTO;
import com.sena.managing_medical_appointments.parameterization.model.entity.AppointmentType;
import com.sena.managing_medical_appointments.parameterization.iservice.IAppointmentTypeService;
import com.sena.managing_medical_appointments.shared.AbstractController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/appointment-types")
public class AppointmentTypeController extends AbstractController<AppointmentType, AppointmentTypeRequestDTO, AppointmentTypeResponseDTO, IAppointmentTypeService> {

    public AppointmentTypeController(IAppointmentTypeService service) {
        super(service, "AppointmentType");
    }
}