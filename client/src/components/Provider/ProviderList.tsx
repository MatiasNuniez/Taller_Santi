import React, { useState, useEffect } from "react";

interface Proveedor {
  _id: string;
  nombre: string;
  apellido: string;
  email: string;
  direccion: string;
  telefono: string;
  cuit: string;
}

const ListaProveedores: React.FC = () => {

  const [proveedores, setProveedores] = useState<Proveedor[]>([]);

  const [modalAbierto, setModalAbierto] = useState(false);
  const [proveedorActual, setProveedorActual] = useState<Proveedor>({ apellido: '', cuit: '', direccion: '', email: '', _id: '', nombre: '', telefono: '' });
  const [token, setToken] = useState<string>('')



  const getAllProviders = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/providers`, {
        method: 'GET',
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setProveedores(data);
      }
    } catch (error) {
      console.error('Error al hace la peticion a la base de datos')
    }
  }


  const abrirModal = (proveedor?: Proveedor) => {
    if (proveedor) {
      setProveedorActual(proveedor); 
    } 
    setModalAbierto(true);
  };


  const cerrarModal = () => {
    setModalAbierto(false);
  };


const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
  if (proveedorActual) {
    setProveedorActual({ ...proveedorActual, [e.target.name]: e.target.value });
  }
};


const guardarProveedor = async () => {
  if (proveedorActual) {
    if (proveedorActual._id) {

      try {
        const response = await fetch(`http://localhost:3000/api/editProvider`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({data: proveedorActual, idProvider: proveedorActual._id }),
        });

        if (response.ok) {
          const proveedorEditado = await response.json();
          const nuevosProveedores = proveedores.map((p) =>
            p._id === proveedorEditado._id ? proveedorEditado : p
          );
          setProveedores(nuevosProveedores);
          localStorage.setItem('proveedores', JSON.stringify(nuevosProveedores));
          setProveedorActual({ _id: '', apellido: '', cuit: '', direccion: '', email: '', nombre: '', telefono: '' });
          cerrarModal();
        }
      } catch (error) {
        console.error("Error al editar el proveedor:", error);
      }
    } else {

      try {
        const response = await fetch('http://localhost:3000/api/newProvider', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({provider: proveedorActual }),
        });

        if (response.ok) {
          const nuevoProveedor = await response.json();
          const nuevosProveedores = [...proveedores, nuevoProveedor];
          setProveedores(nuevosProveedores);
          localStorage.setItem('proveedores', JSON.stringify(nuevosProveedores));
          setProveedorActual({ _id: '', apellido: '', cuit: '', direccion: '', email: '', nombre: '', telefono: '' });
          cerrarModal();
        }
      } catch (error) {
        console.error("Error al agregar el proveedor:", error);
      }
    }
  }
};

const eliminarProveedor = async (id: string) => {
  try {
    const response = await fetch(`http://localhost:3000/api/deleteProvider/${id}`, {
      method: 'DELETE',
      headers:{
        'Authorization': `Bearer ${token}`,
      }
    });

    if (response.ok) {
      const nuevosProveedores = proveedores.filter((proveedor) => proveedor._id !== id);
      setProveedores(nuevosProveedores);
      localStorage.setItem('proveedores', JSON.stringify(nuevosProveedores));
    }
  } catch (error) {
    console.error("Error al eliminar el proveedor:", error);
  }
};

  useEffect(() => {
    let token = localStorage.getItem('sesiontoken')
    if (token) {
      setToken(token)
    }
    getAllProviders();
  }, [token])

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Lista de Proveedores</h2>
        <button
          onClick={() => abrirModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Agregar Proveedor
        </button>
      </div>

      {proveedores.length > 0 ? (
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Nombre</th>
              <th className="px-4 py-2 border">Apellido</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Teléfono</th>
              <th className="px-4 py-2 border">Dirección</th>
              <th className="px-4 py-2 border">CUIT</th>
              <th className="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map((proveedor) => (
              <tr key={proveedor._id}>
                <td className="border px-4 py-2">{proveedor.nombre}</td>
                <td className="border px-4 py-2">{proveedor.apellido}</td>
                <td className="border px-4 py-2">{proveedor.email}</td>
                <td className="border px-4 py-2">{proveedor.telefono}</td>
                <td className="border px-4 py-2">{proveedor.direccion}</td>
                <td className="border px-4 py-2">{proveedor.cuit}</td>
                <td className="border px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => abrirModal(proveedor)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarProveedor(proveedor._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center">No hay proveedores disponibles.</p>
      )}

      {/* Modal */}
      {modalAbierto && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {proveedorActual._id && proveedorActual.apellido && proveedorActual.cuit && proveedorActual.direccion && proveedorActual.email && proveedorActual.nombre && proveedorActual.telefono ? "Editar Proveedor" : "Agregar Proveedor"}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={proveedorActual?.nombre || ""}
                onChange={manejarCambio}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Apellido</label>
              <input
                type="text"
                name="apellido"
                value={proveedorActual?.apellido || ""}
                onChange={manejarCambio}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                name="email"
                value={proveedorActual?.email || ""}
                onChange={manejarCambio}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Teléfono</label>
              <input
                type="text"
                name="telefono"
                value={proveedorActual?.telefono || ""}
                onChange={manejarCambio}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Dirección</label>
              <input
                type="text"
                name="direccion"
                value={proveedorActual?.direccion || ""}
                onChange={manejarCambio}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">CUIT</label>
              <input
                type="text"
                name="cuit"
                value={proveedorActual?.cuit || ""}
                onChange={manejarCambio}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={cerrarModal}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={guardarProveedor}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListaProveedores;