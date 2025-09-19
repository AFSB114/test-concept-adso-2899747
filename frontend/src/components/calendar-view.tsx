"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { appointmentService } from "@/lib/appointment-service"
import { doctorService } from "@/lib/doctor-service"
import type { Appointment, Doctor } from "@/lib/types"
import { Calendar, ChevronLeft, ChevronRight, Plus } from "lucide-react"
import { AppointmentDialog } from "@/components/appointment-dialog"
import { AppointmentDetailDialog } from "@/components/appointment-detail-dialog"
import { appointmentConfigService } from "@/lib/appointment-config-service"

type ViewMode = "day" | "week" | "month"

export function CalendarView() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [appointmentTypes, setAppointmentTypes] = useState<any[]>([])
  const [appointmentStatuses, setAppointmentStatuses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [currentDate, setCurrentDate] = useState(new Date())
  const [viewMode, setViewMode] = useState<ViewMode>("week")
  const [selectedDoctor, setSelectedDoctor] = useState<string>("all")
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [dialogMode, setDialogMode] = useState<"create" | "view" | null>(null)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<{ date: string; time: string } | null>(null)

  useEffect(() => {
    loadData()
  }, [currentDate, viewMode, selectedDoctor])

  const loadData = async () => {
    try {
      setLoading(true)
      const [appointmentsResponse, doctorsResponse, typesResponse, statusesResponse] = await Promise.all([
        appointmentService.getAppointments(1, 100, {
          dateFrom: getDateRangeStart().toISOString().split("T")[0],
          dateTo: getDateRangeEnd().toISOString().split("T")[0],
          doctorId: selectedDoctor === "all" ? undefined : selectedDoctor,
        }),
        doctorService.getDoctors(1, 100, { isActive: true }),
        appointmentConfigService.getAppointmentTypes(),
        appointmentConfigService.getAppointmentStatuses(),
      ])
      setAppointments(appointmentsResponse.data)
      setDoctors(doctorsResponse.data)
      setAppointmentTypes(typesResponse.data)
      setAppointmentStatuses(statusesResponse.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar datos")
    } finally {
      setLoading(false)
    }
  }

  const getDateRangeStart = () => {
    const date = new Date(currentDate)
    switch (viewMode) {
      case "day":
        return date
      case "week":
        const dayOfWeek = date.getDay()
        const diff = date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1) // Monday as first day
        return new Date(date.setDate(diff))
      case "month":
        return new Date(date.getFullYear(), date.getMonth(), 1)
      default:
        return date
    }
  }

  const getDateRangeEnd = () => {
    const date = new Date(currentDate)
    switch (viewMode) {
      case "day":
        return date
      case "week":
        const start = getDateRangeStart()
        return new Date(start.getTime() + 6 * 24 * 60 * 60 * 1000)
      case "month":
        return new Date(date.getFullYear(), date.getMonth() + 1, 0)
      default:
        return date
    }
  }

  const navigateDate = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate)
    switch (viewMode) {
      case "day":
        newDate.setDate(newDate.getDate() + (direction === "next" ? 1 : -1))
        break
      case "week":
        newDate.setDate(newDate.getDate() + (direction === "next" ? 7 : -7))
        break
      case "month":
        newDate.setMonth(newDate.getMonth() + (direction === "next" ? 1 : -1))
        break
    }
    setCurrentDate(newDate)
  }

  const getAppointmentsForDate = (date: Date) => {
    const dateStr = date.toISOString().split("T")[0]
    return appointments.filter((apt) => apt.scheduledDate.split("T")[0] === dateStr)
  }

  const getAppointmentsForTimeSlot = (date: Date, hour: number) => {
    const dateAppointments = getAppointmentsForDate(date)
    return dateAppointments.filter((apt) => {
      const aptHour = Number.parseInt(apt.scheduledTime.split(":")[0])
      return aptHour === hour
    })
  }

  const handleTimeSlotClick = (date: Date, hour: number) => {
    const timeStr = `${hour.toString().padStart(2, "0")}:00`
    setSelectedTimeSlot({
      date: date.toISOString().split("T")[0],
      time: timeStr,
    })
    setDialogMode("create")
  }

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setDialogMode("view")
  }

  const handleDialogClose = () => {
    setSelectedAppointment(null)
    setSelectedTimeSlot(null)
    setDialogMode(null)
    loadData()
  }

  const getStatusColor = (statusName: string) => {
    switch (statusName) {
      case "programada":
        return "bg-gray-100 text-gray-800 border-gray-300"
      case "confirmada":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "en_curso":
        return "bg-green-100 text-green-800 border-green-300"
      case "completada":
        return "bg-emerald-100 text-emerald-800 border-emerald-300"
      case "cancelada":
        return "bg-red-100 text-red-800 border-red-300"
      case "no_asistio":
        return "bg-orange-100 text-orange-800 border-orange-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const formatDateHeader = () => {
    switch (viewMode) {
      case "day":
        return currentDate.toLocaleDateString("es-ES", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      case "week":
        const start = getDateRangeStart()
        const end = getDateRangeEnd()
        return `${start.toLocaleDateString("es-ES", { month: "short", day: "numeric" })} - ${end.toLocaleDateString("es-ES", { month: "short", day: "numeric", year: "numeric" })}`
      case "month":
        return currentDate.toLocaleDateString("es-ES", { year: "numeric", month: "long" })
      default:
        return ""
    }
  }

  const renderDayView = () => {
    const hours = Array.from({ length: 12 }, (_, i) => i + 8) // 8 AM to 7 PM
    const dayAppointments = getAppointmentsForDate(currentDate)

    return (
      <div className="space-y-2">
        {hours.map((hour) => {
          const timeSlotAppointments = getAppointmentsForTimeSlot(currentDate, hour)
          return (
            <div key={hour} className="flex border rounded-lg min-h-16">
              <div className="w-20 p-3 bg-muted text-center text-sm font-medium border-r">
                {hour.toString().padStart(2, "0")}:00
              </div>
              <div
                className="flex-1 p-2 cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => handleTimeSlotClick(currentDate, hour)}
              >
                {timeSlotAppointments.length > 0 ? (
                  <div className="space-y-1">
                    {timeSlotAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className={`p-2 rounded border text-xs cursor-pointer hover:shadow-sm transition-shadow ${getStatusColor(appointment.status.name)}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAppointmentClick(appointment)
                        }}
                      >
                        <div className="font-medium">
                          {appointment.patient.firstName} {appointment.patient.lastName}
                        </div>
                        <div className="text-xs opacity-75">
                          Dr. {appointment.doctor.firstName} {appointment.doctor.lastName}
                        </div>
                        <div className="text-xs opacity-75">{appointment.appointmentType.name}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground text-sm">Disponible</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderWeekView = () => {
    const startDate = getDateRangeStart()
    const days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      return date
    })
    const hours = Array.from({ length: 12 }, (_, i) => i + 8) // 8 AM to 7 PM

    return (
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header */}
          <div className="grid grid-cols-8 gap-1 mb-2">
            <div className="p-2"></div>
            {days.map((day) => (
              <div key={day.toISOString()} className="p-2 text-center">
                <div className="text-sm font-medium">{day.toLocaleDateString("es-ES", { weekday: "short" })}</div>
                <div className="text-lg font-bold">{day.getDate()}</div>
              </div>
            ))}
          </div>

          {/* Time slots */}
          {hours.map((hour) => (
            <div key={hour} className="grid grid-cols-8 gap-1 mb-1">
              <div className="p-2 text-center text-sm font-medium bg-muted rounded">
                {hour.toString().padStart(2, "0")}:00
              </div>
              {days.map((day) => {
                const timeSlotAppointments = getAppointmentsForTimeSlot(day, hour)
                return (
                  <div
                    key={`${day.toISOString()}-${hour}`}
                    className="min-h-16 p-1 border rounded cursor-pointer hover:bg-muted/50 transition-colors"
                    onClick={() => handleTimeSlotClick(day, hour)}
                  >
                    {timeSlotAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className={`p-1 rounded text-xs mb-1 cursor-pointer hover:shadow-sm transition-shadow ${getStatusColor(appointment.status.name)}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAppointmentClick(appointment)
                        }}
                      >
                        <div className="font-medium truncate">
                          {appointment.patient.firstName} {appointment.patient.lastName}
                        </div>
                        <div className="text-xs opacity-75 truncate">{appointment.appointmentType.name}</div>
                      </div>
                    ))}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderMonthView = () => {
    const startDate = getDateRangeStart()
    const endDate = getDateRangeEnd()
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)

    // Calculate calendar grid
    const startCalendar = new Date(firstDayOfMonth)
    const dayOfWeek = firstDayOfMonth.getDay()
    startCalendar.setDate(startCalendar.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))

    const days = []
    const current = new Date(startCalendar)
    for (let i = 0; i < 42; i++) {
      days.push(new Date(current))
      current.setDate(current.getDate() + 1)
    }

    return (
      <div className="grid grid-cols-7 gap-1">
        {/* Header */}
        {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"].map((day) => (
          <div key={day} className="p-2 text-center font-medium bg-muted rounded">
            {day}
          </div>
        ))}

        {/* Calendar days */}
        {days.map((day) => {
          const isCurrentMonth = day.getMonth() === currentDate.getMonth()
          const dayAppointments = getAppointmentsForDate(day)
          const isToday = day.toDateString() === new Date().toDateString()

          return (
            <div
              key={day.toISOString()}
              className={`min-h-24 p-1 border rounded cursor-pointer hover:bg-muted/50 transition-colors ${
                !isCurrentMonth ? "opacity-50" : ""
              } ${isToday ? "bg-primary/10 border-primary" : ""}`}
              onClick={() => handleTimeSlotClick(day, 9)} // Default to 9 AM
            >
              <div className="text-sm font-medium mb-1">{day.getDate()}</div>
              <div className="space-y-1">
                {dayAppointments.slice(0, 3).map((appointment) => (
                  <div
                    key={appointment.id}
                    className={`p-1 rounded text-xs cursor-pointer hover:shadow-sm transition-shadow ${getStatusColor(appointment.status.name)}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAppointmentClick(appointment)
                    }}
                  >
                    <div className="font-medium truncate">
                      {appointment.scheduledTime.slice(0, 5)} {appointment.patient.firstName}
                    </div>
                  </div>
                ))}
                {dayAppointments.length > 3 && (
                  <div className="text-xs text-muted-foreground">+{dayAppointments.length - 3} más</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Calendario de Citas
              </CardTitle>
              <CardDescription>Vista de calendario para gestionar citas médicas</CardDescription>
            </div>
            <Button onClick={() => setDialogMode("create")}>
              <Plus className="h-4 w-4 mr-2" />
              Nueva Cita
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={() => navigateDate("prev")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <div className="min-w-64 text-center font-medium">{formatDateHeader()}</div>
              <Button variant="outline" size="sm" onClick={() => navigateDate("next")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex gap-2">
              <Select value={viewMode} onValueChange={(value: ViewMode) => setViewMode(value)}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="day">Día</SelectItem>
                  <SelectItem value="week">Semana</SelectItem>
                  <SelectItem value="month">Mes</SelectItem>
                </SelectContent>
              </Select>

              <Select value={selectedDoctor} onValueChange={setSelectedDoctor}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los doctores</SelectItem>
                  {doctors.map((doctor) => (
                    <SelectItem key={doctor.id} value={doctor.id}>
                      Dr. {doctor.firstName} {doctor.lastName}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button variant="outline" onClick={() => setCurrentDate(new Date())}>
                Hoy
              </Button>
            </div>
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4">
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Calendar Content */}
          {loading ? (
            <div className="text-center py-8">Cargando calendario...</div>
          ) : (
            <div className="bg-background rounded-lg border p-4">
              {viewMode === "day" && renderDayView()}
              {viewMode === "week" && renderWeekView()}
              {viewMode === "month" && renderMonthView()}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      {dialogMode === "create" && (
        <AppointmentDialog
          appointment={null}
          mode="create"
          open={true}
          onClose={handleDialogClose}
          appointmentTypes={appointmentTypes}
          appointmentStatuses={appointmentStatuses}
          initialData={selectedTimeSlot}
        />
      )}

      {dialogMode === "view" && selectedAppointment && (
        <AppointmentDetailDialog appointment={selectedAppointment} open={true} onClose={handleDialogClose} />
      )}
    </div>
  )
}
