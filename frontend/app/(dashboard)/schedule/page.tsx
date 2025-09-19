import { CalendarView } from "@/components/calendar-view"

export default function SchedulePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-balance">Agenda Médica</h1>
        <p className="text-muted-foreground">Vista de calendario para gestionar citas y horarios</p>
      </div>
      <CalendarView />
    </div>
  )
}
