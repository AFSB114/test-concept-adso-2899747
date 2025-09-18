package com.sena.managing_medical_appointments.parameterization.controller;

import com.sena.managing_medical_appointments.parameterization.model.dto.req.SpecialtyRequestDTO;
import com.sena.managing_medical_appointments.parameterization.model.dto.res.SpecialtyResponseDTO;
import com.sena.managing_medical_appointments.parameterization.model.entity.Specialty;
import com.sena.managing_medical_appointments.parameterization.iservice.ISpecialtyService;
import com.sena.managing_medical_appointments.shared.AbstractController;
import com.sena.managing_medical_appointments.shared.ApiResponseDto;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/specialties")
public class SpecialtyController extends AbstractController<Specialty, SpecialtyRequestDTO, SpecialtyResponseDTO, ISpecialtyService> {

    public SpecialtyController(ISpecialtyService service) {
        super(service, "Specialty");
    }
}