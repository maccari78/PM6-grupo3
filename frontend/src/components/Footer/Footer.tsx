import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-[#222222] p-4 font-sans">
        <div className="container mx-auto text-center text-gray-200 font-sans  text-xs">
          <p>&copy; 2024 You Drive. Todos los derechos reservados.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-white">
              Política de Privacidad
            </a>
            <a href="#" className="hover:text-white">
              Términos de Servicio
            </a>
            <a href="#" className="hover:text-white">
              Contacto
            </a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
