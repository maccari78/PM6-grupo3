import React from 'react'

const Navbar = () => {
  return (
    <>
      <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-lg font-bold">
          Logo
        </div>
        <div className="space-x-4">
          <a href="#" className="text-gray-300 hover:text-white">
            Inicio
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            Servicios
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            Contacto
          </a>
        </div>
      </div>
    </nav>
    </>
  )
}

export default Navbar
