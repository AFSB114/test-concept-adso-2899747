const express = require('express');
const cors = require('cors');
const pacienteRoutes = require('./src/routes/pacienteRoutes');
const medicoRoutes = require('./src/routes/medicoRoutes');
const citaRoutes = require('./src/routes/citaRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/medicos', medicoRoutes);
app.use('/api/citas', citaRoutes);

// Ruta raíz
app.get('/', (req, res) => {
  res.json({ message: 'API del Sistema de Gestión de Citas Hospitalarias' });
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});