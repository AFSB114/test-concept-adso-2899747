package com.sena.managing_medical_appointments.appointments.controller;

import com.sena.managing_medical_appointments.appointments.iservice.IHospitalService;
import com.sena.managing_medical_appointments.appointments.model.dto.req.HospitalRequestDTO;
import com.sena.managing_medical_appointments.appointments.model.dto.res.HospitalResponseDTO;
import com.sena.managing_medical_appointments.appointments.model.entity.Hospital;
import com.sena.managing_medical_appointments.shared.AbstractController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/hospitals")
public class HospitalController extends AbstractController<Hospital, HospitalRequestDTO, HospitalResponseDTO, IHospitalService> {

    public HospitalController(IHospitalService service) {
        super(service, "Hospital");
    }
}