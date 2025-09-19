package com.sena.managing_medical_appointments.patients.controller;

import com.sena.managing_medical_appointments.patients.iservice.IPatientService;
import com.sena.managing_medical_appointments.patients.model.dto.req.PatientRequestDTO;
import com.sena.managing_medical_appointments.patients.model.dto.res.PatientResponseDTO;
import com.sena.managing_medical_appointments.patients.model.entity.Patient;
import com.sena.managing_medical_appointments.shared.AbstractController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/patients")
public class PatientController extends AbstractController<Patient, PatientRequestDTO, PatientResponseDTO, IPatientService> {

    public PatientController(IPatientService service) {
        super(service, "Patient");
    }
}