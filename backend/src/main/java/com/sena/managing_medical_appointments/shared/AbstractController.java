package com.sena.managing_medical_appointments.shared;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Abstract base controller class that provides common REST endpoints for CRUD operations.
 * All entity controllers should extend this class.
 *
 * @param <T> The entity type
 * @param <ID> The entity's primary key type
 * @param <REQ> The request DTO type
 * @param <RES> The response DTO type
 */
@RequiredArgsConstructor
public abstract class AbstractController<T extends BaseEntity, ID, REQ, RES> {

    protected final IService<T, ID, REQ, RES> service;

    /**
     * Get the base path for the controller (e.g., "/api/patients")
     * @return Base path string
     */
    protected abstract String getBasePath();

    @GetMapping
    @Operation(summary = "Get all entities", description = "Retrieve a list of all active entities")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved entities"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<List<RES>> findAll() {
        List<RES> entities = service.findAll();
        return ResponseEntity.ok(entities);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get entity by ID", description = "Retrieve a specific entity by its ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Successfully retrieved entity"),
        @ApiResponse(responseCode = "404", description = "Entity not found"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<RES> findById(@PathVariable ID id) {
        RES entity = service.findById(id);
        if (entity == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(entity);
    }

    @PostMapping
    @Operation(summary = "Create new entity", description = "Create a new entity with the provided data")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "Entity created successfully"),
        @ApiResponse(responseCode = "400", description = "Invalid request data"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<RES> create(@RequestBody REQ request) {
        RES createdEntity = service.create(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdEntity);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update entity", description = "Update an existing entity with the provided data")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Entity updated successfully"),
        @ApiResponse(responseCode = "404", description = "Entity not found"),
        @ApiResponse(responseCode = "400", description = "Invalid request data"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<RES> update(@PathVariable ID id, @RequestBody REQ request) {
        RES updatedEntity = service.update(id, request);
        if (updatedEntity == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updatedEntity);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete entity", description = "Soft delete an entity by its ID")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "204", description = "Entity deleted successfully"),
        @ApiResponse(responseCode = "404", description = "Entity not found"),
        @ApiResponse(responseCode = "500", description = "Internal server error")
    })
    public ResponseEntity<Void> delete(@PathVariable ID id) {
        if (!service.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}