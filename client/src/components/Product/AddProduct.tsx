import React, { useState, useEffect } from 'react';
import { productInterface } from '../../interfaces/Interfaces'
import { categoryInterface } from '../../interfaces/Interfaces';
import { ProviderInterface } from '../../interfaces/Interfaces';
import { prettyDOM } from '@testing-library/react';

const AddProduct: React.FC = () => {
    // Estado para el producto
    const [product, setProduct] = useState<productInterface>({
        costo: 0,
        descripcion: '',
        idProvider: '',
        nombre: '',
        precio_u: 0,
        categoria: '',
        img: '',
        marca: '',
        cantidad:0
    });

    const [indexMarca, setIndexMarca] = useState<Number>(0)

    const [indexCategoria, setIndexCategoria] = useState<Number>(0)

    const [categories, setCategories] = useState<Array<categoryInterface>>([])

    const [idProvider, setIdProvider] = useState<String>('')

    const [providers, setProviders] = useState<Array<ProviderInterface>>([])

    const [userDNI, setUserDNI] = useState<string>('40790916')



    const getCategoriesFromLocalStorage = () => {
        const categoriesStored = localStorage.getItem('categorias');
        if (categoriesStored) {
            setCategories(JSON.parse(categoriesStored));
            console.log('Categorias cargadas desde localStorage:', JSON.parse(categoriesStored));
        } else {
            alert('No hay categorías guardadas en localStorage');
        }
    };


    const getProvidersFromLocalStorage = () => {
        const providersStored = localStorage.getItem('proveedores')
        if (providersStored) {
            setProviders(JSON.parse(providersStored))
        }
    }

    // Función para manejar los cambios en los campos del formulario
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();

        // Verifica si todos los campos requeridos están completos
        console.log(product);
        
        if (!product.costo || !product.descripcion || !product.nombre || !product.precio_u || !product.cantidad) {
            alert('Complete todos los campos');
            return; // Evita continuar con el registro si faltan campos
        }

        // Compara los índices de categoría y marca
        if (Number(indexCategoria) === Number(indexMarca)) {
            try {
                const productComplete = {
                    ...product,
                    urlImg: categories[Number(indexCategoria)].urlImg,
                    categoria: categories[Number(indexCategoria)].nombre,
                    marca: categories[Number(indexCategoria)].marca,
                    idProvider: idProvider,
                };

                const res = await fetch('http://localhost:3000/api/newProduct', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ product: productComplete, userDNI })
                });
                const data = await res.json();
                alert('Producto registrado con éxito');
            } catch (error) {
                alert('Error al registrar el producto');
            }
        } else {
            alert('La categoría y la marca deben ser iguales para registrar el producto.');
        }
    };

    const handleChangeCategoria = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const index = e.target.selectedIndex;
        setIndexCategoria(index)
    }

    const handleChangeMarca = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const index = e.target.selectedIndex;
        setIndexMarca(index)
    }

    const handleChangeProviders = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value
        setIdProvider(id)
    }

    useEffect(() => {
        getCategoriesFromLocalStorage()
        getProvidersFromLocalStorage()
    }, [])


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
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cantidad">
                            Cantidad
                        </label>
                        <input
                            id="cantidad"
                            name="cantidad"
                            type="number"
                            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Introduce el costo del producto"
                            value={product.cantidad}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="idProvider">
                            Proveedor
                        </label>

                        <select className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" name="idProvider" id="idProvider" onChange={handleChangeProviders}>
                            {providers.map((item, index) => (
                                <option key={index} value={item._id}> {item.nombre} </option>
                            ))}
                        </select>

                        {/* <input
                            id="idProvider"
                            name="idProvider"
                            type="text"
                            className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Introduce el ID del proveedor"
                            value={product.idProvider}
                            onChange={handleInputChange}
                            required
                        /> */}
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoria">
                            Categoria
                        </label>
                        <select className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" name="categoria" id="categoria" onChange={handleChangeCategoria}>
                            {categories.map((item, index) => (
                                <option key={index}> {item.nombre} </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="marca">
                            Marca
                        </label>
                        <select className="w-full px-3 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500" name="marca" id="marca" onChange={handleChangeMarca}>
                            {categories.map((item, index) => (
                                <option key={index}> {item.marca} </option>
                            ))}
                        </select>
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
