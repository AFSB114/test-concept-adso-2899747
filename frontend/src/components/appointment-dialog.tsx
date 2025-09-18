"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { appointmentService } from "@/lib/appointment-service"
import { patientService } from "@/lib/patient-service"
import { doctorService } from "@/lib/doctor-service"
import type { Appointment, AppointmentType, AppointmentStatus, Patient, Doctor } from "@/lib/types"
import { Loader2 } from "lucide-react"

interface AppointmentDialogProps {
  appointment?: Appointment | null
  mode: "create" | "edit"
  open: boolean
  onClose: () => void
  appointmentTypes: AppointmentType[]
  appointmentStatuses: AppointmentStatus[]
  initialData?: { date: string; time: string } | null // Added initialData prop for calendar integration
}

export function AppointmentDialog({
  appointment,
  mode,
  open,
  onClose,
  appointmentTypes,
  appointmentStatuses,
  initialData, // Added initialData parameter
}: AppointmentDialogProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [patients, setPatients] = useState<Patient[]>([])
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    appointmentTypeId: "",
    statusId: "",
    scheduledDate: "",
    scheduledTime: "",
    duration: 30,
    notes: "",
    roomNumber: "",
  })

  useEffect(() => {
    if (open) {
      loadPatients()
      loadDoctors()
    }
  }, [open])

  useEffect(() => {
    if (appointment && mode === "edit") {
      setFormData({
        patientId: appointment.patientId,
        doctorId: appointment.doctorId,
        appointmentTypeId: appointment.appointmentTypeId,
        statusId: appointment.statusId,
        scheduledDate: appointment.scheduledDate.split("T")[0],
        scheduledTime: appointment.scheduledTime,
        duration: appointment.duration,
        notes: appointment.notes,
        roomNumber: appointment.roomNumber || "",
      })
    } else if (mode === "create") {
      const defaultStatus = appointmentStatuses.find((s) => s.name === "programada")
      setFormData({
        patientId: "",
        doctorId: "",
        appointmentTypeId: "",
        statusId: defaultStatus?.id || "",
        scheduledDate: initialData?.date || "",
        scheduledTime: initialData?.time || "",
        duration: 30,
        notes: "",
        roomNumber: "",
      })
    }
  }, [appointment, mode, appointmentStatuses, initialData]) // Added initialData to dependencies

  useEffect(() => {
    if (formData.doctorId && formData.scheduledDate) {
      loadAvailableSlots()
    }
  }, [formData.doctorId, formData.scheduledDate])

  const loadPatients = async () => {
    try {
      const response = await patientService.getPatients(1, 100, { isActive: true })
      setPatients(response.data)
    } catch (err) {
      console.error("Error loading patients:", err)
    }
  }

  const loadDoctors = async () => {
    try {
      const response = await doctorService.getDoctors(1, 100, { isActive: true })
      setDoctors(response.data)
    } catch (err) {
      console.error("Error loading doctors:", err)
    }
  }

  const loadAvailableSlots = async () => {
    try {
      setLoadingSlots(true)
      const response = await appointmentService.getAvailableSlots(formData.doctorId, formData.scheduledDate)
      setAvailableSlots(response.data)
    } catch (err) {
      console.error("Error loading available slots:", err)
      setAvailableSlots([])
    } finally {
      setLoadingSlots(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const appointmentData = {
        ...formData,
        patient: patients.find((p) => p.id === formData.patientId)!,
        doctor: doctors.find((d) => d.id === formData.doctorId)!,
        appointmentType: appointmentTypes.find((t) => t.id === formData.appointmentTypeId)!,
        status: appointmentStatuses.find((s) => s.id === formData.statusId)!,
      }

      if (mode === "create") {
        await appointmentService.createAppointment(appointmentData)
      } else if (appointment) {
        await appointmentService.updateAppointment(appointment.id, formData)
      }
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar cita")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value })

    // Update duration when appointment type changes
    if (field === "appointmentTypeId") {
      const selectedType = appointmentTypes.find((t) => t.id === value)
      if (selectedType) {
        setFormData((prev) => ({ ...prev, [field]: value, duration: selectedType.duration }))
      }
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Nueva Cita" : "Editar Cita"}</DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Completa la información para programar una nueva cita"
              : "Modifica la información de la cita"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md">
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="patientId">Paciente *</Label>
              <Select value={formData.patientId} onValueChange={(value) => handleInputChange("patientId", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el paciente" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id}>
                      {patient.firstName} {patient.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="doctorId">Doctor *</Label>
              <Select value={formData.doctorId} onValueChange={(value) => handleInputChange("doctorId", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el doctor" />
                </SelectTrigger>
                <SelectContent>
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      Dr. {doctor.firstName} {doctor.lastName} - {doctor.specialty.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="appointmentTypeId">Tipo de Cita *</Label>
              <Select
                value={formData.appointmentTypeId}
                onValueChange={(value) => handleInputChange("appointmentTypeId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el tipo" />
                </SelectTrigger>
                <SelectContent>
                  {appointmentTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name} ({type.duration} min)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="statusId">Estado *</Label>
              <Select value={formData.statusId} onValueChange={(value) => handleInputChange("statusId", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el estado" />
                </SelectTrigger>
                <SelectContent>
                  {appointmentStatuses.map((status) => (
                    <SelectItem key={status.id} value={status.id}>
                      {status.name.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="scheduledDate">Fecha *</Label>
              <Input
                id="scheduledDate"
                type="date"
                value={formData.scheduledDate}
                onChange={(e) => handleInputChange("scheduledDate", e.target.value)}
                required
                disabled={loading}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="scheduledTime">Hora *</Label>
              {formData.doctorId && formData.scheduledDate ? (
                <Select
                  value={formData.scheduledTime}
                  onValueChange={(value) => handleInputChange("scheduledTime", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={loadingSlots ? "Cargando..." : "Selecciona la hora"} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>
                        {slot}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id="scheduledTime"
                  type="time"
                  value={formData.scheduledTime}
                  onChange={(e) => handleInputChange("scheduledTime", e.target.value)}
                  required
                  disabled={loading}
                />
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">Duración (minutos)</Label>
              <Input
                id="duration"
                type="number"
                value={formData.duration}
                onChange={(e) => handleInputChange("duration", Number.parseInt(e.target.value))}
                min="15"
                max="180"
                step="15"
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="roomNumber">Sala/Consultorio</Label>
              <Input
                id="roomNumber"
                value={formData.roomNumber}
                onChange={(e) => handleInputChange("roomNumber", e.target.value)}
                placeholder="Ej: Consultorio 1"
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notas</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Notas adicionales sobre la cita"
              disabled={loading}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : mode === "create" ? (
                "Crear Cita"
              ) : (
                "Guardar Cambios"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
