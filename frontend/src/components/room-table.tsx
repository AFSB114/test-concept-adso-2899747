"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { roomService } from "@/lib/room-service"
import { hospitalService } from "@/lib/hospital-service"
import type { Room, Hospital } from "@/lib/types"
import { Search, Plus, Eye, MapPin, Edit, Trash2 } from "lucide-react"
import { RoomDialog } from "./room-dialog"

export function RoomTable() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedHospitalId, setSelectedHospitalId] = useState<string>("")
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)
  const [dialogMode, setDialogMode] = useState<"create" | "edit" | "view" | null>(null)

  useEffect(() => {
    loadRooms()
    loadHospitals()
  }, [page, selectedHospitalId])

  const loadRooms = async () => {
    try {
      setLoading(true)
      const response = await roomService.getRooms(page, 10)
      let filteredRooms = response.data

      // Filter by hospital if selected
      if (selectedHospitalId) {
        filteredRooms = filteredRooms.filter(room => room.hospitalId === Number(selectedHospitalId))
      }

      setRooms(filteredRooms)
      setTotalPages(response.pagination.totalPages)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar salas")
    } finally {
      setLoading(false)
    }
  }

  const loadHospitals = async () => {
    try {
      const response = await hospitalService.getHospitals(1, 100)
      setHospitals(response.data)
    } catch (err) {
      console.error("Error loading hospitals:", err)
    }
  }

  const handleSearch = () => {
    setPage(1)
    loadRooms()
  }

  const handleHospitalFilter = (hospitalId: string) => {
    setSelectedHospitalId(hospitalId === "all" ? "" : hospitalId)
    setPage(1)
  }

  const handleEdit = (room: Room) => {
    setSelectedRoom(room)
    setDialogMode("edit")
  }

  const handleView = (room: Room) => {
    setSelectedRoom(room)
    setDialogMode("view")
  }

  const handleDelete = async (room: Room) => {
    if (!confirm(`¿Estás seguro de eliminar la sala ${room.name}?`)) {
      return
    }

    try {
      await roomService.deleteRoom(room.id.toString())
      loadRooms()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar sala")
    }
  }

  const handleDialogClose = () => {
    setSelectedRoom(null)
    setDialogMode(null)
    loadRooms()
  }

  const getHospitalName = (hospitalId: number) => {
    const hospital = hospitals.find((h) => h.id === hospitalId)
    return hospital?.name || "Hospital no encontrado"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Gestión de Salas
          </CardTitle>
          <CardDescription>Administra las salas y consultorios de los hospitales</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Filters and Search */}
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Buscar por nombre de sala..."
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
                Nueva Sala
              </Button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <Select value={selectedHospitalId || "all"} onValueChange={handleHospitalFilter}>
                <SelectTrigger className="w-full md:w-64">
                  <SelectValue placeholder="Filtrar por hospital" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los hospitales</SelectItem>
                  {hospitals.map((hospital) => (
                    <SelectItem key={hospital.id} value={hospital.id.toString()}>
                      {hospital.name}
                    </SelectItem>
                  ))}
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
                  <TableHead>Nombre de Sala</TableHead>
                  <TableHead>Hospital</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Fecha de Creación</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      Cargando salas...
                    </TableCell>
                  </TableRow>
                ) : rooms.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      No se encontraron salas
                    </TableCell>
                  </TableRow>
                ) : (
                  rooms.map((room) => (
                    <TableRow key={room.id}>
                      <TableCell className="font-medium">{room.name}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{getHospitalName(room.hospitalId)}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={room.isActive ? "default" : "secondary"}>
                          {room.isActive ? "Activo" : "Inactivo"}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(room.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleView(room)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(room)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(room)}
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
        <RoomDialog
          room={selectedRoom}
          mode={dialogMode}
          open={true}
          onClose={handleDialogClose}
          hospitals={hospitals}
        />
      )}
    </div>
  )
}