const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./db');
const app = express();
app.use(cors());
app.use(bodyParser.json());
// Rutas CRUD
app.get('/users', (req, res) => {
 connection.query("SELECT * FROM users", (err, results) => {
 if (err) throw err;
 res.json(results);
 });
});


app.post('/users', (req, res) => {
 const { nombre, apellidos, correo, password, fecha_nacimiento, rfc } = 
req.body;
 connection.query( "INSERT INTO users (nombre, apellidos, correo, password, fecha_nacimiento, rfc) VALUES (?, ?, ?, ?, ?, ?)",
 [nombre, apellidos, correo, password, fecha_nacimiento, rfc],
 (err, result) => {
 if (err) throw err;
 res.json({ id: result.insertId, ...req.body });
 }
 );
});


app.put('/users/:id', (req, res) => {
 const { id } = req.params;
 const { nombre, apellidos, correo, password, fecha_nacimiento, rfc } = 
req.body;
 connection.query(
 "UPDATE users SET nombre=?, apellidos=?, correo=?, password=?, fecha_nacimiento=?, rfc=? WHERE id=?",
 [nombre, apellidos, correo, password, fecha_nacimiento, rfc, id],
 (err) => {
 if (err) throw err;
 res.json({ id, ...req.body });
 }
 );
});
app.delete('/users/:id', (req, res) => {
 const { id } = req.params;
 connection.query("DELETE FROM users WHERE id=?", [id], (err) => {
 if (err) throw err;
 res.json({ message: "Usuario eliminado correctamente" });
 });
});


app.put('/users/:id', (req, res) => {
 const { id } = req.params;
 const { nombre, apellidos, correo, password, fecha_nacimiento, rfc } = 
req.body;
 connection.query(
 "UPDATE users SET nombre=?, apellidos=?, correo=?, password=?, fecha_nacimiento=?, rfc=? WHERE id=?",
 [nombre, apellidos, correo, password, fecha_nacimiento, rfc, id],
 (err, result) => {
 if (err) {
 console.error("Error al actualizar usuario:", err);
 res.status(500).json({ error: "Error al actualizar usuario en la base de datos." });
 return;
 }
 res.json({ message: "Usuario actualizado correctamente", 
id, ...req.body });
 }
 );
});

app.listen(3001, () => {
 console.log("Servidor corriendo en http://localhost:3001");
});