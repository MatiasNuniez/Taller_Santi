import React, { useState } from 'react';
import { productInterface } from '../../interfaces/Interfaces'

const AddProduct: React.FC = () => {
    // Estado para el producto
    const [product, setProduct] = useState<productInterface>({
        costo: 0,
        descripcion: '',
        idProvider: '',
        nombre: '',
        precio_u: 0
    });

    const [userDNI, setUserDNI] = useState<string>('40790916') 

    // Función para manejar los cambios en los campos del formulario
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    // Función para manejar el registro del producto
    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!product.costo || !product.descripcion || !product.idProvider || !product.nombre || !product.precio_u) {
            alert('Complete todos los campos')
        } else {
            try {
                const res = await fetch('http://localhost:3000/api/newProduct', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ product, userDNI })
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
                <h2 className="text-2xl font-bold mb-6 text-center">Registrar producto</h2>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">
                            Nombre del Producto
                        </label>
                        <input
                            id="nombre"
                            name="nombre"
                            type="text"
                            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Introduce el nombre del producto"
                            value={product.nombre}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">
                            Descripción
                        </label>
                        <textarea
                            id="descripcion"
                            name="descripcion"
                            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Introduce una descripción"
                            value={product.descripcion}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio_u">
                            Precio Unitario
                        </label>
                        <input
                            id="precio_u"
                            name="precio_u"
                            type="number"
                            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Introduce el precio unitario"
                            value={product.precio_u}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="costo">
                            Costo
                        </label>
                        <input
                            id="costo"
                            name="costo"
                            type="number"
                            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Introduce el costo del producto"
                            value={product.costo}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="idProvider">
                            ID del Proveedor
                        </label>
                        <input
                            id="idProvider"
                            name="idProvider"
                            type="text"
                            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Introduce el ID del proveedor"
                            value={product.idProvider}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Registrar Producto
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
