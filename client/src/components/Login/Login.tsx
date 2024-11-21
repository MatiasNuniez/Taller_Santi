import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Login: React.FC = () => {
  const [DNI, setDNI] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (DNI === '' || password === '') {
      alert('Complete todos los campos');
    } else {
      try {
        console.log(DNI, password);
        const res = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ DNI, password })
        });
        
        if (!res.ok) {
          throw new Error('Error en la respuesta del servidor');
        }
  
        const data = await res.json();
        localStorage.setItem('sesiontoken', data.token);
        const decoded = jwtDecode(data.token) as { rol?: string };
        localStorage.setItem('rolxtabaqueria', decoded.rol || '')
        navigate('/'); 
      } catch (error) {
        console.error('Error al consultar a la base de datos', error);
        alert('Error al consultar a la base de datos');
      }
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('sesiontoken');
    if (storedToken) {
      navigate('/'); 
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="DNI">
              DNI
            </label>
            <input
              id="DNI"
              type="text"
              className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-tobacco"
              placeholder="Introduce tu DNI"
              value={DNI}
              onChange={(e) => setDNI(e.target.value)}
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
              className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-tobacco"
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
              Iniciar Sesión
            </button>
          </div>
        </form>
        <p className="text-center text-gray-600 text-sm mt-4">
          ¿No tienes una cuenta? <a href="/Register" className="text-tobacco hover:underline">Regístrate</a>
        </p>
      </div> 
    </div>
  );
};

export default Login;
