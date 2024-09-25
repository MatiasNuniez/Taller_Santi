import React, { useEffect, useState } from 'react';
import { productsInterface } from '../../interfaces/Interfaces';

const ShoppingCart: React.FC = () => {
  const [cart, setCart] = useState<Array<productsInterface>>([]);

  // const removeFromCart = (id: number) => {
  //   setCart(cart.filter((product) => product.id !== id));
  // };

  // const calculateTotal = () => {
  //   return cart.reduce((total, product) => total + product.price * product.quantity, 0);
  // };

  // const increaseQuantity = (id: number) => {
  //   setCart(
  //     cart.map((product) =>
  //       product.id === id
  //         ? { ...product, quantity: product.quantity + 1 }
  //         : product
  //     )
  //   );
  // };

  // const decreaseQuantity = (id: number) => {
  //   setCart(
  //     cart.map((product) =>
  //       product.id === id && product.quantity > 1
  //         ? { ...product, quantity: product.quantity - 1 }
  //         : product
  //     )
  //   );
  // };

  const getCart = () => {
    const cartStored = localStorage.getItem('cart')

    if (cartStored) {
      setCart(JSON.parse(cartStored))
    }
    
  }

  useEffect(() => {
    getCart()
  }, [])
  

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Carrito de compras</h2>

      {cart.length === 0 ? (
        <p className="text-gray-500">Tu carrito está vacío.</p>
      ) : (
        <div>
          <ul>
            {cart.map((product) => (
              <li
                key={product._id}
                className="flex justify-between items-center border-b py-4"
              >
                <div>
                  <h3 className="font-semibold">{product.nombre}</h3>
                  <p className="text-gray-500">Precio: ${product.precio_u}</p>
                  <div className="flex items-center mt-2">
                    <button
                      // onClick={() => decreaseQuantity(product._id)}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-l"
                    >
                      -
                    </button>
                    {/* <span className="px-4">{product.quantity}</span> */}
                    <button
                      // onClick={() => increaseQuantity(product.id)}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-r"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  {/* <p className="text-gray-700">Subtotal: ${product.price * product.quantity}</p> */}
                  <button
                    // onClick={() => removeFromCart(product._id)}
                    className="mt-2 text-red-500 hover:underline"
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-6">
            {/* <p className="text-lg font-bold">Total: ${calculateTotal()}</p> */}
            <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              Proceder al pago
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
