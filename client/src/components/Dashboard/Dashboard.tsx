import React from 'react'
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
    return (

        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>

            {/* Grid Responsive */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                {/* Card - Agregar Producto */}
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <h2 className="text-xl font-bold mb-4">Agregar Producto</h2>
                    <p className="text-gray-600 mb-4">
                        Añade nuevos productos al inventario con sus respectivos detalles.
                    </p>
                    <Link
                        to="/dashboard/add-product"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        Agregar Producto
                    </Link>
                </div>

                {/* Card - Agregar Proveedor */}
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <h2 className="text-xl font-bold mb-4">Agregar Proveedor</h2>
                    <p className="text-gray-600 mb-4">
                        Registra nuevos proveedores para tener control sobre tus recursos.
                    </p>
                    <Link
                        to="/dashboard/add-provider"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                    >
                        Agregar Proveedor
                    </Link>
                </div>

                {/* Card - Agregar categoria de productos */}
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <h2 className="text-xl font-bold mb-4">Agregar Categorias</h2>
                    <p className="text-gray-600 mb-4">
                        Registra nuevas categorias para los productos.
                    </p>
                    <Link
                        to="/dashboard/add-category"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                    >
                        Agregar Categoria
                    </Link>
                </div>

                {/* Historial de ventas*/}
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <h2 className="text-xl font-bold mb-4">Gestión de ventas</h2>
                    <p className="text-gray-600 mb-4">
                        Administra las ventas del sistema.
                    </p>
                    <Link
                        to="/admin/gestion-usuarios"
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
                    >
                        Historial de ventas
                    </Link>
                </div>

                {/* Card - Ver Estadísticas */}
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <h2 className="text-xl font-bold mb-4">Ver Estadísticas</h2>
                    <p className="text-gray-600 mb-4">
                        Consulta las estadísticas de ventas y rendimiento de la tienda.
                    </p>
                    <Link
                        to="/admin/estadisticas"
                        className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 transition-colors"
                    >
                        Ver Estadísticas
                    </Link>
                </div>

            </div>
        </div>

    )
}

export default Dashboard;