import React, { useState, useEffect } from 'react';
import axios from 'axios';


const CRUDUsuarios = () => {
 const [usuarios, setUsuarios] = useState([]);
 const [formData, setFormData] = useState({
 nombre: '',
 apellidos: '',
 correo: '',
 password: '',
 fecha_nacimiento: '',
 rfc: ''
 });
 const [editUser, setEditUser] = useState(null);
 useEffect(() => {
 fetchUsuarios();
 }, []);
 const fetchUsuarios = async () => {
 const res = await axios.get("http://localhost:3001/users");
 setUsuarios(res.data);
 };
 const handleChange = (e) => {
 setFormData({ ...formData, [e.target.name]: e.target.value });
 };
 const handleSubmit = async (e) => {
 e.preventDefault();
 if (editUser) {
 await axios.put(`http://localhost:3001/users/${editUser.id}`, formData);
 alert("Usuario actualizado.");
 setEditUser(null);
 } else {
 await axios.post("http://localhost:3001/users", formData);
 alert("Usuario registrado.");
 }
 setFormData({ nombre: '', apellidos: '', correo: '', password: '', fecha_nacimiento: 
'', rfc: '' });
 fetchUsuarios();
 };

 const handleDelete = async (id) => {
 await axios.delete(`http://localhost:3000/users/${id}`);
 alert("Usuario eliminado.");
 fetchUsuarios();
 };
 const handleEdit = (user) => {
 setEditUser(user);
 setFormData(user);
 };
 return (
 <div className="container">
 <h2>{editUser ? "Editar Usuario" : "Registrar Usuario"}</h2>
 <form onSubmit={handleSubmit}>
 <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} 
onChange={handleChange} required />

<input type="text" name="apellidos" placeholder="Apellidos" 
value={formData.apellidos} onChange={handleChange} required />
 <input type="email" name="correo" placeholder="Correo" value={formData.correo} 
onChange={handleChange} required />
 <input type="password" name="password" placeholder="Contraseña" 
value={formData.password} onChange={handleChange} required />
 <input type="date" name="fecha_nacimiento" value={formData.fecha_nacimiento} 
onChange={handleChange} required />
 <input type="text" name="rfc" placeholder="RFC" value={formData.rfc} 
onChange={handleChange} required />
 <button type="submit">{editUser ? "Actualizar" : "Registrar"}</button>
 </form>
 <h2>Lista de Usuarios</h2>
 <ul>
 {usuarios.map(user => (
 <li key={user.id}>
 {user.nombre} {user.apellidos} - {user.correo}
 <div>
 <button onClick={() => handleEdit(user)}>Editar</button>
<button onClick={() => handleDelete(user.id)}>Eliminar</button>
 </div>
 </li>
 ))}
 </ul>
 </div>
 );
};
export default CRUDUsuarios;