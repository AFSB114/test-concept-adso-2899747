import { DoctorTable } from "@/components/doctor-table"

export default function DoctorsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-balance">Gestión de Doctores</h1>
        <p className="text-muted-foreground">Administra la información de los doctores y sus especialidades</p>
      </div>
      <DoctorTable />
    </div>
  )
}
