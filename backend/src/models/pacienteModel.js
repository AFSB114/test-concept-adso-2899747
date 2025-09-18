const db = require('./database');

// Obtener todos los pacientes
const getAllPacientes = (callback) => {
  db.all('SELECT * FROM pacientes', [], (err, rows) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rows);
    }
  });
};

// Obtener paciente por ID
const getPacienteById = (id, callback) => {
  db.get('SELECT * FROM pacientes WHERE id = ?', [id], (err, row) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, row);
    }
  });
};

// Crear paciente
const createPaciente = (paciente, callback) => {
  const { nombre, apellido, fechaNacimiento, telefono, email } = paciente;
  db.run('INSERT INTO pacientes (nombre, apellido, fechaNacimiento, telefono, email) VALUES (?, ?, ?, ?, ?)',
    [nombre, apellido, fechaNacimiento, telefono, email], function(err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { id: this.lastID, ...paciente });
      }
    });
};

// Actualizar paciente
const updatePaciente = (id, paciente, callback) => {
  const { nombre, apellido, fechaNacimiento, telefono, email } = paciente;
  db.run('UPDATE pacientes SET nombre = ?, apellido = ?, fechaNacimiento = ?, telefono = ?, email = ? WHERE id = ?',
    [nombre, apellido, fechaNacimiento, telefono, email, id], function(err) {
      if (err) {
        callback(err, null);
      } else {
        callback(null, { id, ...paciente });
      }
    });
};

// Eliminar paciente
const deletePaciente = (id, callback) => {
  db.run('DELETE FROM pacientes WHERE id = ?', [id], function(err) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, { message: 'Paciente eliminado' });
    }
  });
};

module.exports = {
  getAllPacientes,
  getPacienteById,
  createPaciente,
  updatePaciente,
  deletePaciente
};