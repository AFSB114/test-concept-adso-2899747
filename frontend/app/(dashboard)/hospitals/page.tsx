import { HospitalTable } from "@/components/hospital-table"

export default function HospitalsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Hospitales</h1>
        <p className="text-muted-foreground">
          Gestiona la información de los hospitales del sistema
        </p>
      </div>
      <HospitalTable />
    </div>
  )
}