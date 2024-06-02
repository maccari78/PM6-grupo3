import React from 'react';

const DashboardComprador: React.FC = () => {
  return (
    <>
    <div className='p-4 bg-[#313139]'>

    </div>
    <div className="max-w-6xl mx-auto rounded-xl bg-[#313139]">
      {/* Sección de bienvenida */}
      <div className="bg-[#333333] rounded-lg shadow-md p-6 mb-2">
        <h1 className="text-3xl font-bold text-gray-200">Bienvenido, <span className='text-[#C4FF0D]'>[Nombre de Usuario]!</span></h1>
        <p className="text-gray-300 mt-2">Estamos encantados de tenerte de vuelta. Aquí tienes un resumen de tus actividades recientes.</p>
        <button className="mt-4 bg-[#232326] text-white px-4 py-2 rounded-full hover:bg-gray-700">
          Crear Nueva Publicación
        </button>
      </div>

      {/* Sección de reservas activas */}
      <div className="bg-[#2d2d2d] rounded-lg shadow-md p-6 mb-2">
        <h2 className="text-2xl font-semibold text-[#C4FF0D]">Reservas activas</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <ReservationCard
            carModel="Ford F-150 Raptor"
            reservationDate="01/06/2024"
            price="$23"
            imageUrl="https://via.placeholder.com/150"
            />
          <ReservationCard
            carModel="Ford F-150 Raptor"
            reservationDate="01/06/2024"
            price="$23"
            imageUrl="https://via.placeholder.com/150"
            />
          
          <ReservationCard
            carModel="Ford F-150 Raptor"
            reservationDate="01/06/2024"
            price="$23"
            imageUrl="https://via.placeholder.com/150"
            />
          
          {/* Agrega más ReservationCards según sea necesario */}
        </div>
       
        
      </div>

      {/* Sección de publicaciones recientes */}
      <div className="bg-[#333333] rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold text-[#C4FF0D]">Reservas recientes</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <PublicationCard
            carModel="Ford Mustang"
            postDate="19/03/2024"
            author="Morris Muthigani"
            imageUrl="https://via.placeholder.com/150"
            />
          <PublicationCard
            carModel="Ford Mustang"
            postDate="19/03/2024"
            author="Morris Muthigani"
            imageUrl="https://via.placeholder.com/150"
            />
          <PublicationCard
            carModel="Ford Mustang"
            postDate="19/03/2024"
            author="Morris Muthigani"
            imageUrl="https://via.placeholder.com/150"
            />
          {/* Agrega más PublicationCards según sea necesario */}
        </div>
      </div>
    </div>
    <div className='p-4 bg-[#313139]'>
 {/* Sección de estadísticas */}
 <div className="max-w-6xl mx-auto bg-[#2d2d2d] rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold text-[#C4FF0D]">Estadísticas</h2>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard
            title="Total de Reservas"
            value="12"
            description="Número total de reservas realizadas."
          />
          <StatCard
            title="Gastos Totales"
            value="$1500"
            description="Cantidad total gastada en reservas."
          />
          <StatCard
            title="Reseñas Recibidas"
            value="8"
            description="Número total de reseñas recibidas."
          />
          {/* Agrega más StatCards según sea necesario */}
        </div>
      </div> 
    </div>
</>
  );
};
// Componente para mostrar estadísticas
interface StatCardProps {
    title: string;
    value: string;
    description: string;
  }
  
  const StatCard: React.FC<StatCardProps> = ({ title, value, description }) => (
    <div className="bg-[#313139] p-4 rounded-lg shadow">
      <h4 className="font-bold text-slate-300 text-lg">{title}</h4>
      <p className="text-gray-100 text-2xl font-semibold mt-2">{value}</p>
      <p className="text-gray-300 text-sm mt-1">{description}</p>
    </div>
  );
// Componente para mostrar una reserva activa
interface ReservationCardProps {
    carModel: string;
    reservationDate: string;
    price: string;
    imageUrl: string;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ carModel, reservationDate, price, imageUrl }) => (
  <div className="bg-[#313139] p-4 rounded-lg shadow">
    <img className="w-full h-32 object-cover rounded-t-lg" src={imageUrl} alt={carModel} />
    <div className="mt-2">
      <h4 className="font-bold text-lg">{carModel}</h4>
      <p className="text-gray-300 text-sm mt-1">Fecha de reserva: {reservationDate}</p>
      <p className="text-gray-100 font-semibold mt-2">{price}</p>
      <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700">
          Cancelar Reserva
        </button>
    </div>
  </div>
);

// Componente para mostrar una publicación reciente
interface PublicationCardProps {
  carModel: string;
  postDate: string;
  author: string;
  imageUrl: string;
}

const PublicationCard: React.FC<PublicationCardProps> = ({ carModel, postDate, author, imageUrl }) => (
  <div className="bg-[#313139] p-4 rounded-lg shadow">
    <img className="w-full h-32 object-cover rounded-t-lg" src={imageUrl} alt={carModel} />
    <div className="mt-2">
      <h4 className="font-bold text-lg">{carModel}</h4>
      <p className="text-gray-300 text-sm mt-1">{author} - {postDate}</p>
    </div>
  </div>
);

export default DashboardComprador;