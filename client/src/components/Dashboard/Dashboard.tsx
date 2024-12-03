import React from 'react'
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
    return (

        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Panel de Administración</h1>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">


                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <h2 className="text-xl font-bold mb-4">Agregar Producto</h2>
                    <p className="text-gray-600 mb-4">
                        Añade productos al inventario con sus respectivos detalles.
                    </p>
                    <Link
                        to="/dashboard/add-product"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        Añadir Producto
                    </Link>
                </div>


                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <h2 className="text-xl font-bold mb-4">Agregar Proveedor</h2>
                    <p className="text-gray-600 mb-4">
                        Añade, edita o elimina proveedores en el inventario con sus respectivos detalles.
                    </p>
                    <Link
                        to="/dashboard/providers"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                    >
                        Administrar Proveedor
                    </Link>
                </div>


                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <h2 className="text-xl font-bold mb-4">Agregar Categorias</h2>
                    <p className="text-gray-600 mb-4">
                        Añade, edita o elimina categorias en el inventario con sus respectivos detalles.
                    </p>
                    <Link
                        to="/dashboard/categories"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
                    >
                        Administrar Categoria
                    </Link>
                </div>


                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                    <h2 className="text-xl font-bold mb-4">Gestión de ventas</h2>
                    <p className="text-gray-600 mb-4">
                        Administra las ventas del sistema.
                    </p>
                    <Link
                        to="/SalesHistory"
                        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 transition-colors"
                    >
                        Historial de ventas
                    </Link>
                </div>
            </div>
        </div>

    )
}

export default Dashboard;