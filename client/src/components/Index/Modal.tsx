import React, { useState, useEffect } from 'react';
import { ProviderInterface } from '../../interfaces/Interfaces';

interface productsInterface {
  _id: string;
  nombre: string;
  descripcion: string;
  costo: number;
  precio_u: number;
  img: string;
  idProvider: string;
}

interface ModalProps {
  onClose: () => void;
  onSave: (data: productsInterface) => void;
  initialData: productsInterface; // Producto que se va a editar
}

const Modal: React.FC<ModalProps> = ({ onClose, onSave, initialData }) => {
  const [costo, setCosto] = useState<number>(initialData.costo);
  const [descripcion, setDescripcion] = useState<string>(initialData.descripcion);
  const [idProvider, setIdProvider] = useState<string>(initialData.idProvider || '');
  const [nombre, setNombre] = useState<string>(initialData.nombre);
  const [precioU, setPrecioU] = useState<number>(initialData.precio_u);
  const [img, setImg] = useState<string>(initialData.img);
  const [proveedores, setProveedores] = useState<ProviderInterface[]>([]);
  const [token, setToken] = useState<string>('')

  const handleSubmit = async () => {
    try {
      const formData = {
        ...initialData, // Incluimos el _id del producto original
        costo,
        descripcion,
        idProvider,
        nombre,
        precio_u: precioU,
        img,
      };
      console.log(formData);
      const res = await fetch('http://localhost:3000/api/editProduct', {
        method:'PATCH',
        headers: {
          'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ idProduct: formData._id, data: formData })
      })
      if (!res.ok) {
        throw new Error('Error al consultar a la base de dat  os')
      }
      onSave(formData); // Llamamos a onSave con los datos actualizados
      onClose(); // Cerramos el modal
    } catch (error) {
      throw new Error('Error al editar producto')
    }

  };

    // Cargar los proveedores del localStorage
    useEffect(() => {
      let token = localStorage.getItem('sesiontoken')
      if (token) {
        setToken(token)
      }
      const storedProviders = localStorage.getItem('proveedores');
      if (storedProviders) {
        setProveedores(JSON.parse(storedProviders));
      }
    }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Editar Producto</h2>

        <label className="block mb-2">
          Nombre:
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </label>

        <label className="block mb-2">
          Descripción:
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          />
        </label>

        <label className="block mb-2">
          Costo:
          <input
            type="number"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            value={costo}
            onChange={(e) => setCosto(Number(e.target.value))}
          />
        </label>

        <label className="block mb-2">
          Precio Unitario:
          <input
            type="number"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            value={precioU}
            onChange={(e) => setPrecioU(Number(e.target.value))}
          />
        </label>

        <label className="block mb-2">
          Imagen (URL):
          <input
            type="text"
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            value={img}
            onChange={(e) => setImg(e.target.value)}
          />
        </label>

        <label className="block mb-2">
          Proveedor:
          <select
            className="w-full mt-1 p-2 border border-gray-300 rounded-md"
            value={idProvider}
            onChange={(e) => setIdProvider(e.target.value)}
          >
            <option value="">Selecciona un proveedor</option>
            {proveedores.map((provider) => (
              <option key={provider._id} value={provider._id}>
                {provider.nombre}
              </option>
            ))}
          </select>
        </label>

        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleSubmit}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
