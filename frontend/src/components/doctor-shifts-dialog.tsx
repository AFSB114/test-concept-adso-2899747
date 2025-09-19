"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { doctorService } from "@/lib/doctor-service"
import type { Doctor, DoctorShift } from "@/lib/types"
import { Clock, Loader2 } from "lucide-react"

interface DoctorShiftsDialogProps {
  doctor: Doctor
  open: boolean
  onClose: () => void
}

const DAYS_OF_WEEK = [
  { id: 1, name: "Lunes" },
  { id: 2, name: "Martes" },
  { id: 3, name: "Miércoles" },
  { id: 4, name: "Jueves" },
  { id: 5, name: "Viernes" },
  { id: 6, name: "Sábado" },
  { id: 0, name: "Domingo" },
]

export function DoctorShiftsDialog({ doctor, open, onClose }: DoctorShiftsDialogProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [shifts, setShifts] = useState<DoctorShift[]>([])

  useEffect(() => {
    if (open && doctor) {
      initializeShifts()
    }
  }, [open, doctor])

  const initializeShifts = () => {
    const existingShifts = doctor.shifts || []
    const initialShifts: DoctorShift[] = DAYS_OF_WEEK.map((day) => {
      const existingShift = existingShifts.find((shift) => shift.dayOfWeek === day.id)
      return (
        existingShift || {
          id: `temp-${day.id}`,
          doctorId: doctor.id,
          dayOfWeek: day.id,
          startTime: "08:00",
          endTime: "17:00",
          isActive: false,
        }
      )
    })
    setShifts(initialShifts)
  }

  const handleShiftChange = (dayOfWeek: number, field: keyof DoctorShift, value: any) => {
    setShifts((prevShifts) =>
      prevShifts.map((shift) => (shift.dayOfWeek === dayOfWeek ? { ...shift, [field]: value } : shift)),
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      await doctorService.updateDoctorShifts(doctor.id, shifts)
      onClose()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al guardar horarios")
    } finally {
      setLoading(false)
    }
  }

  const getDayName = (dayOfWeek: number) => {
    return DAYS_OF_WEEK.find((day) => day.id === dayOfWeek)?.name || ""
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Horarios de Trabajo - Dr. {doctor.firstName} {doctor.lastName}
          </DialogTitle>
          <DialogDescription>Configura los días y horarios de atención del doctor</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-destructive/10 text-destructive p-3 rounded-md">
              <p className="text-sm">{error}</p>
            </div>
          )}

          <div className="space-y-4">
            {shifts.map((shift) => (
              <Card key={shift.dayOfWeek} className={shift.isActive ? "border-primary" : ""}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-base">{getDayName(shift.dayOfWeek)}</CardTitle>
                    <Switch
                      checked={shift.isActive}
                      onCheckedChange={(checked) => handleShiftChange(shift.dayOfWeek, "isActive", checked)}
                      disabled={loading}
                    />
                  </div>
                </CardHeader>
                {shift.isActive && (
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor={`start-${shift.dayOfWeek}`}>Hora de Inicio</Label>
                        <Input
                          id={`start-${shift.dayOfWeek}`}
                          type="time"
                          value={shift.startTime}
                          onChange={(e) => handleShiftChange(shift.dayOfWeek, "startTime", e.target.value)}
                          disabled={loading}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`end-${shift.dayOfWeek}`}>Hora de Fin</Label>
                        <Input
                          id={`end-${shift.dayOfWeek}`}
                          type="time"
                          value={shift.endTime}
                          onChange={(e) => handleShiftChange(shift.dayOfWeek, "endTime", e.target.value)}
                          disabled={loading}
                        />
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
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
              ) : (
                "Guardar Horarios"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
