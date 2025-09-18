import { PatientTable } from "@/components/patient-table"

export default function PatientsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-balance">Gestión de Pacientes</h1>
        <p className="text-muted-foreground">Administra la información de los pacientes del sistema médico</p>
      </div>
      <PatientTable />
    </div>
  )
}
