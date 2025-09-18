# Medical Dashboard - Sistema de Gestión Médica

Un sistema completo de gestión médica desarrollado con Next.js 15, TypeScript y Tailwind CSS, diseñado para administrar pacientes, doctores, citas médicas y horarios en un entorno clínico.

## 🚀 Características Principales

### 🔐 Sistema de Autenticación
- Autenticación JWT con roles diferenciados
- Control de acceso basado en permisos (RBAC)
- 4 tipos de usuario: Admin, Doctor, Recepcionista, Paciente
- Middleware de protección de rutas

### 👥 Gestión de Pacientes
- CRUD completo de pacientes
- Búsqueda avanzada y filtros
- Historial médico y detalles completos
- Estados activo/inactivo

### 👨‍⚕️ Gestión de Doctores
- Administración de doctores y especialidades
- Gestión de horarios de trabajo
- Asignación de especialidades médicas
- Control de disponibilidad

### 📅 Sistema de Citas
- Programación de citas médicas
- Vista de calendario interactiva
- Estados de cita (programada, confirmada, en progreso, completada, cancelada)
- Validación de disponibilidad en tiempo real

### 📊 Dashboard y Reportes
- Panel de control con estadísticas en tiempo real
- Tarjetas de métricas principales
- Lista de citas recientes
- Acciones rápidas contextuales

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 15 (App Router), React 18, TypeScript
- **Estilos**: Tailwind CSS v4, shadcn/ui
- **Autenticación**: JWT, localStorage
- **Estado**: React Hooks, Context API
- **Iconos**: Lucide React
- **Validación**: Formularios con validación client-side

## 📁 Estructura del Proyecto

\`\`\`
medical-dashboard/
├── app/                          # App Router de Next.js
│   ├── (dashboard)/             # Rutas protegidas
│   │   ├── appointments/        # Gestión de citas
│   │   ├── dashboard/           # Panel principal
│   │   ├── doctors/             # Gestión de doctores
│   │   ├── patients/            # Gestión de pacientes
│   │   └── schedule/            # Vista de calendario
│   ├── login/                   # Página de login
│   ├── globals.css              # Estilos globales
│   └── layout.tsx               # Layout principal
├── components/                  # Componentes reutilizables
│   ├── auth/                    # Componentes de autenticación
│   ├── appointments/            # Componentes de citas
│   ├── calendar/                # Componentes de calendario
│   ├── dashboard/               # Componentes del dashboard
│   ├── doctors/                 # Componentes de doctores
│   ├── layout/                  # Componentes de layout
│   ├── patients/                # Componentes de pacientes
│   ├── specialties/             # Componentes de especialidades
│   └── ui/                      # Componentes base (shadcn/ui)
├── hooks/                       # Custom hooks
├── lib/                         # Utilidades y servicios
│   ├── services/                # Servicios de API
│   ├── auth.ts                  # Servicio de autenticación
│   ├── mock-data.ts             # Datos de prueba
│   ├── permissions.ts           # Definiciones de permisos
│   └── types.ts                 # Definiciones de tipos
└── middleware.ts                # Middleware de Next.js
\`\`\`

## 🔑 Sistema de Permisos

### Roles y Permisos

#### 👑 Administrador
- Acceso completo a todas las funcionalidades
- Gestión de usuarios y configuración del sistema
- Acceso a reportes y estadísticas avanzadas

#### 👨‍⚕️ Doctor
- Gestión de sus pacientes asignados
- Visualización y actualización de citas
- Acceso a historiales médicos
- Gestión de su horario personal

#### 👩‍💼 Recepcionista
- Gestión de citas médicas
- Registro y actualización de pacientes
- Visualización de horarios de doctores
- Confirmación y cancelación de citas

#### 🧑‍🦱 Paciente
- Visualización de sus propias citas
- Acceso a información de doctores
- Consulta de horarios disponibles

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ 
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
\`\`\`bash
git clone <repository-url>
cd medical-dashboard
\`\`\`

2. **Instalar dependencias**
\`\`\`bash
npm install
# o
yarn install
\`\`\`

3. **Configurar variables de entorno**
\`\`\`bash
# Crear archivo .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
\`\`\`

4. **Ejecutar en modo desarrollo**
\`\`\`bash
npm run dev
# o
yarn dev
\`\`\`

5. **Abrir en el navegador**
\`\`\`
http://localhost:3000
\`\`\`

## 🔧 Configuración del Backend

El frontend está diseñado para consumir una API REST. Los endpoints esperados son:

### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `POST /api/auth/logout` - Cerrar sesión

### Pacientes
- `GET /api/patients` - Listar pacientes
- `POST /api/patients` - Crear paciente
- `PUT /api/patients/:id` - Actualizar paciente
- `DELETE /api/patients/:id` - Eliminar paciente

### Doctores
- `GET /api/doctors` - Listar doctores
- `POST /api/doctors` - Crear doctor
- `PUT /api/doctors/:id` - Actualizar doctor
- `DELETE /api/doctors/:id` - Eliminar doctor

### Citas
- `GET /api/appointments` - Listar citas
- `POST /api/appointments` - Crear cita
- `PUT /api/appointments/:id` - Actualizar cita
- `DELETE /api/appointments/:id` - Eliminar cita

### Especialidades
- `GET /api/specialties` - Listar especialidades
- `POST /api/specialties` - Crear especialidad
- `PUT /api/specialties/:id` - Actualizar especialidad
- `DELETE /api/specialties/:id` - Eliminar especialidad

## 👤 Usuarios de Prueba

Para testing, puedes usar estos usuarios de ejemplo:

\`\`\`javascript
// Administrador
{
  email: "admin@hospital.com",
  password: "admin123",
  role: "admin"
}

// Doctor
{
  email: "doctor@hospital.com", 
  password: "doctor123",
  role: "doctor"
}

// Recepcionista
{
  email: "recepcion@hospital.com",
  password: "recepcion123", 
  role: "recepcionista"
}

// Paciente
{
  email: "paciente@email.com",
  password: "paciente123",
  role: "paciente"
}
\`\`\`

## 🎨 Personalización de Estilos

El sistema utiliza Tailwind CSS v4 con un tema personalizado para el sector médico:

### Colores Principales
- **Verde Médico**: `#10b981` (primary)
- **Verde Oscuro**: `#059669` (primary-dark)
- **Gris Neutro**: `#6b7280` (secondary)
- **Blanco**: `#ffffff` (background)

