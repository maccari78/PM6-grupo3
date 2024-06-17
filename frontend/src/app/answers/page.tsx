'use client'
import { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "¿Qué es You Drive?",
      answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, temporibus repudiandae? Perspiciatis qui quas totam dignissimos ab sequi labore ipsum laudantium at? Tempora nostrum ea odit distinctio, ex explicabo ipsum?",
    },
    {
      question: "¿Cómo puedo contactarme con soporte?",
      answer: "Puedes contactarte con soporte a través de nuestro formulario de contacto o llamando al 123-456-7890.",
    },
    {
      question: "¿Cuáles son los requisitos para alquilar mi auto?",
      answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, temporibus repudiandae? Perspiciatis qui quas totam dignissimos ab sequi labore ipsum laudantium at? Tempora nostrum ea odit distinctio, ex explicabo ipsum?",
    },
    {
      question: "¿YouDrive cobra comisión por alquiler?",
      answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, temporibus repudiandae? Perspiciatis qui quas totam dignissimos ab sequi labore ipsum laudantium at? Tempora nostrum ea odit distinctio, ex explicabo ipsum?",
    },
    {
      question: "¿Cómo funcionan las reservas?",
      answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, temporibus repudiandae? Perspiciatis qui quas totam dignissimos ab sequi labore ipsum laudantium at? Tempora nostrum ea odit distinctio, ex explicabo ipsum?",
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
