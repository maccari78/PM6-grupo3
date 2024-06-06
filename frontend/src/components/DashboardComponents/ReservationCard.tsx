import { ReservationCardProps } from '@/interfaces/dashboard'
import React from 'react'


const ReservationCard: React.FC<ReservationCardProps> = ({ carModel, reservationDate, price, imageUrl }) => {
  return (
    <div className="bg-[#313139] p-4 rounded-lg shadow">
      {imageUrl && <img className="w-full h-32 object-cover rounded-t-lg" src={imageUrl} alt={carModel} />}
      <div className="mt-2">
        <h4 className="text-slate-100 font-bold text-lg">{carModel}</h4>
        <p className="text-gray-300 text-sm mt-1">Fecha de reserva: {reservationDate}</p>
        <p className="text-gray-200 font-semibold mt-2">{price}</p>
        <button className="mt-4 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700">
          Cancelar Reserva
        </button>
      </div>
    </div>
  );
};

export default ReservationCard;

