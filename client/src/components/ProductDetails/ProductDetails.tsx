import React from "react";
import { useParams } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Producto 1",
    description: "Descripción detallada del producto 1.",
    price: "€29.99",
    imageUrl: "https://via.placeholder.com/600x400",
  },
  {
    id: 2,
    name: "Producto 2",
    description: "Descripción detallada del producto 2.",
    price: "€39.99",
    imageUrl: "https://via.placeholder.com/600x400",
  },
  {
    id: 3,
    name: "Producto 3",
    description: "Descripción detallada del producto 3.",
    price: "€49.99",
    imageUrl: "https://via.placeholder.com/600x400",
  },
  {
    id: 4,
    name: "Producto 4",
    description: "Descripción detallada del producto 4.",
    price: "€59.99",
    imageUrl: "https://via.placeholder.com/600x400",
  },
];

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  const product = products.find((p) => p.id === parseInt(id || ""));

  if (!product) {
    return <p>Producto no encontrado.</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-2xl w-full">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-64 object-cover rounded-md mb-6"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
        <p className="text-gray-700 mb-4">{product.description}</p>
        <div className="text-2xl font-bold text-blue-600 mb-6">{product.price}</div>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors">
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
