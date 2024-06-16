import React from 'react';

const SidebarAdm: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-semibold">
        Admin Dashboard
      </div>
      <nav className="flex-grow">
        <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          Dashboard
        </a>
        <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          Users
        </a>
        <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700">
          Settings
        </a>
      </nav>
    </aside>
  );
}

export default SidebarAdm;