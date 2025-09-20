"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Switch } from "@/components/ui/switch"
import { hospitalService } from "@/lib/hospital-service"
import type { Hospital } from "@/lib/types"
import { Loader2 } from "lucide-react"

interface HospitalDialogProps {
  hospital?: Hospital | null
  mode: "create" | "edit"
  open: boolean
  onClose: () => void
}

export function HospitalDialog({ hospital, mode, open, onClose }: HospitalDialogProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    isActive: true,
  })

  useEffect(() => {
    if (hospital && mode === "edit") {
      setFormData({
        name: hospital.name,
        address: hospital.address,
        isActive: hospital.isActive,
      })
    } else if (mode === "create") {
      setFormData({
        name: "",
        address: "",
        isActive: true,
      })
    }
  }, [hospital, mode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (mode === "create") {
        await hospitalService.createHospital(formData)
      } else if (hospital) {
        await hospitalService.updateHospital(hospital.id.toString(), formData)
      }
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar hospital")
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
          <DialogTitle>{mode === "create" ? "Nuevo Hospital" : "Editar Hospital"}</DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Completa la información para registrar un nuevo hospital"
              : "Modifica la información del hospital"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md">
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="name">Nombre del Hospital *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Ingresa el nombre del hospital"
              required
              disabled={loading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Dirección *</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange("address", e.target.value)}
              placeholder="Ingresa la dirección completa del hospital"
              required
              disabled={loading}
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isActive"
              checked={formData.isActive}
              onCheckedChange={(checked) => handleInputChange("isActive", checked)}
              disabled={loading}
            />
            <Label htmlFor="isActive">Hospital activo</Label>
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
                "Crear Hospital"
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