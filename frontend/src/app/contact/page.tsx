'use client'
import { useState } from "react";
import Swal from "sweetalert2";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const handleChange = (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    )  => {
      const {name, value} = e.target;
  
      setFormData({
        ...formData,
        [name]: value
      })
    }

    const handleSubmit = async (
      e: React.FormEvent<
        HTMLFormElement
      >
    )  => {
      e.preventDefault();
      try {
          const response = await fetch(`${apiBaseUrl}/notifications/contact`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
          });

          if (response.ok) {
            Swal.fire({
              icon: 'success',
              title: 'Correo enviado exitosamente',
              showConfirmButton: false,
              timer: 1500
            });
            setFormData({
              name: '',
              email: '',
              message: ''
            });
          } else {
            alert('Hubo un error al enviar el correo');
          }
      } catch (error) {
          alert('Hubo un error al enviar el correo');
      }
  };

  return (
    <div className="relative flex items-top justify-center min-h-screen bg-[#3f3f3f] sm:items-center sm:pt-0">
      <div className="max-w-6xl mx-auto sm:px-6 lg:px-8">
        <div className="mt-8 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="p-6 mr-2  bg-[#222222] sm:rounded-lg">
              <h1 className="text-4xl sm:text-5xl text-[#c2e94e] font-extrabold tracking-tight">
                Contactanos
              </h1>
              <p className="text-normal text-lg sm:text-2xl  text-gray-400 mt-2">
              ¿Has tenido una mala experiencia en la página? ¿Quieres dejar feedback? ¿Necesitas más detalles acerca de la idea de negocio que busca esta página?{" "}
              </p>

              <div className="flex items-center mt-8  text-gray-400">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <div className="ml-4 text-md tracking-wide font-semibold w-40">
                  Colombia, Argentina, México, Perú
                </div>
              </div>

              <div className="flex items-center mt-4 text-gray-400">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <div className="ml-4 text-md tracking-wide font-semibold w-40">
                  +44 1234567890
                </div>
              </div>

              <div className="flex items-center mt-2 text-gray-400">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                  className="w-8 h-8 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div className="ml-4 text-md tracking-wide font-semibold w-40">
                proyectofinal.g3.henry@gmail.com
                </div>
              </div>
            </div>

            <form className="p-6 flex flex-col justify-center" onSubmit={handleSubmit}>
              <div className="flex flex-col">
                <label htmlFor="name" className="hidden">
                  Nombre Completo
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  placeholder="Nombre completo"
                  className="w-100 mt-2 py-3 px-3 rounded-lg bg-[#222222] border border-gray-700 text-gray-200 font-semibold focus:border-[#C4FF0D] focus:outline-none"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col mt-2">
                <label htmlFor="email" className="hidden">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  className="w-100 mt-2 py-3 px-3 rounded-lg bg-[#222222] border border-gray-700 text-gray-200 font-semibold focus:border-[#C4FF0D] focus:outline-none"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="flex flex-col mt-2">
                <label htmlFor="tel" className="hidden">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  id="message"
                  placeholder="Mensaje"
                  className="w-100 mt-2 py-3 px-3 rounded-lg bg-[#222222] border border-gray-700 text-gray-200 font-semibold focus:border-[#C4FF0D] focus:outline-none"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button
                type="submit"
                className="md:w-32 bg-[#c2e94e]  text-[#22222] font-bold py-3 px-6 rounded-lg mt-3 hover:bg-[#C4FF0D] transition ease-in-out duration-300"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
