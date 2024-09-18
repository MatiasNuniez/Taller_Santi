import React, { useState } from 'react';
import { ProvidersInterface } from '../../interfaces/Interfaces'

const AddProvider: React.FC = () => {
    // Estado para el producto
    const [provider, setProvider] = useState<ProvidersInterface>({
        nombre:'',
        apellido:'',
        cuit:'',
        direccion:'',
        email:'',
        telefono:''
    });

    const [userDNI, setUserDNI] = useState<string>('40790916') 

    // Función para manejar los cambios en los campos del formulario
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProvider({
            ...provider,
            [name]: value
        });
    };

    // Función para manejar el registro del producto
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!provider.nombre || !provider.apellido || !provider.cuit || !provider.direccion || !provider.telefono || !provider.email) {
            alert('Complete todos los campos')
        } else {
            try {
                const res = await fetch('http://localhost:3000/api/newProvider', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ provider, userDNI })
                  })

                  const data = await res.json()
                  console.log(data);
                  
            } catch (error) {
                alert('Error al consultar a la base de datos')
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 text-center">Registrar proveedor</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                            Nombre del Proveedor
                        </label>
                        <input
                            id="nombre"
                            name="nombre"
                            type="text"
                            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Introduce el nombre del proveedor"
                            value={provider.nombre}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="apellido">
                            Apellido
                        </label>
                        <input
                            id="apellido"
                            name="apellido"
                            type="text"
                            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Introduce el apellido del proveedor"
                            value={provider.apellido}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Introduce el email del proveedor"
                            value={provider.email}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cuit">
                            Cuit
                        </label>
                        <input
                            id="cuit"
                            name="cuit"
                            type="number"
                            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Introduce el cuit"
                            value={provider.cuit}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="telefono">
                            Telefono
                        </label>
                        <input
                            id="telefono"
                            name="telefono"
                            type="number"
                            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Introduce el telefono del proveedor"
                            value={provider.telefono}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="direccion">
                            Direccion
                        </label>
                        <input
                            id="direccion"
                            name="direccion"
                            type="text"
                            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Introduce la direccion"
                            value={provider.direccion}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Registrar Proveedor
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProvider;
