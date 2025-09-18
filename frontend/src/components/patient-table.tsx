"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { patientService } from "@/lib/patient-service"
import type { Patient, PatientFilters } from "@/lib/types"
import { Search, Plus, Edit, Eye, Trash2 } from "lucide-react"
import { PatientDialog } from "./patient-dialog"
import { PatientDetailDialog } from "./patient-detail-dialog"

export function PatientTable() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [filters, setFilters] = useState<PatientFilters>({})
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null)
  const [dialogMode, setDialogMode] = useState<"create" | "edit" | "view" | null>(null)

  useEffect(() => {
    loadPatients()
  }, [page, filters])

  const loadPatients = async () => {
    try {
      setLoading(true)
      const response = await patientService.getPatients(page, 10, {
        ...filters,
        search: searchTerm || undefined,
      })
      setPatients(response.data)
      setTotalPages(response.pagination.totalPages)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar pacientes")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    setPage(1)
    setFilters({ ...filters, search: searchTerm })
  }

  const handleFilterChange = (key: keyof PatientFilters, value: any) => {
    setPage(1)
    setFilters({ ...filters, [key]: value })
  }

  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient)
    setDialogMode("edit")
  }

  const handleView = (patient: Patient) => {
    setSelectedPatient(patient)
    setDialogMode("view")
  }

  const handleDelete = async (patient: Patient) => {
    if (!confirm(`¿Estás seguro de eliminar al paciente ${patient.firstName} ${patient.lastName}?`)) {
      return
    }

    try {
      await patientService.deletePatient(patient.id)
      loadPatients()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar paciente")
    }
  }

  const handleDialogClose = () => {
    setSelectedPatient(null)
    setDialogMode(null)
    loadPatients()
  }

  const getAgeFromBirthDate = (birthDate: string) => {
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    return age
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Gestión de Pacientes
          </CardTitle>
          <CardDescription>Administra la información de los pacientes del sistema</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters and Search */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Buscar por nombre, email o teléfono..."
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
                Nuevo Paciente
              </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <Select onValueChange={(value) => handleFilterChange("gender", value === "all" ? undefined : value)}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filtrar por género" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los géneros</SelectItem>
                  <SelectItem value="M">Masculino</SelectItem>
                  <SelectItem value="F">Femenino</SelectItem>
                  <SelectItem value="Otro">Otro</SelectItem>
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
                  <TableHead>Nombre</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Teléfono</TableHead>
                  <TableHead>Edad</TableHead>
                  <TableHead>Género</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8">
                      Cargando pacientes...
                    </TableCell>
                  </TableRow>
                ) : patients.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No se encontraron pacientes
                    </TableCell>
                  </TableRow>
                ) : (
                  patients.map((patient) => (
                    <TableRow key={patient.id}>
                      <TableCell className="font-medium">
                        {patient.firstName} {patient.lastName}
                      </TableCell>
                      <TableCell>{patient.email}</TableCell>
                      <TableCell>{patient.phone}</TableCell>
                      <TableCell>{getAgeFromBirthDate(patient.dateOfBirth)} años</TableCell>
                      <TableCell>
                        {patient.gender === "M" ? "Masculino" : patient.gender === "F" ? "Femenino" : "Otro"}
                      </TableCell>
                      <TableCell>
                        <Badge variant={patient.isActive ? "default" : "secondary"}>
                          {patient.isActive ? "Activo" : "Inactivo"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleView(patient)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(patient)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(patient)}>
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
        <PatientDialog patient={selectedPatient} mode={dialogMode} open={true} onClose={handleDialogClose} />
      )}

      {dialogMode === "view" && selectedPatient && (
        <PatientDetailDialog patient={selectedPatient} open={true} onClose={handleDialogClose} />
      )}
    </div>
  )
}
