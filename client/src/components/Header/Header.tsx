import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [userDNI, setUserDNI] = useState<string>('40790916')

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };


  const getCategories = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/category/${userDNI}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!res.ok) {
        throw new Error('No se completo la peticion')
      }
      const data = await res.json()
      localStorage.setItem('categorias', JSON.stringify(data))
    } catch (error) {
      alert('Error al consultar a la base de datos')
    }
  };

  const getProviders = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/providers/${userDNI}`,{
        method:'GET',
        headers:{
          'Content-Type':'application/json'
        }
      })

      if (!res.ok) {
        throw new Error('Error al obtener los proveedores')
      }

      const data = await res.json()
      localStorage.setItem('proveedores',JSON.stringify(data))
    } catch (error) {
      alert('Error al consultar a la base de datos')
    }
  }

  useEffect(() => {
    getCategories()
    getProviders()
  }, [userDNI])


  return (
    <div>
      {location.pathname.toLowerCase() === "/login" || location.pathname.toLowerCase() === '/register' ?
        null :
        <header className="bg-blue-600">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <div className="text-white text-2xl font-bold">
              <Link to="/">Tabaqueria</Link>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link to="/" className="text-white hover:text-gray-300">
                Inicio
              </Link>
              <Link to="/productos" className="text-white hover:text-gray-300">
                Productos
              </Link>
              <Link to="/cart" className="text-white hover:text-gray-300">
                Carrito
              </Link>
              <Link to="/contacto" className="text-white hover:text-gray-300">
                Contacto
              </Link>
              <Link to="/dashboard" className="block text-white hover:text-gray-300">
                Dashboard
              </Link>
            </nav>

            <button
              onClick={toggleMenu}
              className="md:hidden text-white focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>

          {isOpen && (
            <div className="md:hidden bg-blue-600">
              <nav className="px-4 py-4 space-y-2">
                <Link to="/" className="block text-white hover:text-gray-300">
                  Inicio
                </Link>
                <Link to="/productos" className="block text-white hover:text-gray-300">
                  Productos
                </Link>
                <Link to="/cart" className="block text-white hover:text-gray-300">
                  Carrito
                </Link>
                <Link to="/contacto" className="block text-white hover:text-gray-300">
                  Contacto
                </Link>
                <Link to="/dashboard" className="block text-white hover:text-gray-300">
                  Dashboard
                </Link>
              </nav>
            </div>
          )}
        </header>
      }
    </div>
  );
};

export default Header;
