"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Plus, Users, Calendar, Stethoscope, BarChart3 } from "lucide-react"

export function QuickActions() {
  const router = useRouter()

  const actions = [
    {
      title: "Nueva Cita",
      description: "Programar una nueva cita médica",
      icon: Plus,
      action: () => router.push("/appointments"),
      color: "bg-primary text-primary-foreground hover:bg-primary/90",
    },
    {
      title: "Registrar Paciente",
      description: "Añadir un nuevo paciente al sistema",
      icon: Users,
      action: () => router.push("/patients"),
      color: "bg-chart-1 text-white hover:bg-chart-1/90",
    },
    {
      title: "Ver Agenda",
      description: "Consultar la agenda del día",
      icon: Calendar,
      action: () => router.push("/schedule"),
      color: "bg-chart-2 text-white hover:bg-chart-2/90",
    },
    {
      title: "Gestionar Doctores",
      description: "Administrar información de doctores",
      icon: Stethoscope,
      action: () => router.push("/doctors"),
      color: "bg-chart-3 text-white hover:bg-chart-3/90",
    },
    {
      title: "Ver Reportes",
      description: "Consultar estadísticas y reportes",
      icon: BarChart3,
      action: () => router.push("/reports"),
      color: "bg-chart-4 text-white hover:bg-chart-4/90",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Acciones Rápidas</CardTitle>
        <CardDescription>Tareas frecuentes del sistema</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {actions.map((action) => (
            <Button
              key={action.title}
              variant="outline"
              className="justify-start h-auto p-4 text-left bg-transparent"
              onClick={action.action}
            >
              <action.icon className="h-5 w-5 mr-3 flex-shrink-0" />
              <div>
                <div className="font-medium text-sm">{action.title}</div>
                <div className="text-xs text-muted-foreground">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
