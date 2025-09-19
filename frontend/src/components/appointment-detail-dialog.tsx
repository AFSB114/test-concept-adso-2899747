"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Appointment } from "@/lib/types"
import { User, Calendar, Clock, Stethoscope, MapPin, FileText, Phone, Mail } from "lucide-react"

interface AppointmentDetailDialogProps {
  appointment: Appointment
  open: boolean
  onClose: () => void
}

export function AppointmentDetailDialog({ appointment, open, onClose }: AppointmentDetailDialogProps) {
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
                  {appointment.patient.firstName} {appointment.patient.lastName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Email:</span>
                <span>{appointment.patient.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Teléfono:</span>
                <span>{appointment.patient.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Género:</span>
                <span>
                  {appointment.patient.gender === "M"
                    ? "Masculino"
                    : appointment.patient.gender === "F"
                      ? "Femenino"
                      : "Otro"}
                </span>
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
                  Dr. {appointment.doctor.firstName} {appointment.doctor.lastName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Stethoscope className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Especialidad:</span>
                <Badge variant="outline">{appointment.doctor.specialty.name}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Email:</span>
                <span>{appointment.doctor.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Teléfono:</span>
                <span>{appointment.doctor.phone}</span>
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
                <span>{formatDate(appointment.scheduledDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Hora:</span>
                <span>{formatTime(appointment.scheduledTime)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Duración:</span>
                <span>{appointment.duration} minutos</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <span className="font-medium">Tipo:</span>
                <Badge variant="outline">{appointment.appointmentType.name}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Estado:</span>
                <Badge variant={getStatusColor(appointment.status.name) as any}>
                  {appointment.status.name.replace("_", " ")}
                </Badge>
              </div>
              {appointment.roomNumber && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Sala:</span>
                  <span>{appointment.roomNumber}</span>
                </div>
              )}
            </div>

            {appointment.notes && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Notas:</span>
                </div>
                <p className="text-sm text-muted-foreground bg-muted p-3 rounded-md">{appointment.notes}</p>
              </div>
            )}
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
