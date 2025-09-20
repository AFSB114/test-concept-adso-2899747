"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { doctorService } from "@/lib/doctor-service"
import { specialtyService } from "@/lib/specialty-service"
import type { Doctor, Specialty, DoctorFilters } from "@/lib/types"
import { Search, Plus, Eye, Stethoscope, Clock } from "lucide-react"
import { DoctorDialog } from "./doctor-dialog"
import { DoctorDetailDialog } from "./doctor-detail-dialog"
import { DoctorShiftsDialog } from "./doctor-shifts-dialog"

export function DoctorTable() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [specialties, setSpecialties] = useState<Specialty[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filters, setFilters] = useState<DoctorFilters>({})
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [dialogMode, setDialogMode] = useState<"create" | "edit" | "view" | "shifts" | null>(null)

  useEffect(() => {
    loadDoctors()
    loadSpecialties()
  }, [page, filters])

  const loadDoctors = async () => {
    try {
      setLoading(true)
      const response = await doctorService.getDoctors(page, 10, {
        ...filters,
        search: searchTerm || undefined,
      })
      setDoctors(response.data)
      setTotalPages(response.pagination.totalPages)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar doctores")
    } finally {
      setLoading(false)
    }
  }

  const loadSpecialties = async () => {
    try {
      const response = await specialtyService.getSpecialties()
      setSpecialties(response.data)
    } catch (err) {
      console.error("Error loading specialties:", err)
    }
  }

  const handleSearch = () => {
    setPage(1)
    setFilters({ ...filters, search: searchTerm })
  }

  const handleFilterChange = (key: keyof DoctorFilters, value: string | number | boolean | undefined) => {
    setPage(1)
    setFilters({ ...filters, [key]: value })
  }

  const handleEdit = (doctor: Doctor) => {
    setSelectedDoctor(doctor)
    setDialogMode("edit")
  }

  const handleView = (doctor: Doctor) => {
    setSelectedDoctor(doctor)
    setDialogMode("view")
  }

  const handleShifts = (doctor: Doctor) => {
    setSelectedDoctor(doctor)
    setDialogMode("shifts")
  }

  const handleDelete = async (doctor: Doctor) => {
    if (!confirm(`¿Estás seguro de eliminar al doctor ${doctor.name} ${doctor.lastName}?`)) {
      return
    }

    try {
      await doctorService.deleteDoctor(doctor.id)
      loadDoctors()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar doctor")
    }
  }

  const handleDialogClose = () => {
    setSelectedDoctor(null)
    setDialogMode(null)
    loadDoctors()
  }

  const getSpecialtyName = (specialtyId: number) => {
    const specialty = specialties.find((s) => s.id === specialtyId)
    return specialty?.name || "Sin especialidad"
  }

  const getDayName = (dayOfWeek: number) => {
    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    return days[dayOfWeek]
  }

  const getShiftSummary = () => {
    return "Sin horarios"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5" />
            Gestión de Doctores
          </CardTitle>
          <CardDescription>Administra la información de los doctores y sus especialidades</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters and Search */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Buscar por nombre, email o número de licencia..."
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
                Nuevo Doctor
              </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <Select onValueChange={(value) => handleFilterChange("specialtyId", value === "all" ? undefined : value)}>
                <SelectTrigger className="w-full md:w-64">
                  <SelectValue placeholder="Filtrar por especialidad" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las especialidades</SelectItem>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty.id} value={specialty.id.toString()}>
                      {specialty.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                onValueChange={(value) =>
                  handleFilterChange("isActive", value === "all" ? undefined : value === "true")
                }
              >
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filtrar por estado" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los estados</SelectItem>
                  <SelectItem value="true">Activos</SelectItem>
                  <SelectItem value="false">Inactivos</SelectItem>
                </SelectContent>
              </Select>
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
                  <TableHead>Doctor</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Especialidad</TableHead>
                  <TableHead>Licencia</TableHead>
                  <TableHead>Horarios</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      Cargando doctores...
                    </TableCell>
                  </TableRow>
                ) : doctors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No se encontraron doctores
                    </TableCell>
                  </TableRow>
                ) : (
                  doctors.map((doctor) => (
                    <TableRow key={doctor.id}>
                      <TableCell className="font-medium">
                        {doctor.name} {doctor.lastName}
                      </TableCell>
                      <TableCell>{doctor.email}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{doctor.specialty.name}</Badge>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{doctor.licenseNumber || "N/A"}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">Sin horarios</TableCell>
                      <TableCell>
                        <Badge variant={doctor.isActive ? "default" : "secondary"}>
                          {doctor.isActive ? "Activo" : "Inactivo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleView(doctor)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleShifts(doctor)}>
                            <Clock className="h-4 w-4" />
                          </Button>
                          {/* Additional action buttons can be added here */}
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
        <DoctorDialog
          doctor={selectedDoctor}
          mode={dialogMode}
          open={true}
          onClose={handleDialogClose}
          specialties={specialties}
        />
      )}

      {dialogMode === "view" && selectedDoctor && (
        <DoctorDetailDialog doctor={selectedDoctor} open={true} onClose={handleDialogClose} />
      )}

      {dialogMode === "shifts" && selectedDoctor && (
        <DoctorShiftsDialog doctor={selectedDoctor} open={true} onClose={handleDialogClose} />
      )}
    </div>
  )
}
