import React from "react";

const products = [
  {
    id: 1,
    name: "Producto 1",
    description: "Descripción breve del producto 1.",
    price: "€29.99",
    imageUrl: "https://via.placeholder.com/300x200",
  },
  {
    id: 2,
    name: "Producto 2",
    description: "Descripción breve del producto 2.",
    price: "€39.99",
    imageUrl: "https://via.placeholder.com/300x200",
  },
  {
    id: 3,
    name: "Producto 3",
    description: "Descripción breve del producto 3.",
    price: "€49.99",
    imageUrl: "https://via.placeholder.com/300x200",
  },
  {
    id: 4,
    name: "Producto 4",
    description: "Descripción breve del producto 4.",
    price: "€59.99",
    imageUrl: "https://via.placeholder.com/300x200",
  },
  {
    id: 4,
    name: "Producto 4",
    description: "Descripción breve del producto 4.",
    price: "€59.99",
    imageUrl: "https://via.placeholder.com/300x200",
  },
];

const Index: React.FC = () => {
  return (
    <div className="p-6">

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold text-gray-800">{product.name}</h3>
              <p className="text-gray-600 text-sm">{product.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-xl font-bold text-blue-600">{product.price}</span>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
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
