import React, { useState, useEffect } from "react";
interface Venta {
  _id: string;
  fecha: number;
  idVenta: string;
  total: number;
}

const SalesHistory: React.FC = () => {
  const [ventas, setVentas] = useState<Array<Venta>>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  
  const getAllVentas = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/ventas`, {
        method: 'GET',
      });
      if (res.ok) {
        const data = await res.json();
        setVentas(data);
      }
    } catch (error) {
      console.error('Error al hacer la petición a la base de datos')
    }
  }

  const filterVentas = (ventas: Array<Venta>, term: string) => {
    return ventas.filter(venta => {
      const idVentaMatch = venta.idVenta.toLowerCase().includes(term.toLowerCase());
      const fechaMatch = new Date(venta.fecha).toLocaleDateString().includes(term);
      return idVentaMatch || fechaMatch;
    });
  };

  useEffect(() => {
    getAllVentas();
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center mb-4">Historial de Ventas</h1>
      
      {/* Buscador */}
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Buscar por ID o Fecha"
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <div className="bg-white shadow-md rounded-lg">
        {filterVentas(ventas, searchTerm).reverse().map((venta) => (
          <div key={venta._id} className="border-b">
            <div className="p-4 flex justify-between items-center bg-gray-100">
              <div>
                <p>
                  <span className="font-bold">ID Venta:</span> # {venta.idVenta}
                </p>
                <p>
                  <span className="font-bold">Total:</span> ${venta.total}
                </p>
                <p>
                  <span className="font-bold">Fecha:</span> {new Date(venta.fecha).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SalesHistory;