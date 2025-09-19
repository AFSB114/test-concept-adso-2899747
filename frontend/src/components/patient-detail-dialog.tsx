"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { patientService } from "@/lib/patient-service"
import type { Patient, MedicalHistory } from "@/lib/types"
import { User, Phone, Mail, MapPin, Calendar, Heart, Clock } from "lucide-react"

interface PatientDetailDialogProps {
  patient: Patient
  open: boolean
  onClose: () => void
}

export function PatientDetailDialog({ patient, open, onClose }: PatientDetailDialogProps) {
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistory[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open && patient) {
      loadMedicalHistory()
    }
  }, [open, patient])

  const loadMedicalHistory = async () => {
    try {
      setLoading(true)
      const response = await patientService.getPatientHistory(patient.id)
      setMedicalHistory(response.data)
    } catch (err) {
      console.error("Error loading medical history:", err)
    } finally {
      setLoading(false)
    }
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            {patient.firstName} {patient.lastName}
          </DialogTitle>
          <DialogDescription>Información detallada del paciente</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="info" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="info">Información Personal</TabsTrigger>
            <TabsTrigger value="history">Historial Médico</TabsTrigger>
          </TabsList>

          <TabsContent value="info" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Datos Personales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Nombre:</span>
                    <span>
                      {patient.firstName} {patient.lastName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Email:</span>
                    <span>{patient.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Teléfono:</span>
                    <span>{patient.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Edad:</span>
                    <span>{getAgeFromBirthDate(patient.dateOfBirth)} años</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Género:</span>
                    <span>{patient.gender === "M" ? "Masculino" : patient.gender === "F" ? "Femenino" : "Otro"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Estado:</span>
                    <Badge variant={patient.isActive ? "default" : "secondary"}>
                      {patient.isActive ? "Activo" : "Inactivo"}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Información de Contacto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                    <div>
                      <span className="font-medium">Dirección:</span>
                      <p className="text-sm text-muted-foreground mt-1">{patient.address || "No especificada"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Contacto de Emergencia:</span>
                    <span>{patient.emergencyContact || "No especificado"}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">Teléfono de Emergencia:</span>
                    <span>{patient.emergencyPhone || "No especificado"}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Información del Sistema</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Fecha de Registro:</span>
                  <span>{formatDate(patient.createdAt)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Última Actualización:</span>
                  <span>{formatDate(patient.updatedAt)}</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Historial Médico
                </CardTitle>
                <CardDescription>Registro de consultas y tratamientos anteriores</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <p className="text-center py-8 text-muted-foreground">Cargando historial médico...</p>
                ) : medicalHistory.length === 0 ? (
                  <p className="text-center py-8 text-muted-foreground">No hay registros médicos disponibles</p>
                ) : (
                  <div className="space-y-4">
                    {medicalHistory.map((record) => (
                      <Card key={record.id} className="border-l-4 border-l-primary">
                        <CardContent className="pt-4">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{record.diagnosis}</h4>
                            <span className="text-sm text-muted-foreground">{formatDate(record.date)}</span>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            <strong>Doctor:</strong> {record.doctor.firstName} {record.doctor.lastName}
                          </p>
                          <p className="text-sm mb-2">
                            <strong>Tratamiento:</strong> {record.treatment}
                          </p>
                          {record.notes && (
                            <p className="text-sm text-muted-foreground">
                              <strong>Notas:</strong> {record.notes}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end">
          <Button onClick={onClose}>Cerrar</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
