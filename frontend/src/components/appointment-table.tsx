"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { appointmentService } from "@/lib/appointment-service"
import { appointmentConfigService } from "@/lib/appointment-config-service"
import type { Appointment, AppointmentFilters, AppointmentType, AppointmentStatus } from "@/lib/types"
import { Search, Plus, Edit, Eye, Trash2, Calendar, CheckCircle, XCircle, Clock } from "lucide-react"
import { AppointmentDialog } from "./appointment-dialog"
import { AppointmentDetailDialog } from "./appointment-detail-dialog"

export function AppointmentTable() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [appointmentTypes, setAppointmentTypes] = useState<AppointmentType[]>([])
  const [appointmentStatuses, setAppointmentStatuses] = useState<AppointmentStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filters, setFilters] = useState<AppointmentFilters>({})
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null)
  const [dialogMode, setDialogMode] = useState<"create" | "edit" | "view" | null>(null)

  useEffect(() => {
    loadAppointments()
    loadAppointmentConfig()
  }, [page, filters])

  const loadAppointments = async () => {
    try {
      setLoading(true)
      const response = await appointmentService.getAppointments(page, 10, {
        ...filters,
        search: searchTerm || undefined,
      })
      setAppointments(response.data)
      setTotalPages(response.pagination.totalPages)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar citas")
    } finally {
      setLoading(false)
    }
  }

  const loadAppointmentConfig = async () => {
    try {
      const [typesResponse, statusesResponse] = await Promise.all([
        appointmentConfigService.getAppointmentTypes(),
        appointmentConfigService.getAppointmentStatuses(),
      ])
      setAppointmentTypes(typesResponse.data)
      setAppointmentStatuses(statusesResponse.data)
    } catch (err) {
      console.error("Error loading appointment config:", err)
    }
  }

  const handleSearch = () => {
    setPage(1)
    setFilters({ ...filters, search: searchTerm })
  }

  const handleFilterChange = (key: keyof AppointmentFilters, value: any) => {
    setPage(1)
    setFilters({ ...filters, [key]: value })
  }

  const handleEdit = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setDialogMode("edit")
  }

  const handleView = (appointment: Appointment) => {
    setSelectedAppointment(appointment)
    setDialogMode("view")
  }

  const handleDelete = async (appointment: Appointment) => {
    if (!confirm(`¿Estás seguro de eliminar la cita del ${formatDate(appointment.scheduledDate)}?`)) {
      return
    }

    try {
      await appointmentService.deleteAppointment(appointment.id)
      loadAppointments()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar cita")
    }
  }

  const handleConfirm = async (appointment: Appointment) => {
    try {
      await appointmentService.confirmAppointment(appointment.id)
      loadAppointments()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al confirmar cita")
    }
  }

  const handleCancel = async (appointment: Appointment) => {
    const reason = prompt("Motivo de cancelación (opcional):")
    try {
      await appointmentService.cancelAppointment(appointment.id, reason || undefined)
      loadAppointments()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cancelar cita")
    }
  }

  const handleComplete = async (appointment: Appointment) => {
    const notes = prompt("Notas de la consulta (opcional):")
    try {
      await appointmentService.completeAppointment(appointment.id, notes || undefined)
      loadAppointments()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al completar cita")
    }
  }

  const handleDialogClose = () => {
    setSelectedAppointment(null)
    setDialogMode(null)
    loadAppointments()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
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

  const getStatusName = (statusId: string) => {
    const status = appointmentStatuses.find((s) => s.id === statusId)
    return status?.name || "Desconocido"
  }

  const getTypeName = (typeId: string) => {
    const type = appointmentTypes.find((t) => t.id === typeId)
    return type?.name || "Sin tipo"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Gestión de Citas
          </CardTitle>
          <CardDescription>Administra las citas médicas del sistema</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters and Search */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Buscar por paciente, doctor o notas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button onClick={handleSearch} variant="outline">
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
              <Button onClick={() => setDialogMode("create")}>
                <Plus className="h-4 w-4 mr-2" />
                Nueva Cita
              </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <Select onValueChange={(value) => handleFilterChange("statusId", value === "all" ? undefined : value)}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  {appointmentStatuses.map((status) => (
                    <SelectItem key={status.id} value={status.id}>
                      {status.name.replace("_", " ")}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                onValueChange={(value) => handleFilterChange("appointmentTypeId", value === "all" ? undefined : value)}
              >
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los tipos</SelectItem>
                  {appointmentTypes.map((type) => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Input
                  type="date"
                  placeholder="Fecha desde"
                  onChange={(e) => handleFilterChange("dateFrom", e.target.value || undefined)}
                  className="w-full md:w-40"
                />
                <Input
                  type="date"
                  placeholder="Fecha hasta"
                  onChange={(e) => handleFilterChange("dateTo", e.target.value || undefined)}
                  className="w-full md:w-40"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4">
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Table */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Paciente</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      Cargando citas...
                    </TableCell>
                  </TableRow>
                ) : appointments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No se encontraron citas
                    </TableCell>
                  </TableRow>
                ) : (
                  appointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">
                        {appointment.patient.firstName} {appointment.patient.lastName}
                      </TableCell>
                      <TableCell>
                        Dr. {appointment.doctor.firstName} {appointment.doctor.lastName}
                      </TableCell>
                      <TableCell>{formatDate(appointment.scheduledDate)}</TableCell>
                      <TableCell>{formatTime(appointment.scheduledTime)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{getTypeName(appointment.appointmentTypeId)}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(getStatusName(appointment.statusId)) as any}>
                          {getStatusName(appointment.statusId).replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="sm" onClick={() => handleView(appointment)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(appointment)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          {getStatusName(appointment.statusId) === "programada" && (
                            <Button variant="ghost" size="sm" onClick={() => handleConfirm(appointment)}>
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          )}
                          {["programada", "confirmada"].includes(getStatusName(appointment.statusId)) && (
                            <>
                              <Button variant="ghost" size="sm" onClick={() => handleCancel(appointment)}>
                                <XCircle className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleComplete(appointment)}>
                                <Clock className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(appointment)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-muted-foreground">
                Página {page} de {totalPages}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
                  Anterior
                </Button>
                <Button variant="outline" size="sm" disabled={page === totalPages} onClick={() => setPage(page + 1)}>
                  Siguiente
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Dialogs */}
      {dialogMode && (dialogMode === "create" || dialogMode === "edit") && (
        <AppointmentDialog
          appointment={selectedAppointment}
          mode={dialogMode}
          open={true}
          onClose={handleDialogClose}
          appointmentTypes={appointmentTypes}
          appointmentStatuses={appointmentStatuses}
        />
      )}

      {dialogMode === "view" && selectedAppointment && (
        <AppointmentDetailDialog appointment={selectedAppointment} open={true} onClose={handleDialogClose} />
      )}
    </div>
  )
}
