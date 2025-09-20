"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { hospitalService } from "@/lib/hospital-service"
import type { Hospital } from "@/lib/types"
import { Search, Plus, Eye, Building, Edit, Trash2 } from "lucide-react"
import { HospitalDialog } from "./hospital-dialog"

export function HospitalTable() {
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null)
  const [dialogMode, setDialogMode] = useState<"create" | "edit" | "view" | null>(null)

  useEffect(() => {
    loadHospitals()
  }, [page])

  const loadHospitals = async () => {
    try {
      setLoading(true)
      const response = await hospitalService.getHospitals(page, 10)
      setHospitals(response.data)
      setTotalPages(response.pagination.totalPages)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar hospitales")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    setPage(1)
    loadHospitals()
  }

  const handleEdit = (hospital: Hospital) => {
    setSelectedHospital(hospital)
    setDialogMode("edit")
  }

  const handleView = (hospital: Hospital) => {
    setSelectedHospital(hospital)
    setDialogMode("view")
  }

  const handleDelete = async (hospital: Hospital) => {
    if (!confirm(`¿Estás seguro de eliminar el hospital ${hospital.name}?`)) {
      return
    }

    try {
      await hospitalService.deleteHospital(hospital.id.toString())
      loadHospitals()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar hospital")
    }
  }

  const handleDialogClose = () => {
    setSelectedHospital(null)
    setDialogMode(null)
    loadHospitals()
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Gestión de Hospitales
          </CardTitle>
          <CardDescription>Administra la información de los hospitales del sistema</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters and Search */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Buscar por nombre o dirección..."
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
                Nuevo Hospital
              </Button>
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
                  <TableHead>Dirección</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha de Creación</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      Cargando hospitales...
                    </TableCell>
                  </TableRow>
                ) : hospitals.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No se encontraron hospitales
                    </TableCell>
                  </TableRow>
                ) : (
                  hospitals.map((hospital) => (
                    <TableRow key={hospital.id}>
                      <TableCell className="font-medium">{hospital.name}</TableCell>
                      <TableCell className="max-w-xs truncate">{hospital.address}</TableCell>
                      <TableCell>
                        <Badge variant={hospital.isActive ? "default" : "secondary"}>
                          {hospital.isActive ? "Activo" : "Inactivo"}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(hospital.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleView(hospital)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(hospital)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(hospital)}
                            className="text-destructive hover:text-destructive"
                          >
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
        <HospitalDialog
          hospital={selectedHospital}
          mode={dialogMode}
          open={true}
          onClose={handleDialogClose}
        />
      )}
    </div>
  )
}