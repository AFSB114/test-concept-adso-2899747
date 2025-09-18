package com.sena.managing_medical_appointments.patients.controller;

import com.sena.managing_medical_appointments.patients.iservice.IMedicalHistoryService;
import com.sena.managing_medical_appointments.patients.model.dto.req.MedicalHistoryRequestDTO;
import com.sena.managing_medical_appointments.patients.model.dto.res.MedicalHistoryResponseDTO;
import com.sena.managing_medical_appointments.patients.model.entity.MedicalHistory;
import com.sena.managing_medical_appointments.shared.AbstractController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/medical-histories")
public class MedicalHistoryController extends AbstractController<MedicalHistory, MedicalHistoryRequestDTO, MedicalHistoryResponseDTO, IMedicalHistoryService> {

    public MedicalHistoryController(IMedicalHistoryService service) {
        super(service, "MedicalHistory");
    }
}