### Componentes UI
Basado en shadcn/ui con componentes personalizados:
- Botones con estados de permisos
- Tablas con filtros avanzados
- Formularios con validación
- Modales y diálogos
- Calendario interactivo

## 📱 Responsive Design

- **Mobile First**: Diseño optimizado para dispositivos móviles
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Sidebar Colapsible**: Navegación adaptativa
- **Tablas Responsivas**: Scroll horizontal en pantallas pequeñas

## 🔒 Seguridad

### Medidas Implementadas
- Autenticación JWT con expiración
- Middleware de protección de rutas
- Control de acceso basado en roles (RBAC)
- Validación de permisos en componentes
- Sanitización de inputs
- Headers de seguridad

### Buenas Prácticas
- Tokens almacenados en localStorage (considerar httpOnly cookies para producción)
- Validación tanto en frontend como backend
- Manejo seguro de errores
- Logs de auditoría (implementar en backend)

## 🧪 Testing

### Estructura de Testing
\`\`\`bash
# Ejecutar tests unitarios
npm run test

# Ejecutar tests de integración  
npm run test:integration

# Coverage de código
npm run test:coverage
\`\`\`

### Casos de Prueba Principales
- Autenticación y autorización
- CRUD de entidades principales
- Validación de formularios
- Navegación y rutas protegidas
- Responsive design

## 🚀 Deployment

### Vercel (Recomendado)
\`\`\`bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
\`\`\`

### Variables de Entorno en Producción
\`\`\`bash
NEXT_PUBLIC_API_BASE_URL=https://api.tu-dominio.com/api
\`\`\`

## 📈 Roadmap

### Próximas Funcionalidades
- [ ] Notificaciones en tiempo real
- [ ] Integración con sistemas de pago
- [ ] Reportes avanzados con gráficos
- [ ] Exportación de datos (PDF, Excel)
- [ ] Sistema de mensajería interna
- [ ] Integración con calendarios externos
- [ ] App móvil (React Native)
- [ ] Telemedicina básica

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o consultas:
- Email: soporte@medidashboard.com
- Documentación: [docs.medidashboard.com](https://docs.medidashboard.com)
- Issues: [GitHub Issues](https://github.com/tu-usuario/medical-dashboard/issues)

---

**Desarrollado con ❤️ para mejorar la gestión médica**
