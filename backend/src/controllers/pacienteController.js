const pacienteModel = require('../models/pacienteModel');

// Obtener todos los pacientes
const getPacientes = (req, res) => {
  pacienteModel.getAllPacientes((err, pacientes) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(pacientes);
    }
  });
};

// Obtener paciente por ID
const getPaciente = (req, res) => {
  const { id } = req.params;
  pacienteModel.getPacienteById(id, (err, paciente) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (paciente) {
      res.json(paciente);
    } else {
      res.status(404).json({ message: 'Paciente no encontrado' });
    }
  });
};

// Crear paciente
const createPaciente = (req, res) => {
  const paciente = req.body;
  pacienteModel.createPaciente(paciente, (err, newPaciente) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(201).json(newPaciente);
    }
  });
};

// Actualizar paciente
const updatePaciente = (req, res) => {
  const { id } = req.params;
  const paciente = req.body;
  pacienteModel.updatePaciente(id, paciente, (err, updatedPaciente) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(updatedPaciente);
    }
  });
};

// Eliminar paciente
const deletePaciente = (req, res) => {
  const { id } = req.params;
  pacienteModel.deletePaciente(id, (err, result) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(result);
    }
  });
};

module.exports = {
  getPacientes,
  getPaciente,
  createPaciente,
  updatePaciente,
  deletePaciente
};