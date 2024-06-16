import React from 'react';

interface SidebarProps {
  onSelect: (section: string) => void;
}

const SidebarAdm: React.FC<SidebarProps> = ({ onSelect }) => {
  return (
    <aside className="w-64 bg-[#2f2e2e] text-white flex flex-col">
      <div className="p-4 text-2xl font-semibold">
        Admin Dashboard
      </div>
      <nav className="flex-grow">
        <button
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 w-full text-left"
          onClick={() => onSelect('dashboard')}
        >
          Dashboard
        </button>
        <button
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 w-full text-left"
          onClick={() => onSelect('users')}
        >
          Users
        </button>
        <button
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 w-full text-left"
          onClick={() => onSelect('reviews')}
        >
          Reviews
        </button>
      </nav>
    </aside>
  );
};

export default SidebarAdm;