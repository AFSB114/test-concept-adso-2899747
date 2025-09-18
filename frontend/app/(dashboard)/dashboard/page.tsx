"use client"

import { StatsCards } from "@/components/stats-cards"
import { RecentAppointments } from "@/components/recent-appointments"
import { QuickActions } from "@/components/quick-actions"
import { QuickAppointmentForm } from "@/components/quick-appointment-form"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-balance">Bienvenido al Dashboard Médico</h1>
        <p className="text-muted-foreground">Aquí tienes un resumen de la actividad de hoy</p>
      </div>

      {/* Stats Grid */}
      <StatsCards />

      <div className="grid gap-6 md:grid-cols-2">
        {/* Recent Appointments */}
        <RecentAppointments />

        {/* Quick Actions */}
        <QuickActions />
      </div>

      {/* Quick Appointment Form */}
      <QuickAppointmentForm />
    </div>
  )
}
