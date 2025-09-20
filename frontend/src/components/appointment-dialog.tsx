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
import { hospitalService } from "@/lib/hospital-service"
import { roomService } from "@/lib/room-service"
import type { Appointment, AppointmentType, AppointmentStatus, Patient, Doctor, Hospital, Room } from "@/lib/types"
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
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [rooms, setRooms] = useState<Room[]>([])
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    appointmentTypeId: "",
    statusId: "",
    hospitalId: "",
    roomId: "",
    date: "",
    time: "",
    duration: 30,
    notes: "",
  })

  useEffect(() => {
    if (open) {
      loadPatients()
      loadDoctors()
      loadHospitals()
    }
  }, [open])

  useEffect(() => {
    if (appointment && mode === "edit") {
      setFormData({
        patientId: appointment.patientId.toString(),
        doctorId: appointment.doctorId.toString(),
        appointmentTypeId: appointment.appointmentTypeId.toString(),
        statusId: appointment.statusId.toString(),
        hospitalId: "", // TODO: Add hospital support to Appointment type
        roomId: "", // TODO: Add room support to Appointment type
        date: appointment.date,
        time: appointment.time.length > 5 ? appointment.time.substring(0, 5) : appointment.time,
        duration: 30, // No está en el tipo Appointment, usar valor por defecto
        notes: "", // No está en el tipo Appointment
        // roomNumber removed - now using roomId from select
      })
    } else if (mode === "create") {
      const defaultStatus = appointmentStatuses.find((s) => s.name === "SCHEDULED")
      setFormData({
        patientId: "",
        doctorId: "",
        appointmentTypeId: "",
        statusId: defaultStatus?.id.toString() || "",
        hospitalId: "",
        roomId: "",
        date: initialData?.date || "",
        time: initialData?.time ? (initialData.time.length > 5 ? initialData.time.substring(0, 5) : initialData.time) : "",
        duration: 30,
        notes: "",
        // roomNumber removed - now using roomId from select
      })
    }
  }, [appointment, mode, appointmentStatuses, initialData])

  useEffect(() => {
    if (formData.doctorId && formData.date) {
      loadAvailableSlots()
    }
  }, [formData.doctorId, formData.date])

  useEffect(() => {
    if (formData.hospitalId) {
      loadRooms(formData.hospitalId)
      // Reset room selection when hospital changes
      setFormData(prev => ({ ...prev, roomId: "" }))
    } else {
      setRooms([])
    }
  }, [formData.hospitalId])

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

  const loadHospitals = async () => {
    try {
      const response = await hospitalService.getHospitals(1, 100)
      setHospitals(response.data)
    } catch (err) {
      console.error("Error loading hospitals:", err)
    }
  }

  const loadRooms = async (hospitalId?: string) => {
    try {
      if (hospitalId) {
        const response = await roomService.getRoomsByHospital(hospitalId)
        setRooms(response.data)
      } else {
        setRooms([])
      }
    } catch (err) {
      console.error("Error loading rooms:", err)
      setRooms([])
    }
  }

  const loadAvailableSlots = async () => {
    try {
      setLoadingSlots(true)
      // Note: This method may not exist in the service, we'll need to handle this
      // const response = await appointmentService.getAvailableSlots(Number(formData.doctorId), formData.date)
      // const slots = response.data.map(slot => slot.length > 5 ? slot.substring(0, 5) : slot)
      // setAvailableSlots(slots)

      // Temporary: provide some default time slots for demonstration
      // In a real implementation, this would come from the backend
      const defaultSlots = [
        "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
        "14:00", "14:30", "15:00", "15:30", "16:00", "16:30"
      ]
      setAvailableSlots(defaultSlots)
    } catch (err) {
      console.error("Error loading available slots:", err)
      // Provide fallback slots even on error
      setAvailableSlots(["09:00", "10:00", "11:00", "14:00", "15:00", "16:00"])
    } finally {
      setLoadingSlots(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Validar que todos los campos requeridos estén presentes
      if (!formData.patientId || !formData.doctorId || !formData.appointmentTypeId || !formData.statusId || !formData.date || !formData.time) {
        throw new Error("Todos los campos marcados con * son obligatorios")
      }

      const appointmentData = {
        patientId: Number(formData.patientId),
        doctorId: Number(formData.doctorId),
        appointmentTypeId: Number(formData.appointmentTypeId),
        statusId: Number(formData.statusId),
        hospitalId: formData.hospitalId ? Number(formData.hospitalId) : undefined,
        roomId: formData.roomId ? Number(formData.roomId) : undefined,
        date: formData.date,
        time: formatTimeForBackend(formData.time),
      }

      if (mode === "create") {
        await appointmentService.createAppointment(appointmentData)
      } else if (appointment) {
        await appointmentService.updateAppointment(appointment.id.toString(), {
          patientId: Number(formData.patientId),
          doctorId: Number(formData.doctorId),
          appointmentTypeId: Number(formData.appointmentTypeId),
          statusId: Number(formData.statusId),
          hospitalId: formData.hospitalId ? Number(formData.hospitalId) : undefined,
          roomId: formData.roomId ? Number(formData.roomId) : undefined,
          date: formData.date,
          time: formatTimeForBackend(formData.time),
        })
      }
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar cita")
    } finally {
      setLoading(false)
    }
  }

  const formatTimeForBackend = (time: string): string => {
    return time.length === 5 ? `${time}:00` : time
  }

  const handleInputChange = (field: string, value: string | number) => {
    const stringValue = typeof value === 'number' ? value.toString() : value
    setFormData({ ...formData, [field]: stringValue })

    // Update duration when appointment type changes
    if (field === "appointmentTypeId") {
      const selectedType = appointmentTypes.find((t) => t.id === Number(value))
      if (selectedType) {
        // Note: duration is not available in AppointmentType, using default
        setFormData((prev) => ({ ...prev, [field]: stringValue, duration: 30 }))
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
                    <SelectItem key={patient.id} value={patient.id.toString()}>
                      {patient.name} {patient.lastName}
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
                    <SelectItem key={doctor.id} value={doctor.id.toString()}>
                      Dr. {doctor.name} {doctor.lastName} - {doctor.specialty.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="hospitalId">Hospital</Label>
              <Select value={formData.hospitalId} onValueChange={(value) => handleInputChange("hospitalId", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona el hospital" />
                </SelectTrigger>
                <SelectContent>
                  {hospitals.map((hospital) => (
                    <SelectItem key={hospital.id} value={hospital.id.toString()}>
                      {hospital.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="roomId">Sala/Consultorio</Label>
              <Select
                value={formData.roomId}
                onValueChange={(value) => handleInputChange("roomId", value)}
                disabled={!formData.hospitalId}
              >
                <SelectTrigger>
                  <SelectValue placeholder={formData.hospitalId ? "Selecciona la sala" : "Primero selecciona un hospital"} />
                </SelectTrigger>
                <SelectContent>
                  {rooms.map((room) => (
                    <SelectItem key={room.id} value={room.id.toString()}>
                      {room.name}
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
                    <SelectItem key={type.id} value={type.id.toString()}>
                      {type.name}
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
                    <SelectItem key={status.id} value={status.id.toString()}>
                      {status.name.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Fecha *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => handleInputChange("date", e.target.value)}
                required
                disabled={loading}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Hora *</Label>
              {formData.doctorId && formData.date && availableSlots.length > 0 ? (
                <Select
                  value={formData.time}
                  onValueChange={(value) => handleInputChange("time", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={loadingSlots ? "Cargando horarios..." : formData.time ? formData.time : "Selecciona la hora"} />
                  </SelectTrigger>
                  <SelectContent>
                    {availableSlots.map((slot) => (
                      <SelectItem key={slot} value={slot.length > 5 ? slot.substring(0, 5) : slot}>
                        {slot.length > 5 ? slot.substring(0, 5) : slot}
                      </SelectItem>
                    ))}
                    {formData.time && !availableSlots.includes(formData.time) && !availableSlots.includes(formData.time + ":00") && (
                      <SelectItem key="custom" value={formData.time}>
                        {formData.time} (hora actual)
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
              ) : (
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => handleInputChange("time", e.target.value)}
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
