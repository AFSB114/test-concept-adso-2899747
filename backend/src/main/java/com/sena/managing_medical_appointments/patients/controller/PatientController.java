package com.sena.managing_medical_appointments.patients.controller;

import com.sena.managing_medical_appointments.patients.iservice.IMedicalHistoryService;
import com.sena.managing_medical_appointments.patients.iservice.IPatientService;
import com.sena.managing_medical_appointments.patients.model.dto.req.MedicalHistoryRequestDTO;
import com.sena.managing_medical_appointments.patients.model.dto.req.PatientRequestDTO;
import com.sena.managing_medical_appointments.patients.model.dto.res.MedicalHistoryResponseDTO;
import com.sena.managing_medical_appointments.patients.model.dto.res.PatientResponseDTO;
import com.sena.managing_medical_appointments.patients.model.entity.MedicalHistory;
import com.sena.managing_medical_appointments.patients.model.entity.Patient;
import com.sena.managing_medical_appointments.shared.AbstractController;
import com.sena.managing_medical_appointments.shared.ApiResponseDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
public class PatientController extends AbstractController<Patient, PatientRequestDTO, PatientResponseDTO, IPatientService> {

    @Autowired
    private IMedicalHistoryService medicalHistoryService;

    public PatientController(IPatientService service) {
        super(service, "Patient");
    }

    @GetMapping("/{id}/history")
    public ResponseEntity<ApiResponseDto<List<MedicalHistoryResponseDTO>>> getPatientHistory(@PathVariable Long id) {
        try {
            List<MedicalHistory> histories = medicalHistoryService.findByPatientId(id);
            List<MedicalHistoryResponseDTO> dtos = histories.stream()
                    .map(medicalHistoryService::mapToResDto)
                    .toList();
            return ResponseEntity.ok(new ApiResponseDto<>("Historial médico obtenido", dtos, true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponseDto<>(e.getMessage(), null, false));
        }
    }

    @PostMapping("/{id}/history")
    public ResponseEntity<ApiResponseDto<MedicalHistoryResponseDTO>> addMedicalHistory(
            @PathVariable Long id,
            @RequestBody MedicalHistoryRequestDTO request) {
        try {
            request.setPatientId(id);
            MedicalHistory entity = medicalHistoryService.mapToEntity(request);
            MedicalHistory saved = medicalHistoryService.save(entity);
            MedicalHistoryResponseDTO dto = medicalHistoryService.mapToResDto(saved);
            return ResponseEntity.ok(new ApiResponseDto<>("Historial médico agregado", dto, true));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponseDto<>(e.getMessage(), null, false));
        }
    }
}