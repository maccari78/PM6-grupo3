import React from 'react';

interface ContactProps {
  name: string;
  avatarUrl: string;
  onClick: () => void;
}

const Contact: React.FC<ContactProps> = ({ name, avatarUrl, onClick }) => {
  return (
    <div className="flex items-center p-4 hover:bg-gray-100 cursor-pointer" onClick={onClick}>
      <div className="w-10 h-10 rounded-full overflow-hidden mr-4">
        <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
      </div>
      <div>
        <p className="text-lg font-semibold">{name}</p>
      </div>
    </div>
  );
};

export default Contact;