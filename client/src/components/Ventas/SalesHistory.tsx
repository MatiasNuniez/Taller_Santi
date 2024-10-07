import React, { useState } from "react";

// Definimos la interfaz de los datos de una venta
interface Venta {
  id: number;
  producto: string;
  fecha: string;
  total: string;
  detalles: string;
}

const SalesHistory: React.FC = () => {
  // Simulación de datos de historial de ventas
  const ventas: Venta[] = [
    {
      id: 1,
      producto: "Producto A",
      fecha: "2023-09-25",
      total: "€100",
      detalles: "Cliente: Juan Pérez. Entregado el 26 de septiembre.",
    },
    {
      id: 2,
      producto: "Producto B",
      fecha: "2023-09-26",
      total: "€150",
      detalles: "Cliente: María López. Entregado el 27 de septiembre.",
    },
    {
      id: 3,
      producto: "Producto C",
      fecha: "2023-09-27",
      total: "€200",
      detalles: "Cliente: Carlos Sánchez. Entregado el 28 de septiembre.",
    },
  ];

  // Estado para controlar qué venta está desplegada (null si ninguna lo está)
  const [activeVenta, setActiveVenta] = useState<number | null>(null);

  // Función para alternar el despliegue de una venta
  const toggleVenta = (id: number) => {
    setActiveVenta(activeVenta === id ? null : id); // Alterna entre abrir y cerrar la venta
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-4">Historial de Ventas</h1>
      <div className="bg-white shadow-md rounded-lg">
        {ventas.map((venta) => (
          <div key={venta.id} className="border-b">
            <div
              onClick={() => toggleVenta(venta.id)}
              className="cursor-pointer p-4 flex justify-between items-center bg-gray-100 hover:bg-gray-200 transition duration-300"
            >
              {/* Resumen de la venta */}
              <div>
                <p><span className="font-bold">ID:</span> {venta.id}</p>
                <p><span className="font-bold">Monto:</span> {venta.total}</p>
                <p><span className="font-bold">Fecha:</span> {venta.fecha}</p>
              </div>
              <div>
                {activeVenta === venta.id ? (
                  <span className="text-blue-500">▲</span>
                ) : (
                  <span className="text-blue-500">▼</span>
                )}
              </div>
            </div>
            {/* Detalles adicionales de la venta, se despliega si es la venta activa */}
            {activeVenta === venta.id && (
              <div className="p-4 bg-gray-50 text-sm">
                <p className="text-gray-700">{venta.detalles}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesHistory;
