'use client'
import React, { useState } from 'react';
import { FaEdit, FaTrash, FaSort } from 'react-icons/fa';

interface CarPost {
  id: number;
  title: string;
  price: number;
  date: string;
  image: string;
}

const initialCarPosts: CarPost[] = [
  { id: 1, title: 'Ford Mustang', price: 100, date: '2023-06-01', image: 'https://via.placeholder.com/150' },
  { id: 2, title: 'Chevrolet Camaro', price: 120, date: '2023-06-05', image: 'https://via.placeholder.com/150' },
  { id: 3, title: 'Dodge Charger', price: 110, date: '2023-06-10', image: 'https://via.placeholder.com/150' },
  { id: 4, title: 'BMW M3', price: 130, date: '2023-06-12', image: 'https://via.placeholder.com/150' },
  { id: 5, title: 'Audi R8', price: 150, date: '2023-06-15', image: 'https://via.placeholder.com/150' },
];

const CarPostCard: React.FC = () => {
  const [carPosts, setCarPosts] = useState<CarPost[]>(initialCarPosts);
  const [editingCarPostId, setEditingCarPostId] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Partial<CarPost>>({});
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortField, setSortField] = useState<keyof CarPost | null>(null);

  const handleEdit = (post: CarPost) => {
    setEditingCarPostId(editingCarPostId === post.id ? null : post.id);
    setEditForm(post);
  };

  const handleDelete = (postId: number) => {
    setCarPosts(carPosts.filter(post => post.id !== postId));
  };

  const handleSave = (post: CarPost) => {
    setCarPosts(carPosts.map(p => (p.id === post.id ? { ...p, ...editForm } : p)));
    setEditingCarPostId(null);
    setEditForm({});
  };

  const handleSort = (field: keyof CarPost) => {
    const sortedPosts = [...carPosts].sort((a, b) => {
      if (a[field] < b[field]) return sortOrder === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    setCarPosts(sortedPosts);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setSortField(field);
  };

  const filteredCarPosts = carPosts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Buscar por título"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md w-1/3"
        />
        <div className="flex space-x-4">
          <button
            className="flex items-center bg-gray-200 p-2 rounded-md hover:bg-gray-300"
            onClick={() => handleSort('title')}
          >
            Ordenar por Título <FaSort className="ml-2" />
          </button>
          <button
            className="flex items-center bg-gray-200 p-2 rounded-md hover:bg-gray-300"
            onClick={() => handleSort('date')}
          >
            Ordenar por Fecha <FaSort className="ml-2" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCarPosts.map(post => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow-sm">
            <img src={post.image} alt={post.title} className="w-full h-40 object-cover rounded-md mb-4" />
            {editingCarPostId === post.id ? (
              <div>
                <input
                  type="text"
                  value={editForm.title || ''}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  className="mb-2 p-2 border rounded-md w-full"
                />
                <input
                  type="number"
                  value={editForm.price || 0}
                  onChange={(e) => setEditForm({ ...editForm, price: parseInt(e.target.value) })}
                  className="mb-2 p-2 border rounded-md w-full"
                />
                <input
                  type="date"
                  value={editForm.date || ''}
                  onChange={(e) => setEditForm({ ...editForm, date: e.target.value })}
                  className="mb-2 p-2 border rounded-md w-full"
                />
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  onClick={() => handleSave(post)}
                >
                  Save
                </button>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-2">${post.price} per day</p>
                <p className="text-gray-500 mb-2">Available from: {post.date}</p>
                <div className="flex space-x-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                    onClick={() => handleEdit(post)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                    onClick={() => handleDelete(post.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarPostCard;