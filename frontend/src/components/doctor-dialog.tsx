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
import { doctorService } from "@/lib/doctor-service"
import type { Doctor, Specialty } from "@/lib/types"
import { Loader2 } from "lucide-react"

interface DoctorDialogProps {
  doctor?: Doctor | null
  mode: "create" | "edit"
  open: boolean
  onClose: () => void
  specialties: Specialty[]
}

export function DoctorDialog({ doctor, mode, open, onClose, specialties }: DoctorDialogProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
    specialty: { id: "", name: "" } as Specialty,
    isActive: true,
  })

  useEffect(() => {
    if (doctor && mode === "edit") {
      setFormData({
        name: doctor.name,
        lastName: doctor.lastName,
        email: doctor.email,
        phone: doctor.phone,
        specialty: { id: doctor.specialty.id, name: doctor.specialty.name } as Specialty,
        isActive: doctor.isActive,
      })
    } else if (mode === "create") {
      setFormData({
        name: "",
        lastName: "",
        email: "",
        phone: "",
        specialty: { id: "", name: "" } as Specialty,
        isActive: true,
      })
    }
  }, [doctor, mode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      if (mode === "create") {
        await doctorService.createDoctor({
          ...formData,
          specialtyId: formData.specialty.id
        })
      } else if (doctor) {
        await doctorService.updateDoctor(doctor.id.toString(), {
          ...formData,
          specialtyId: formData.specialty.id
        })
      }
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar doctor")
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: string | boolean | Specialty) => {
    if (field === "specialty") {
      // Para specialty, necesitamos encontrar el objeto Specialty completo por ID
      const selectedSpecialty = specialties.find((s) => s.id === Number(value))
      if (selectedSpecialty) {
        setFormData({ ...formData, [field]: selectedSpecialty })
      }
    } else {
      setFormData({ ...formData, [field]: value })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Nuevo Doctor" : "Editar Doctor"}</DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Completa la información para registrar un nuevo doctor"
              : "Modifica la información del doctor"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md">
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Ingresa el nombre"
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Apellido *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                placeholder="Ingresa el apellido"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                placeholder="doctor@ejemplo.com"
                required
                disabled={loading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                placeholder="+1234567890"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="specialty">Especialidad *</Label>
              <Select value={formData.specialty.id.toString()} onValueChange={(value) => handleInputChange("specialty", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecciona la especialidad" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map((specialty) => (
                    <SelectItem key={specialty.id} value={specialty.id.toString()}>
                      {specialty.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
                "Crear Doctor"
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
