import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between bg-white p-4 shadow-sm">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <h2 className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
        Bienvenido Admin
      </h2>
    </header>
  );
}

export default Header;