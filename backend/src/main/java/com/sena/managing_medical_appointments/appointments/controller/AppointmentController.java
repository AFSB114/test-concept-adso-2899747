package com.sena.managing_medical_appointments.appointments.controller;

import com.sena.managing_medical_appointments.appointments.iservice.IAppointmentService;
import com.sena.managing_medical_appointments.appointments.model.dto.req.AppointmentRequestDTO;
import com.sena.managing_medical_appointments.appointments.model.dto.res.AppointmentResponseDTO;
import com.sena.managing_medical_appointments.appointments.model.entity.Appointment;
import com.sena.managing_medical_appointments.shared.AbstractController;
import com.sena.managing_medical_appointments.shared.ApiResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController extends AbstractController<Appointment, AppointmentRequestDTO, AppointmentResponseDTO, IAppointmentService> {

    @Autowired
    private IAppointmentService appointmentService;

    public AppointmentController(IAppointmentService service) {
        super(service, "Appointment");
    }

    @GetMapping("/patient/{patientId}")
    public ResponseEntity<ApiResponseDto<List<AppointmentResponseDTO>>> getPatientAppointments(@PathVariable Long patientId) {
        try {
            List<Appointment> appointments = appointmentService.findByPatientId(patientId);
            List<AppointmentResponseDTO> dtos = appointments.stream()
                    .map(appointmentService::mapToResDto)
                    .toList();
            return ResponseEntity.ok(new ApiResponseDto<>("Citas del paciente obtenidas", dtos, true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponseDto<>(e.getMessage(), null, false));
        }
    }

    @GetMapping("/doctor/{doctorId}")
    public ResponseEntity<ApiResponseDto<List<AppointmentResponseDTO>>> getDoctorAppointments(
            @PathVariable Long doctorId,
            @RequestParam(required = false) String date) {
        try {
            List<Appointment> appointments;
            if (date != null && !date.isEmpty()) {
                appointments = appointmentService.findByDoctorIdAndDate(doctorId, date);
            } else {
                appointments = appointmentService.findByDoctorId(doctorId);
            }
            List<AppointmentResponseDTO> dtos = appointments.stream()
                    .map(appointmentService::mapToResDto)
                    .toList();
            return ResponseEntity.ok(new ApiResponseDto<>("Citas del doctor obtenidas", dtos, true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponseDto<>(e.getMessage(), null, false));
        }
    }
}