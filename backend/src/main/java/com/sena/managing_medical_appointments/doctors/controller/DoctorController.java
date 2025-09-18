package com.sena.managing_medical_appointments.doctors.controller;

import com.sena.managing_medical_appointments.doctors.model.dto.req.DoctorRequestDTO;
import com.sena.managing_medical_appointments.doctors.model.dto.res.DoctorResponseDTO;
import com.sena.managing_medical_appointments.doctors.model.entity.Doctor;
import com.sena.managing_medical_appointments.doctors.iservice.IDoctorService;
import com.sena.managing_medical_appointments.shared.AbstractController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/doctors")
public class DoctorController extends AbstractController<Doctor, DoctorRequestDTO, DoctorResponseDTO, IDoctorService> {

    public DoctorController(IDoctorService service) {
        super(service, "Doctor");
    }
}