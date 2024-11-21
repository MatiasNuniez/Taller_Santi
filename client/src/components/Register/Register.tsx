import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const [nombre, setNombre] = useState<string>("");
  const [apellido, setApellido] = useState<string>("");
  const [telefono, setTelefono] = useState<string>("");
  const [direccion, setDireccion] = useState<string>("");
  const [DNI, setDni] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!nombre || !apellido || !telefono || !direccion || !DNI || !password) {
      alert('Complete todos los campos');
      return;
    }
  
    try {
      const res = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nombre, apellido, telefono, direccion, DNI, password })
      });
  
      const data = await res.json();
  
      if (!res.ok) {
        console.error('Error del servidor:', data.Error || 'Error desconocido');
        alert(data.Error || 'Ocurrió un error al registrar el usuario.');
        return;
      }
  
      alert('Usuario registrado correctamente, inicie sesión.');
  
      setTimeout(() => {
        navigate('/login');
      }, 1000);
  
    } catch (error) {
      console.error('Error en el cliente:', error);
      alert('Error al consultar a la base de datos para registrar');
    }
  };
  

  useEffect(() => {
    const storedToken = localStorage.getItem('sesiontoken')
    if (storedToken) {
      navigate("/")
    }
  }, [navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
        <form onSubmit={handleRegister}>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
              Nombre
            </label>
            <input
              id="nombre"
              type="text"
              className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Introduce tu nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
              Apellido
            </label>
            <input
              id="apellido"
              type="text"
              className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Introduce tu apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
              Teléfono
            </label>
            <input
              id="telefono"
              type="tel"
              className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Introduce tu teléfono"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="direccion">
              Dirección
            </label>
            <input
              id="direccion"
              type="text"
              className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Introduce tu dirección"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dni">
              DNI
            </label>
            <input
              id="dni"
              type="text"
              className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Introduce tu DNI"
              value={DNI}
              onChange={(e) => setDni(e.target.value)}
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Introduce tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-tobacco text-white py-2 px-4 rounded-md transition-colors"
            >
              Registrarse
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600 text-sm mt-4">
          ¿Ya tienes una cuenta? <a href="/login" className="text-blue-500 hover:underline">Inicia sesión</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
