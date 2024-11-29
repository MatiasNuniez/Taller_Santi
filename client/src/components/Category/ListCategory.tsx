import React, { useState, useEffect } from "react";
interface Categoria {
  _id: string;
  nombre: string;
  urlImg: string;
  marca: string;
}

const ListaCategorias: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [categoriaActual, setCategoriaActual] = useState<Categoria>({
    _id: "",
    marca: "",
    nombre: "",
    urlImg: "",
  });
  const [token, setToken] = useState<string>("");

  const abrirModal = (categoria?: Categoria) => {
    if (categoria) {
      setCategoriaActual(categoria);
    }
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
  };

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (categoriaActual) {
      setCategoriaActual({ ...categoriaActual, [e.target.name]: e.target.value });
    }
  };

  const getAllCategories = async () => {
    if (!token) return; 

    try {
      const res = await fetch(`http://localhost:3000/api/category`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setCategorias(data);
      } else {
        console.error("Error en la respuesta de la API", res.status);
      }
    } catch (error) {
      console.error('Error al hacer la petición a la base de datos en categoria', error);
    }
  };

  const actualizarLocalStorageCategorias = (categoriasActualizadas: Array<Categoria>) => {
    localStorage.setItem('categorias', JSON.stringify(categoriasActualizadas));
  };

  const guardarCategoria = async () => {
    if (categoriaActual) {
      if (categoriaActual._id) {
        try {
          const response = await fetch(`http://localhost:3000/api/category`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ data: categoriaActual, idCategory: categoriaActual._id }),
          });

          if (response.ok) {
            const categoriaEditada = await response.json();
            const categoriasActualizadas = categorias.map((c) => (c._id === categoriaEditada._id ? categoriaEditada : c));
            setCategorias(categoriasActualizadas);
            actualizarLocalStorageCategorias(categoriasActualizadas);
            setCategoriaActual({ _id: '', marca: '', nombre: '', urlImg: '' });
            cerrarModal();
          }
        } catch (error) {
          console.error("Error al editar la categoría:", error);
        }
      } else {
        try {
          const response = await fetch('http://localhost:3000/api/category', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              nombre: categoriaActual.nombre,
              marca: categoriaActual.marca,
              urlImg: categoriaActual.urlImg,
            }),
          });

          if (response.ok) {
            let nuevaCategoria = await response.json();

            if (nuevaCategoria.Nueva_categoria) {
              nuevaCategoria = nuevaCategoria.Nueva_categoria;
            }

            const categoriasActualizadas = [...categorias, nuevaCategoria];
            setCategorias(categoriasActualizadas);
            actualizarLocalStorageCategorias(categoriasActualizadas);
            setCategoriaActual({ _id: '', marca: '', nombre: '', urlImg: '' });
            cerrarModal();
          }
        } catch (error) {
          console.error("Error al agregar la categoría:", error);
        }
      }
    }
  };

  const eliminarCategoria = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/deleteCategory/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const categoriasActualizadas = categorias.filter((categoria) => categoria._id !== id);
        setCategorias(categoriasActualizadas);
        actualizarLocalStorageCategorias(categoriasActualizadas);
      }
    } catch (error) {
      console.error("Error al eliminar la categoría:", error);
    }
  };

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('sesiontoken');
    if (tokenFromStorage) {
      setToken(tokenFromStorage);
    }
  }, []);

  useEffect(() => {
    if (token) {
      getAllCategories();
    }
  }, [token]); 

  useEffect(() => {
    console.log("Categorías actualizadas:", categorias);
  }, [categorias]);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Lista de Categorías</h2>
        <button
          onClick={() => abrirModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          + Agregar Categoría
        </button>
      </div>

      {categorias.length > 0 ? (
        <table className="min-w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2 border">Nombre</th>
              <th className="px-4 py-2 border">URL Imagen</th>
              <th className="px-4 py-2 border">Marca</th>
              <th className="px-4 py-2 border">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria._id}>
                <td className="border px-4 py-2">{categoria.nombre}</td>
                <td className="border px-4 py-2">
                  <img src={categoria.urlImg} alt={categoria.nombre} className="w-16 h-16" />
                </td>
                <td className="border px-4 py-2">{categoria.marca}</td>
                <td className="border px-4 py-2 flex space-x-2">
                  <button
                    onClick={() => abrirModal(categoria)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => eliminarCategoria(categoria._id)}
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
        <p className="text-center">No hay categorías disponibles.</p>
      )}

      {modalAbierto && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">
              {categoriaActual._id && categoriaActual.marca && categoriaActual.nombre && categoriaActual.urlImg ? "Editar Categoría" : "Agregar Categoría"}
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={categoriaActual?.nombre || ""}
                onChange={manejarCambio}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">URL Imagen</label>
              <input
                type="text"
                name="urlImg"
                value={categoriaActual?.urlImg || ""}
                onChange={manejarCambio}
                className="w-full border rounded px-3 py-2 mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium">Marca</label>
              <input
                type="text"
                name="marca"
                value={categoriaActual?.marca || ""}
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
                onClick={guardarCategoria}
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

export default ListaCategorias;
