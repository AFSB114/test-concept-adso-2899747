import { RoomTable } from "@/components/room-table"

export default function RoomsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Salas y Consultorios</h1>
        <p className="text-muted-foreground">
          Gestiona las salas y consultorios de los hospitales
        </p>
      </div>
      <RoomTable />
    </div>
  )
}