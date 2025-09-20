package com.sena.managing_medical_appointments.doctors.controller;

import com.sena.managing_medical_appointments.doctors.model.dto.req.DoctorRequestDTO;
import com.sena.managing_medical_appointments.doctors.model.dto.req.ShiftRequestDTO;
import com.sena.managing_medical_appointments.doctors.model.dto.res.DoctorResponseDTO;
import com.sena.managing_medical_appointments.doctors.model.dto.res.ShiftResponseDTO;
import com.sena.managing_medical_appointments.doctors.model.entity.Doctor;
import com.sena.managing_medical_appointments.doctors.model.entity.Shift;
import com.sena.managing_medical_appointments.doctors.iservice.IDoctorService;
import com.sena.managing_medical_appointments.doctors.iservice.IShiftService;
import com.sena.managing_medical_appointments.shared.AbstractController;
import com.sena.managing_medical_appointments.shared.ApiResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController extends AbstractController<Doctor, DoctorRequestDTO, DoctorResponseDTO, IDoctorService> {

    @Autowired
    private IShiftService shiftService;

    public DoctorController(IDoctorService service) {
        super(service, "Doctor");
    }

    @GetMapping("/{id}/shifts")
    public ResponseEntity<ApiResponseDto<List<ShiftResponseDTO>>> getDoctorShifts(@PathVariable Long id) {
        try {
            List<Shift> shifts = shiftService.findByDoctorId(id);
            List<ShiftResponseDTO> dtos = shifts.stream()
                    .map(shiftService::mapToResDto)
                    .toList();
            return ResponseEntity.ok(new ApiResponseDto<>("Turnos del doctor obtenidos", dtos, true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponseDto<>(e.getMessage(), null, false));
        }
    }

    @PutMapping("/{id}/shifts")
    public ResponseEntity<ApiResponseDto<List<ShiftResponseDTO>>> updateDoctorShifts(
            @PathVariable Long id,
            @RequestBody List<ShiftRequestDTO> requests) {
        try {
            // Delete existing shifts
            List<Shift> existingShifts = shiftService.findByDoctorId(id);
            for (Shift shift : existingShifts) {
                shiftService.delete(shift.getId());
            }

            // Create new shifts
            List<Shift> newShifts = requests.stream()
                    .map(request -> {
                        request.setDoctorId(id);
                        return shiftService.mapToEntity(request);
                    })
                    .toList();

            List<Shift> savedShifts = newShifts.stream()
                    .map(shift -> {
                        try {
                            return shiftService.save(shift);
                        } catch (Exception e) {
                            throw new RuntimeException(e);
                        }
                    })
                    .toList();

            List<ShiftResponseDTO> dtos = savedShifts.stream()
                    .map(shiftService::mapToResDto)
                    .toList();

            return ResponseEntity.ok(new ApiResponseDto<>("Turnos del doctor actualizados", dtos, true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponseDto<>(e.getMessage(), null, false));
        }
    }

    @GetMapping("/specialty/{specialtyId}")
    public ResponseEntity<ApiResponseDto<List<DoctorResponseDTO>>> getDoctorsBySpecialty(@PathVariable Long specialtyId) {
        try {
            List<Doctor> doctors = service.findBySpecialtyId(specialtyId);
            List<DoctorResponseDTO> dtos = doctors.stream()
                    .map(service::mapToResDto)
                    .toList();
            return ResponseEntity.ok(new ApiResponseDto<>("Doctores por especialidad obtenidos", dtos, true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponseDto<>(e.getMessage(), null, false));
        }
    }
}