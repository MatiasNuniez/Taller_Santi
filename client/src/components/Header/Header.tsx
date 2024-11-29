import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import img from "../../assets/logo.jpg";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setToken] = useState<string>('')

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("sesiontoken");
    localStorage.removeItem('cart');
    localStorage.removeItem('categorias');
    localStorage.removeItem('proveedores');
    localStorage.removeItem('rolxtabaqueria')
    navigate("/login");
  };

  const getCategories = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/category`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error("No se completó la petición");
      }

      if (data.length > 0) {
        localStorage.setItem("categorias", JSON.stringify(data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getProviders = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/providers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error("Error al obtener los proveedores");
      }
      localStorage.setItem("proveedores", JSON.stringify(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let token = localStorage.getItem('sesiontoken')
    if (token) {
      setToken(token)
    }
    if (
      location.pathname.toLowerCase() !== "/login" &&
      location.pathname.toLowerCase() !== "/register"
    ) {
      const categoriesStored = localStorage.getItem("categorias");
      const providersStored = localStorage.getItem("proveedores");

      if (!categoriesStored) getCategories();
      if (!providersStored) getProviders();
    }
  }, [location.pathname]);

  return (
    <div>
      {location.pathname.toLowerCase() === "/login" ||
        location.pathname.toLowerCase() === "/register" ? null : (
        <header className="bg-gradient-to-r from-white via-white to-[#8B4513]">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">

            <div className="flex items-center space-x-4">
              <img
                src={img}
                alt="La tabaquería"
                className="w-16 h-auto object-cover"
              />
              <h1 className="text-2xl font-bold text-[#8B4513]">La Tabaquería</h1>
            </div>

            <nav className="hidden md:flex space-x-6">
              <Link
                to="/"
                className="text-[#8B4513] font-bold hover:text-white transition-colors"
              >
                Inicio
              </Link>
              <Link
                to="/ventas"
                className="text-[#8B4513] font-bold hover:text-white transition-colors"
              >
                Ventas
              </Link>
              <Link
                to="/dashboard"
                className="text-[#8B4513] font-bold hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <Link
                to="/SalesHistory"
                className="text-[#8B4513] font-bold hover:text-white transition-colors"
              >
                Historial
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white hover:text-white transition-colors rounded-md px-4 py-1 ml-4"
              >
                Cerrar sesión
              </button>

            </nav>


            <button
              onClick={toggleMenu}
              className="md:hidden text-[#8B4513] focus:outline-none"
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
            <div className="md:hidden bg-[#8B4513]">
              <nav className="px-4 py-4 space-y-2">
                <Link to="/" className="block text-white hover:text-gray-300">
                  Inicio
                </Link>
                <Link to="/ventas" className="block text-white hover:text-gray-300">
                  Ventas
                </Link>
                <Link to="/dashboard" className="block text-white hover:text-gray-300">
                  Dashboard
                </Link>
                <Link
                  to="/SalesHistory"
                  className="text-[#8B4513] font-bold hover:text-white transition-colors"
                >
                  Historial
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-center bg-red-500 text-white hover:text-white transition-colors rounded-md px-2 py-2"
                >
                  Cerrar sesión
                </button>
              </nav>
            </div>

          )}
        </header>
      )}
    </div>
  );
};

export default Header;
