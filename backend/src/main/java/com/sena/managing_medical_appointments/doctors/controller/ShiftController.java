package com.sena.managing_medical_appointments.doctors.controller;

import com.sena.managing_medical_appointments.doctors.model.dto.req.ShiftRequestDTO;
import com.sena.managing_medical_appointments.doctors.model.dto.res.ShiftResponseDTO;
import com.sena.managing_medical_appointments.doctors.model.entity.Shift;
import com.sena.managing_medical_appointments.doctors.iservice.IShiftService;
import com.sena.managing_medical_appointments.shared.AbstractController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/shifts")
public class ShiftController extends AbstractController<Shift, ShiftRequestDTO, ShiftResponseDTO, IShiftService> {

    public ShiftController(IShiftService service) {
        super(service, "Shift");
    }
}