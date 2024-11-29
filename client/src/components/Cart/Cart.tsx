import React, { useEffect, useState } from 'react';
import { productsInterface } from '../../interfaces/Interfaces';

const ShoppingCart: React.FC = () => {
  const [cart, setCart] = useState<Array<productsInterface & { stock: number }>>([]);
  const [promo, setPromo] = useState<number>(0);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [token, setToken] = useState<string>('')

  const removeFromCart = (id: string) => {
    const updatedCart = cart.filter((product) => product._id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const updateQuantity = (id: string, quantity: number) => {
    const updatedCart = cart.map((product) => {
      if (product._id === id) {
        return { ...product, cantidad: quantity };
      }
      return product;
    });
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const increaseQuantity = (id: string) => {
    const product = cart.find((product) => product._id === id);
    if (product) {
      // Verifica que la cantidad actual no exceda el stock disponible
      if (product.cantidad < product.stock) {
        updateQuantity(id, product.cantidad + 1);
      } else {
        alert("No puedes agregar más, has alcanzado el límite de stock.");
      }
    }
  };

  const decreaseQuantity = (id: string) => {
    const product = cart.find((product) => product._id === id);
    if (product && product.cantidad > 1) {
      updateQuantity(id, product.cantidad - 1);
    }
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
      setTotalValue(total);
    }
  };

  const getCart = () => {
    const cartStored = localStorage.getItem('cart');
    if (cartStored) {
      const cartData = JSON.parse(cartStored);
      const updatedCart = cartData.map((product: productsInterface) => ({
        ...product,
        stock: product.cantidad,
      }));
      setCart(updatedCart);
    }
  };

  const fetchBuyMP = async () => {
    try {
      // Calcular el total con el descuento aplicado
      const totalWithDiscount = calculateTotal() * (1 - promo / 100);

      // Construir los productos con precios ajustados por el descuento
      const items = cart.map((product) => ({
        id: product._id,
        title: product.nombre,
        unit_price: product.precio_u * (1 - promo / 100), // Aplica el descuento al precio unitario
        quantity: product.cantidad,
        description: product.descripcion,
        currency_id: 'ARS',
      }));

      // Enviar los datos ajustados al servidor
      const res = await fetch('http://localhost:3000/api/cartPayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items, total: totalWithDiscount }), // Incluye el total ajustado
      });

      const data = await res.json();
      console.log(data);

      if (res.ok) {
        window.location.href = data;
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    getCart();
  }, []);

  useEffect(() => {
    let token = localStorage.getItem('sesiontoken')
    if (token) {
      setToken(token)
    }
    calculatePromoValue();
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
                    <button
                      onClick={() => decreaseQuantity(product._id)}
                      className="px-2 py-1 bg-gray-300 rounded-l hover:bg-gray-400"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={product.cantidad}
                      readOnly
                      className="w-16 text-center border-t border-b border-gray-300"
                    />
                    <button
                      onClick={() => increaseQuantity(product._id)}
                      className="px-2 py-1 bg-gray-300 rounded-r hover:bg-gray-400"
                    >
                      +
                    </button>
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
            <button className="px-6 py-2 bg-tobacco text-white rounded-lg hover:bg-tobacco" onClick={fetchBuyMP}>Proceder al pago</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingCart;
