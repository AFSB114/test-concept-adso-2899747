"use client"

import { useState, useEffect } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Appointment, Patient, Doctor, AppointmentType, AppointmentStatus } from "@/lib/types"
import { patientService } from "@/lib/patient-service"
import { doctorService } from "@/lib/doctor-service"
import { appointmentConfigService } from "@/lib/appointment-config-service"
import { User, Calendar, Clock, Stethoscope, MapPin, FileText, Phone, Mail } from "lucide-react"

interface AppointmentDetailDialogProps {
  appointment: Appointment
  open: boolean
  onClose: () => void
}

export function AppointmentDetailDialog({ appointment, open, onClose }: AppointmentDetailDialogProps) {
  const [patients, setPatients] = useState<Patient[]>([])
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [appointmentTypes, setAppointmentTypes] = useState<AppointmentType[]>([])
  const [appointmentStatuses, setAppointmentStatuses] = useState<AppointmentStatus[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open && appointment) {
      loadReferenceData()
    }
  }, [open, appointment])

  const loadReferenceData = async () => {
    try {
      setLoading(true)
      const [patientsResponse, doctorsResponse, typesResponse, statusesResponse] = await Promise.all([
        patientService.getPatients(1, 100, { isActive: true }),
        doctorService.getDoctors(1, 100, { isActive: true }),
        appointmentConfigService.getAppointmentTypes(),
        appointmentConfigService.getAppointmentStatuses(),
      ])
      setPatients(patientsResponse.data)
      setDoctors(doctorsResponse.data)
      setAppointmentTypes(typesResponse.data)
      setAppointmentStatuses(statusesResponse.data)
    } catch (err) {
      console.error("Error loading reference data:", err)
    } finally {
      setLoading(false)
    }
  }

  const getPatientInfo = (patientId: number) => {
    const patient = patients.find(p => p.id === patientId)
    return {
      firstName: patient?.name || "Paciente",
      lastName: patient?.lastName || "no encontrado",
      email: patient?.email || "",
      phone: patient?.phone || ""
    }
  }

  const getDoctorInfo = (doctorId: number) => {
    const doctor = doctors.find(d => d.id === doctorId)
    return {
      firstName: doctor?.name || "Doctor",
      lastName: doctor?.lastName || "no encontrado",
      email: doctor?.email || "",
      phone: doctor?.phone || "",
      specialty: { name: doctor?.specialty?.name || "N/A" }
    }
  }

  const getAppointmentTypeInfo = (typeId: number) => {
    const type = appointmentTypes.find(t => t.id === typeId)
    return type || { name: "Tipo no encontrado" }
  }

  const getAppointmentStatusInfo = (statusId: number) => {
    const status = appointmentStatuses.find(s => s.id === statusId)
    return status || { name: "Estado no encontrado" }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (timeString: string) => {
    return timeString.slice(0, 5) // Remove seconds if present
  }

  const getStatusColor = (statusName: string) => {
    switch (statusName) {
      case "programada":
        return "secondary"
      case "confirmada":
        return "default"
      case "en_curso":
        return "default"
      case "completada":
        return "default"
      case "cancelada":
        return "destructive"
      case "no_asistio":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const patientInfo = getPatientInfo(appointment.patientId)
  const doctorInfo = getDoctorInfo(appointment.doctorId)
  const appointmentTypeInfo = getAppointmentTypeInfo(appointment.appointmentTypeId)
  const appointmentStatusInfo = getAppointmentStatusInfo(appointment.statusId)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Detalles de la Cita
          </DialogTitle>
          <DialogDescription>Información completa de la cita médica</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Patient Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                Información del Paciente
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Nombre:</span>
                <span>
                  {patientInfo.firstName} {patientInfo.lastName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Email:</span>
                <span>{patientInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Teléfono:</span>
                <span>{patientInfo.phone}</span>
              </div>
            </CardContent>
          </Card>

          {/* Doctor Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Stethoscope className="h-5 w-5" />
                Información del Doctor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Doctor:</span>
                <span>
                  Dr. {doctorInfo.firstName} {doctorInfo.lastName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Stethoscope className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Especialidad:</span>
                <Badge variant="outline">{doctorInfo.specialty.name}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Email:</span>
                <span>{doctorInfo.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Teléfono:</span>
                <span>{doctorInfo.phone}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Appointment Details */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Detalles de la Cita
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Fecha:</span>
                <span>{formatDate(appointment.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Hora:</span>
                <span>{formatTime(appointment.time)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Duración:</span>
                <span>30 minutos</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <span className="font-medium">Tipo:</span>
                <Badge variant="outline">{appointmentTypeInfo.name}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Estado:</span>
                <Badge variant={getStatusColor(appointmentStatusInfo.name) as "default" | "secondary" | "destructive" | "outline"}>
                  {appointmentStatusInfo.name.replace("_", " ")}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* System Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Información del Sistema</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Creada:</span>
              <span>{new Date(appointment.createdAt).toLocaleString("es-ES")}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Última actualización:</span>
              <span>{new Date(appointment.updatedAt).toLocaleString("es-ES")}</span>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={onClose}>Cerrar</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
