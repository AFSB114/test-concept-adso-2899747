"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { appointmentService } from "@/lib/appointment-service"
import { patientService } from "@/lib/patient-service"
import { doctorService } from "@/lib/doctor-service"
import { appointmentConfigService } from "@/lib/appointment-config-service"
import type { Patient, Doctor, AppointmentType } from "@/lib/types"
import { Calendar, Loader2, Plus } from "lucide-react"

interface QuickAppointmentFormProps {
  onSuccess?: () => void
}

export function QuickAppointmentForm({ onSuccess }: QuickAppointmentFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [patients, setPatients] = useState<Patient[]>([])
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [appointmentTypes, setAppointmentTypes] = useState<AppointmentType[]>([])
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: "",
    appointmentTypeId: "",
    scheduledDate: "",
    scheduledTime: "",
  })

  useEffect(() => {
    loadInitialData()
  }, [])

  useEffect(() => {
    if (formData.doctorId && formData.scheduledDate) {
      loadAvailableSlots()
    }
  }, [formData.doctorId, formData.scheduledDate])

  const loadInitialData = async () => {
    try {
      const [patientsResponse, doctorsResponse, typesResponse] = await Promise.all([
        patientService.getPatients(1, 50, { isActive: true }),
        doctorService.getDoctors(1, 50, { isActive: true }),
        appointmentConfigService.getAppointmentTypes(),
      ])
      setPatients(patientsResponse.data)
      setDoctors(doctorsResponse.data)
      setAppointmentTypes(typesResponse.data)
    } catch (err) {
      setError("Error al cargar datos iniciales")
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
      const patient = patients.find((p) => p.id === formData.patientId)!
      const doctor = doctors.find((d) => d.id === formData.doctorId)!
      const appointmentType = appointmentTypes.find((t) => t.id === formData.appointmentTypeId)!

      await appointmentService.createAppointment({
        patientId: formData.patientId,
        patient,
        doctorId: formData.doctorId,
        doctor,
        appointmentTypeId: formData.appointmentTypeId,
        appointmentType,
        statusId: "1", // Default to "programada"
        status: { id: "1", name: "programada", color: "#6b7280", isActive: true },
        scheduledDate: formData.scheduledDate,
        scheduledTime: formData.scheduledTime,
        duration: appointmentType.duration,
        notes: "",
      })

      // Reset form
      setFormData({
        patientId: "",
        doctorId: "",
        appointmentTypeId: "",
        scheduledDate: "",
        scheduledTime: "",
      })

      onSuccess?.()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al crear cita")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Agendar Cita Rápida
        </CardTitle>
        <CardDescription>Programa una nueva cita médica de forma rápida</CardDescription>
      </CardHeader>
      <CardContent>
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="appointmentTypeId">Tipo de Cita *</Label>
              <Select
                value={formData.appointmentTypeId}
                onValueChange={(value) => handleInputChange("appointmentTypeId", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Tipo" />
                </SelectTrigger>
                <SelectContent>
                  {appointmentTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

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
              <Select
                value={formData.scheduledTime}
                onValueChange={(value) => handleInputChange("scheduledTime", value)}
                disabled={!formData.doctorId || !formData.scheduledDate}
              >
                <SelectTrigger>
                  <SelectValue placeholder={loadingSlots ? "Cargando..." : "Hora"} />
                </SelectTrigger>
                <SelectContent>
                  {availableSlots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Agendando...
              </>
            ) : (
              <>
                <Calendar className="mr-2 h-4 w-4" />
                Agendar Cita
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
