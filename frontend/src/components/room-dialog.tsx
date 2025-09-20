"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { roomService } from "@/lib/room-service"
import type { Room, Hospital } from "@/lib/types"
import { Loader2 } from "lucide-react"

interface RoomDialogProps {
  room?: Room | null
  mode: "create" | "edit"
  open: boolean
  onClose: () => void
  hospitals: Hospital[]
}

export function RoomDialog({ room, mode, open, onClose, hospitals }: RoomDialogProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    hospitalId: "",
    isActive: true,
  })

  useEffect(() => {
    if (room && mode === "edit") {
      setFormData({
        name: room.name,
        hospitalId: room.hospitalId.toString(),
        isActive: room.isActive,
      })
    } else if (mode === "create") {
      setFormData({
        name: "",
        hospitalId: "",
        isActive: true,
      })
    }
  }, [room, mode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const roomData = {
        name: formData.name,
        hospitalId: Number(formData.hospitalId),
      }

      if (mode === "create") {
        await roomService.createRoom(roomData)
      } else if (room) {
        await roomService.updateRoom(room.id.toString(), roomData)
      }
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar sala")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData({ ...formData, [field]: value })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Nueva Sala" : "Editar Sala"}</DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Completa la información para registrar una nueva sala"
              : "Modifica la información de la sala"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md">
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Nombre de la Sala *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Ej: Consultorio 101"
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="hospitalId">Hospital *</Label>
            <Select value={formData.hospitalId} onValueChange={(value) => handleInputChange("hospitalId", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Selecciona el hospital" />
              </SelectTrigger>
              <SelectContent>
                {hospitals.map((hospital) => (
                  <SelectItem key={hospital.id} value={hospital.id.toString()}>
                    {hospital.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => handleInputChange("isActive", checked)}
              disabled={loading}
            />
            <Label htmlFor="isActive">Sala activa</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose} disabled={loading}>
              Cancelar
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Guardando...
                </>
              ) : mode === "create" ? (
                "Crear Sala"
              ) : (
                "Guardar Cambios"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}