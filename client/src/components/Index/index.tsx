import React, { useState, useEffect } from "react";
import { productsInterface } from "../../interfaces/Interfaces";

const Index: React.FC = () => {

  const [products, setProducts] = useState<Array<productsInterface>>([])

  const [cart, setCart] = useState([])

  const [userDNI, setUserDNI] = useState('40790916')


  const getProducts = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/products/${userDNI}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })

      if (!res.ok) {
        throw new Error('No se completo la peticion')
      }
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      alert('Error al consultar a la base de datos')
    }
  }

  const addToCart = (newProduct: productsInterface) => {
    const cartStored = localStorage.getItem('cart');
    
    let updatedCart = [];

    if (cartStored) {
      updatedCart = JSON.parse(cartStored);
    }

    updatedCart.push(newProduct);


    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  useEffect(() => {
    getProducts()
    localStorage.setItem('cart', '')
  }, [userDNI])


  return (
    <div className="p-6">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products?.map((product) => (
          <div
            key={product._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={product.img}
              alt={product.nombre}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{product.nombre}</h3>
              <p className="text-gray-600 text-sm">{product.descripcion}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xl font-bold text-tobacco">${product.precio_u}</span>
                <button className="bg-tobacco text-white px-4 py-2 rounded-md" onClick={() => addToCart(product)}>
                  Añadir
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Index;
