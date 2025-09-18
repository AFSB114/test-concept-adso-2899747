const sqlite3 = require('sqlite3').verbose();

// Crear o abrir base de datos
const db = new sqlite3.Database('./database.db', (err) => {
  if (err) {
    console.error('Error al abrir la base de datos:', err.message);
  } else {
    console.log('Conectado a la base de datos SQLite.');
    createTables();
  }
});

// Crear tablas
function createTables() {
  db.serialize(() => {
    // Tabla pacientes
    db.run(`CREATE TABLE IF NOT EXISTS pacientes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      apellido TEXT NOT NULL,
      fechaNacimiento TEXT,
      telefono TEXT,
      email TEXT
    )`);

    // Tabla medicos
    db.run(`CREATE TABLE IF NOT EXISTS medicos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      apellido TEXT NOT NULL,
      especialidadId INTEGER,
      telefono TEXT,
      email TEXT
    )`);

    // Tabla citas
    db.run(`CREATE TABLE IF NOT EXISTS citas (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      pacienteId INTEGER,
      medicoId INTEGER,
      fecha TEXT,
      hora TEXT,
      estado TEXT,
      FOREIGN KEY (pacienteId) REFERENCES pacientes(id),
      FOREIGN KEY (medicoId) REFERENCES medicos(id)
    )`);

    // Otras tablas básicas
    db.run(`CREATE TABLE IF NOT EXISTS especialidades (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS hospitales (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT NOT NULL,
      direccion TEXT
    )`);

    console.log('Tablas creadas o ya existen.');
  });
}

module.exports = db;