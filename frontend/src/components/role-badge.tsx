import { Badge } from "@/components/ui/badge"
import { Shield, UserCheck, Users, User } from "lucide-react"

interface RoleBadgeProps {
  role: string
  className?: string
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  const getRoleConfig = (roleName: string) => {
    switch (roleName.toLowerCase()) {
      case "admin":
        return {
          label: "Administrador",
          variant: "destructive" as const,
          icon: Shield,
        }
      case "doctor":
        return {
          label: "Doctor",
          variant: "default" as const,
          icon: UserCheck,
        }
      case "recepcionista":
        return {
          label: "Recepcionista",
          variant: "secondary" as const,
          icon: Users,
        }
      case "paciente":
        return {
          label: "Paciente",
          variant: "outline" as const,
          icon: User,
        }
      default:
        return {
          label: roleName,
          variant: "outline" as const,
          icon: User,
        }
    }
  }

  const config = getRoleConfig(role)
  const Icon = config.icon

  return (
    <Badge variant={config.variant} className={className}>
      <Icon className="w-3 h-3 mr-1" />
      {config.label}
    </Badge>
  )
}
