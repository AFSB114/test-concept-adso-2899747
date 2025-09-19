"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { specialtyService } from "@/lib/specialty-service"
import type { Specialty } from "@/lib/types"
import { Plus, Edit, Trash2, Stethoscope, Loader2 } from "lucide-react"

export function SpecialtyManagement() {
  const [specialties, setSpecialties] = useState<Specialty[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingSpecialty, setEditingSpecialty] = useState<Specialty | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    isActive: true,
  })
  const [formLoading, setFormLoading] = useState(false)

  useEffect(() => {
    loadSpecialties()
  }, [])

  const loadSpecialties = async () => {
    try {
      setLoading(true)
      const response = await specialtyService.getSpecialties()
      setSpecialties(response.data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al cargar especialidades")
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = () => {
    setEditingSpecialty(null)
    setFormData({ name: "", description: "", isActive: true })
    setDialogOpen(true)
  }

  const handleEdit = (specialty: Specialty) => {
    setEditingSpecialty(specialty)
    setFormData({
      name: specialty.name,
      description: specialty.description,
      isActive: specialty.isActive,
    })
    setDialogOpen(true)
  }

  const handleDelete = async (specialty: Specialty) => {
    if (!confirm(`¿Estás seguro de eliminar la especialidad "${specialty.name}"?`)) {
      return
    }

    try {
      await specialtyService.deleteSpecialty(specialty.id)
      loadSpecialties()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al eliminar especialidad")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormLoading(true)

    try {
      if (editingSpecialty) {
        await specialtyService.updateSpecialty(editingSpecialty.id, formData)
      } else {
        await specialtyService.createSpecialty(formData)
      }
      setDialogOpen(false)
      loadSpecialties()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar especialidad")
    } finally {
      setFormLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Stethoscope className="h-5 w-5" />
                Especialidades Médicas
              </CardTitle>
              <CardDescription>Gestiona las especialidades disponibles en el sistema</CardDescription>
            </div>
            <Button onClick={handleCreate}>
              <Plus className="h-4 w-4 mr-2" />
              Nueva Especialidad
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md mb-4">
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8">
                      Cargando especialidades...
                    </TableCell>
                  </TableRow>
                ) : specialties.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No hay especialidades registradas
                    </TableCell>
                  </TableRow>
                ) : (
                  specialties.map((specialty) => (
                    <TableRow key={specialty.id}>
                      <TableCell className="font-medium">{specialty.name}</TableCell>
                      <TableCell className="max-w-md">
                        <p className="text-sm text-muted-foreground truncate">{specialty.description}</p>
                      </TableCell>
                      <TableCell>
                        <Badge variant={specialty.isActive ? "default" : "secondary"}>
                          {specialty.isActive ? "Activa" : "Inactiva"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEdit(specialty)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDelete(specialty)}>
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
        </CardContent>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingSpecialty ? "Editar Especialidad" : "Nueva Especialidad"}</DialogTitle>
            <DialogDescription>
              {editingSpecialty
                ? "Modifica la información de la especialidad"
                : "Completa la información para crear una nueva especialidad"}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ej: Cardiología"
                required
                disabled={formLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Descripción de la especialidad médica"
                disabled={formLoading}
              />
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                disabled={formLoading}
              />
              <Label htmlFor="isActive">Especialidad activa</Label>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setDialogOpen(false)} disabled={formLoading}>
                Cancelar
              </Button>
              <Button type="submit" disabled={formLoading}>
                {formLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Guardando...
                  </>
                ) : editingSpecialty ? (
                  "Guardar Cambios"
                ) : (
                  "Crear Especialidad"
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
