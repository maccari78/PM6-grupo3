'use client'
import { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "¿Qué es YouDrive?",
      answer: "YouDrive es una plataforma innovadora que facilita el alquiler de vehículos de manera rápida y segura, conectando a propietarios de autos con usuarios que necesitan rentar un vehículo por cortos o largos períodos.",
    },
    {
      question: "¿Cómo puedo contactarme con soporte?",
      answer: "Puedes contactarte con soporte llamando al 123-456-7890.",
    },
    {
      question: "¿Cuáles son los requisitos para alquilar mi auto?",
      answer: "Para alquilar tu auto en YouDrive, debes ser propietario del vehículo, tener una licencia de conducir válida, y proporcionar una copia del seguro del auto. También es necesario que el auto cumpla con nuestros estándares de seguridad y mantenimiento.",
    },
    {
      question: "¿YouDrive cobra comisión por alquiler?",
      answer: "Sí, YouDrive cobra una comisión del 5% sobre el monto total del alquiler. Esta comisión cubre los costos de operación y mantenimiento de la plataforma, así como el soporte al cliente.",
    },
    {
      question: "¿Cómo funcionan las reservas?",
      answer: "Las reservas en YouDrive se realizan a través de nuestra plataforma en línea. Los usuarios pueden buscar y seleccionar un vehículo disponible, elegir las fechas de alquiler, y confirmar la reserva realizando el pago correspondiente. Los propietarios recibirán una notificación con los detalles de la reserva y pueden aceptar o rechazar la solicitud.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="font-sans text-white m-0 bg-[url('/background_register_2.svg')] bg-no-repeat bg-cover relative z-3 w-full pt-[70px] px-[30px] pb-[44px] flex justify-center items-center min-h-screen bg-gray-900 h-min ">
    <div className="w-1/2 mx-auto p-10 bg-black/10 text-white">
      <h2 className="text-3xl font-bold mb-4">Preguntas Frecuentes</h2>
      {faqs.map((faq, index) => (
        <div key={index} className="mb-4 border-b">
          <button
            className="w-full text-left py-2 focus:outline-none"
            onClick={() => toggleFAQ(index)}
          >
            <h3 className="text-xl font-semibold">{faq.question}</h3>
          </button>
          {activeIndex === index && (
            <div className="py-2">
              <p>{faq.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
    </div>
  );
};

export default FAQ;
