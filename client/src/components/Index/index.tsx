import React, { useState, useEffect } from "react";
import { productsInterface } from "../../interfaces/Interfaces";
import Modal from './Modal';
import { useNavigate } from "react-router-dom";

const Index: React.FC = () => {
  const [products, setProducts] = useState<Array<productsInterface>>([]);
  const [cart, setCart] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<productsInterface | null>(null);
  const [buscado, setBuscado] = useState<string>('');
  const [token, setToken] = useState<string>('');
  const [rol, setRol] = useState<string>('');
  const navigate = useNavigate();


  const filtrado = (character: Array<productsInterface>, buscado: string) => {
    if (!buscado) return character;
    return character.filter((p) => p.nombre.toLowerCase().includes(buscado.toLowerCase()));
  };


  const filterProducts = filtrado(products, buscado);


  const addToCart = (newProduct: productsInterface) => {
    const cartStored = localStorage.getItem('cart');
    let updatedCart = [];
  
    if (cartStored) {
      updatedCart = JSON.parse(cartStored);
    }

    const isProductInCart = updatedCart.some((product: productsInterface) => product._id === newProduct._id);
  
    if (isProductInCart) {
      alert('Este producto ya está en el carrito');
      return; 
    }
  
    updatedCart.push(newProduct);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  

  const removeToDDBB = async (id: string) => {
    try {
      const deleteProduct = await fetch(`http://localhost:3000/api/deleteProduct/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })
      if (deleteProduct.ok) {
        setProducts(products.filter((product) => product._id !== id));
      }
    } catch (error) {
      throw new Error('Error al eliminar elemento');
    }
  };

  const handleEdit = (product: productsInterface) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };


  const handleSave = (updatedProduct: any) => {
    const updatedProducts = products.map((product) =>
      product._id === updatedProduct._id ? updatedProduct : product
    );
    setProducts(updatedProducts);
    setIsModalOpen(false);
  };


  const handleBusc = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;
    setBuscado(searchValue);
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('sesiontoken');
    if (storedToken) {
      setToken(storedToken);
    } else {
      navigate('/login');
    }
    const storedRol = localStorage.getItem('rolxtabaqueria');
    setRol(storedRol === 'admin' ? 'admin' : 'empleado');
    localStorage.setItem('cart', '');
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!token) return;

      try {
        const res = await fetch(`http://localhost:3000/api/products`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });

        if (!res.ok) {
          throw new Error('No se completó la petición');
        }

        const data = await res.json();
        if (data.length > 0) {
          setProducts(data);
        } else {
          console.warn('No se encontraron productos en la base de datos.');
        }
      } catch (error) {
        console.error('Error al consultar a la base de datos desde getProductos', error);
      }
    };

    fetchProducts();
  }, [token]);

  return (
    <div className="p-6">
      <div className="mb-4">
        <input
          type="text"
          onChange={(e) => handleBusc(e)}
          placeholder='Buscar...'
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-tobacco transition duration-200"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filterProducts.length > 0 ? (
          filterProducts.map((product) => (
            <div
              key={product._id}
              className={`bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${product.cantidad < 6 ? "border-red-500 border-2" : ""
                }`}
            >
              <img
                src={product.img}
                alt={product.nombre}
                className="w-full h-48 object-contain"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">
                  {product.nombre}
                </h3>
                <p className="text-gray-600 text-sm">{product.descripcion}</p>
                <p className="text-gray-500 text-sm">
                  Cantidad disponible: <span className="font-bold">{product.cantidad}</span>
                </p>
                {product.cantidad < 6 && (
                  <p className="text-red-600 font-semibold text-sm">
                    ¡Stock bajo! Solo quedan {product.cantidad} unidades.
                  </p>
                )}
                <div className="mt-4 flex justify-between items-center space-x-2">
                  <span className="text-2xl font-semibold text-tobacco">
                    ${product.precio_u}
                  </span>
                  {rol === "admin" && (
                    <button
                      className="bg-red-600 text-white px-3 py-1 rounded-full hover:bg-red-500 transition-colors"
                      onClick={() => removeToDDBB(product._id)}
                    >
                      Eliminar
                    </button>
                  )}
                  <button
                    className="bg-yellow-400 text-white px-3 py-1 rounded-full hover:bg-yellow-300 transition-colors"
                    onClick={() => handleEdit(product)}
                  >
                    Editar
                  </button>
                  <button
                    className="bg-tobacco text-white px-3 py-1 rounded-full hover:bg-opacity-80 transition-opacity"
                    onClick={() => addToCart(product)}
                  >
                    Vender
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No se encontraron productos
          </p>
        )}
      </div>

      {isModalOpen && selectedProduct && (
        <Modal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          initialData={selectedProduct}
        />
      )}
    </div>
  );

};

export default Index;
