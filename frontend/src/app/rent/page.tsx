import Sidebar from '@/components/DashboardComponents/Sidebar';
import React from 'react';

const DashboardVendedor: React.FC = () => {
  return (
    <>
    <div className='bg-[#313139]'>
    <Sidebar/>    
    <div className="p-4 max-w-6xl mx-auto rounded-xl bg-[#313139]">
      {/* Sección de bienvenida */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Bienvenido, [Nombre del Vendedor]</h1>
          <p className="text-gray-600 mt-2">Estamos encantados de verte de nuevo. Aquí tienes un resumen de tu actividad reciente y herramientas para gestionar tus ventas.</p>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700">
          Crear Nueva Publicación
        </button>
      </div>
      
      {/* Sección de ventas recientes */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Tus Ventas Recientes</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <SaleCard
            carModel="Toyota Corolla 2021"
            saleDate="01/06/2024"
            price="$20,000"
            imageUrl="https://via.placeholder.com/150"
          />
          <SaleCard
            carModel="Honda Civic 2020"
            saleDate="15/05/2024"
            price="$18,000"
            imageUrl="https://via.placeholder.com/150"
          />
          {/* Agrega más SaleCards según sea necesario */}
        </div>
      </div>

      {/* Sección de vehículos listados */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Tus Vehículos Listados</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ListedCarCard
            carModel="Ford Mustang 2022"
            price="$30,000"
            imageUrl="https://via.placeholder.com/150"
          />
          <ListedCarCard
            carModel="Chevrolet Camaro 2021"
            price="$28,000"
            imageUrl="https://via.placeholder.com/150"
          />
          {/* Agrega más ListedCarCards según sea necesario */}
        </div>
      </div>

      {/* Sección de estadísticas de ventas */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800">Estadísticas de Ventas</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            title="Ventas Totales"
            value="120"
            description="Total de ventas realizadas este mes."
          />
          <StatCard
            title="Ingresos"
            value="$240,000"
            description="Ingresos generados este mes."
          />
          <StatCard
            title="Promedio de Precio"
            value="$20,000"
            description="Precio promedio de los vehículos vendidos."
          />
          {/* Agrega más StatCards según sea necesario */}
        </div>
      </div>
    </div>
    </div>
    </>
    );
};

// Componente para mostrar una venta reciente
interface SaleCardProps {
  carModel: string;
  saleDate: string;
  price: string;
  imageUrl: string;
}

const SaleCard: React.FC<SaleCardProps> = ({ carModel, saleDate, price, imageUrl }) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow">
    <img className="w-full h-32 object-cover rounded-t-lg" src={imageUrl} alt={carModel} />
    <div className="mt-2">
      <h4 className="font-bold text-lg">{carModel}</h4>
      <p className="text-gray-600 text-sm mt-1">Fecha de venta: {saleDate}</p>
      <p className="text-gray-800 font-semibold mt-2">{price}</p>
    </div>
  </div>
);

// Componente para mostrar un vehículo listado
interface ListedCarCardProps {
  carModel: string;
  price: string;
  imageUrl: string;
}

const ListedCarCard: React.FC<ListedCarCardProps> = ({ carModel, price, imageUrl }) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow">
    <img className="w-full h-32 object-cover rounded-t-lg" src={imageUrl} alt={carModel} />
    <div className="mt-2">
      <h4 className="font-bold text-lg">{carModel}</h4>
      <p className="text-gray-800 font-semibold mt-2">{price}</p>
      <div className="text-center mt-4">
        <button className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-700">
          Ver más detalles
        </button>
      </div>
    </div>
  </div>
  
);

// Componente para mostrar estadísticas de ventas
interface StatCardProps {
  title: string;
  value: string;
  description: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description }) => (
  <div className="bg-gray-100 p-4 rounded-lg shadow">
    <h4 className="font-bold text-lg">{title}</h4>
    <p className="text-gray-800 font-semibold text-2xl mt-2">{value}</p>
    <p className="text-gray-600 text-sm mt-1">{description}</p>
  </div>
);

export default DashboardVendedor;