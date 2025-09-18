"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { appointmentService } from "@/lib/appointment-service"
import type { Appointment } from "@/lib/types"
import { Calendar, Clock, User, Eye, AlertCircle, RefreshCw } from "lucide-react"
import { AppointmentDetailDialog } from "@/components/appointment-detail-dialog"

export function RecentAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)

  useEffect(() => {
    loadRecentAppointments()
  }, [])

  const loadRecentAppointments = async () => {
    try {
      setLoading(true)
      setError(null)
      const today = new Date().toISOString().split("T")[0]
      const response = await appointmentService.getAppointments(1, 10, {
        dateFrom: today,
        dateTo: today,
      })
      setAppointments(response.data)
    } catch (err) {
      setError("No se pudieron cargar las citas de hoy")
      console.error("Error loading recent appointments:", err)
      setAppointments([])
    } finally {
      setLoading(false)
    }
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

  const formatTime = (timeString: string) => {
    return timeString.slice(0, 5)
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Próximas Citas
          </CardTitle>
          <CardDescription>Citas programadas para hoy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between animate-pulse">
                <div className="space-y-1">
                  <div className="h-4 bg-muted rounded w-32"></div>
                  <div className="h-3 bg-muted rounded w-24"></div>
                </div>
                <div className="h-6 bg-muted rounded w-16"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Próximas Citas
          </CardTitle>
          <CardDescription>Citas programadas para hoy</CardDescription>
        </CardHeader>
        <CardContent>
          {error ? (
            <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-lg">
              <div className="flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-destructive" />
                <div>
                  <p className="font-medium text-destructive">Error al cargar citas</p>
                  <p className="text-sm text-muted-foreground">{error}</p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={loadRecentAppointments} disabled={loading}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Reintentar
              </Button>
            </div>
          ) : appointments.length === 0 ? (
            <p className="text-center py-8 text-muted-foreground">No hay citas programadas para hoy</p>
          ) : (
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">
                      {appointment.patient.firstName} {appointment.patient.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground flex items-center gap-2">
                      <User className="h-3 w-3" />
                      Dr. {appointment.doctor.firstName} {appointment.doctor.lastName}
                      <Clock className="h-3 w-3 ml-2" />
                      {formatTime(appointment.scheduledTime)}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusColor(appointment.status?.name || "programada") as any}>
                      {appointment.status?.name?.replace("_", " ") || "Programada"}
                    </Badge>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedAppointment(appointment)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {selectedAppointment && (
        <AppointmentDetailDialog
          appointment={selectedAppointment}
          open={true}
          onClose={() => setSelectedAppointment(null)}
        />
      )}
    </>
  )
}
