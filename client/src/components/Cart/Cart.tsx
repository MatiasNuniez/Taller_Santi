import React, { useEffect, useState } from 'react';
import { productsInterface } from '../../interfaces/Interfaces';

const ShoppingCart: React.FC = () => {
  const [cart, setCart] = useState<Array<productsInterface>>([]);
  const [promo, setPromo] = useState<number>(0); // Inicialmente 0 para un descuento de 0%
  const [totalValue, setTotalValue] = useState<number>(0);

  const removeFromCart = (id: string) => {
    const updatedCart = cart.filter((product) => product._id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => {
    return cart.reduce((total, product) => total + product.precio_u * product.cantidad, 0);
  };

  const calculatePromoValue = () => {
    const total = calculateTotal();
    if (promo > 0) {
      const discount = total * (promo / 100);
      setTotalValue(total - discount);
    } else {
      setTotalValue(total); // Sin descuento
    }
  };

  const getCart = () => {
    const cartStored = localStorage.getItem('cart');
    if (cartStored) {
      setCart(JSON.parse(cartStored));
    }
  };

  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    calculatePromoValue(); // Recalcular el total cada vez que cambie el carrito o el porcentaje
  }, [cart, promo]);

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4">Carrito de compras</h2>
      {cart.length === 0 ? (
        <p className="text-gray-500">Tu carrito está vacío.</p>
      ) : (
        <div>
          <input
            type="number"
            min="0"
            max="100"
            onChange={(e) => setPromo(parseInt(e.target.value) || 0)}
            placeholder='Porcentaje de descuento'
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-tobacco transition duration-200 mb-4"
          />
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
                    <button className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-l">-</button>
                    <span className="px-4">{product.cantidad}</span>
                    <button className="px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-r">+</button>
                  </div>
                </div>
                <div>
                  <p className="text-gray-700">Subtotal: ${(product.precio_u * product.cantidad).toFixed(2)}</p>
                  <button onClick={() => removeFromCart(product._id)} className="mt-2 text-red-500 hover:underline">Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex justify-between items-center mt-6">
            <p className="text-lg font-bold">Total: ${totalValue.toFixed(2)}</p>
            <button className="px-6 py-2 bg-tobacco text-white rounded-lg hover:bg-tobacco">Proceder al pago</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
