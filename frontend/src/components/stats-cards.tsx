"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { appointmentService } from "@/lib/appointment-service"
import { patientService } from "@/lib/patient-service"
import { doctorService } from "@/lib/doctor-service"
import { Users, Calendar, Stethoscope, Clock, TrendingUp, TrendingDown, AlertCircle, RefreshCw } from "lucide-react"

interface StatsData {
  totalPatients: number
  todayAppointments: number
  activeDoctors: number
  avgAppointmentTime: number
  patientsGrowth: number
  appointmentsGrowth: number
}

export function StatsCards() {
  const [stats, setStats] = useState<StatsData>({
    totalPatients: 0,
    todayAppointments: 0,
    activeDoctors: 0,
    avgAppointmentTime: 0,
    patientsGrowth: 0,
    appointmentsGrowth: 0,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      setLoading(true)
      setError(null)
      const today = new Date().toISOString().split("T")[0]

      const results = await Promise.allSettled([
        patientService.getPatients(1, 1, { isActive: true }),
        appointmentService.getAppointments(1, 100, { dateFrom: today, dateTo: today }),
        doctorService.getDoctors(1, 1, { isActive: true }),
      ])

      const [patientsResult, appointmentsResult, doctorsResult] = results

      const patientsData = patientsResult.status === "fulfilled" ? patientsResult.value : null
      const appointmentsData = appointmentsResult.status === "fulfilled" ? appointmentsResult.value : null
      const doctorsData = doctorsResult.status === "fulfilled" ? doctorsResult.value : null

      // Calculate average appointment time (mock calculation)
      const avgTime = appointmentsData?.data
        ? appointmentsData.data.reduce((acc, apt) => acc + (apt.duration || 30), 0) / appointmentsData.data.length || 30
        : 30

      setStats({
        totalPatients: patientsData?.pagination.total || 0,
        todayAppointments: appointmentsData?.pagination.total || 0,
        activeDoctors: doctorsData?.pagination.total || 0,
        avgAppointmentTime: Math.round(avgTime),
        patientsGrowth: 12, // Mock data
        appointmentsGrowth: 8, // Mock data
      })

      const failedCalls = results.filter((result) => result.status === "rejected").length
      if (failedCalls > 0) {
        setError(`Algunos datos no pudieron cargarse (${failedCalls} de 3 servicios falló)`)
      }
    } catch (err) {
      setError("Error al cargar las estadísticas del dashboard")
      console.error("Error loading stats:", err)
    } finally {
      setLoading(false)
    }
  }

  const statsConfig = [
    {
      title: "Pacientes Activos",
      value: stats.totalPatients.toLocaleString(),
      change: `+${stats.patientsGrowth}%`,
      changeType: "positive" as const,
      icon: Users,
      color: "text-chart-1",
    },
    {
      title: "Citas Hoy",
      value: stats.todayAppointments.toString(),
      change: `+${stats.appointmentsGrowth}%`,
      changeType: "positive" as const,
      icon: Calendar,
      color: "text-chart-2",
    },
    {
      title: "Doctores Disponibles",
      value: stats.activeDoctors.toString(),
      change: "0%",
      changeType: "neutral" as const,
      icon: Stethoscope,
      color: "text-chart-3",
    },
    {
      title: "Tiempo Promedio",
      value: `${stats.avgAppointmentTime} min`,
      change: "-3%",
      changeType: "positive" as const,
      icon: Clock,
      color: "text-chart-4",
    },
  ]

  if (error && !loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="md:col-span-2 lg:col-span-4">
          <CardContent className="flex items-center justify-between p-6">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <div>
                <p className="font-medium">Error en las estadísticas</p>
                <p className="text-sm text-muted-foreground">{error}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={loadStats} disabled={loading}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Reintentar
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 bg-muted rounded animate-pulse w-24"></div>
              <div className="h-4 w-4 bg-muted rounded animate-pulse"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-muted rounded animate-pulse w-16 mb-2"></div>
              <div className="h-3 bg-muted rounded animate-pulse w-20"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-amber-600" />
          <p className="text-sm text-amber-800">{error}</p>
          <Button variant="ghost" size="sm" onClick={loadStats} className="ml-auto">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statsConfig.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1">
                {stat.changeType === "positive" ? (
                  <TrendingUp className="h-3 w-3 text-chart-1" />
                ) : stat.changeType === "negative" ? (
                  <TrendingDown className="h-3 w-3 text-chart-3" />
                ) : null}
                <span
                  className={
                    stat.changeType === "positive"
                      ? "text-chart-1"
                      : stat.changeType === "negative"
                        ? "text-chart-3"
                        : ""
                  }
                >
                  {stat.change}
                </span>
                {" desde el mes pasado"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
