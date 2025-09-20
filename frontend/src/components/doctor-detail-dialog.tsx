"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Doctor } from "@/lib/types"
import { User, Phone, Mail, Stethoscope, Calendar, Clock, FileText } from "lucide-react"

interface DoctorDetailDialogProps {
  doctor: Doctor
  open: boolean
  onClose: () => void
}

export function DoctorDetailDialog({ doctor, open, onClose }: DoctorDetailDialogProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const getDayName = (dayOfWeek: number) => {
    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    return days[dayOfWeek]
  }

  const formatTime = (time: string) => {
    return time.slice(0, 5) // Remove seconds if present
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5" />
            Dr. {doctor.name} {doctor.lastName}
          </DialogTitle>
          <DialogDescription>Información detallada del doctor</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <User className="h-5 w-5" />
                Información Personal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Nombre:</span>
                <span>
                  {doctor.name} {doctor.lastName}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Email:</span>
                <span>{doctor.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Teléfono:</span>
                <span>{doctor.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Stethoscope className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Especialidad:</span>
                <Badge variant="outline">{doctor.specialty.name}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Estado:</span>
                <Badge variant={doctor.isActive ? "default" : "secondary"}>
                  {doctor.isActive ? "Activo" : "Inactivo"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Specialty Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Stethoscope className="h-5 w-5" />
                Especialidad
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-medium text-lg">{doctor.specialty.name}</h4>
                <p className="text-sm text-muted-foreground mt-1">{doctor.specialty.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium">Estado de la especialidad:</span>
                <Badge variant={doctor.specialty.isActive ? "default" : "secondary"}>
                  {doctor.specialty.isActive ? "Activa" : "Inactiva"}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Work Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Horarios de Trabajo
            </CardTitle>
            <CardDescription>Días y horarios de atención del doctor</CardDescription>
          </CardHeader>
          <CardContent>
            {doctor.shifts && doctor.shifts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {doctor.shifts
                  .filter((shift) => shift.isActive)
                  .sort((a, b) => a.dayOfWeek - b.dayOfWeek)
                  .map((shift) => (
                    <div key={shift.id} className="p-3 border rounded-lg">
                      <div className="font-medium">{getDayName(shift.dayOfWeek)}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-center py-8 text-muted-foreground">No hay horarios configurados</p>
            )}
          </CardContent>
        </Card>

        {/* System Information */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Información del Sistema
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Fecha de Registro:</span>
              <span>{formatDate(doctor.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">Última Actualización:</span>
              <span>{formatDate(doctor.updatedAt)}</span>
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
