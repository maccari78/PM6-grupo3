import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-800 p-4 mt-8">
        <div className="container mx-auto text-center text-gray-400">
          <p>&copy; 2024 MiSitioWeb. Todos los derechos reservados.</p>
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
