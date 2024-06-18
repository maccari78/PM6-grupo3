'use client'
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaSort } from 'react-icons/fa';
import { IPost } from '../VehiclesComponent/interfaces/IPost';


const apiUrl = process.env.NEXT_PUBLIC_API_POSTS;
if (!apiUrl) {
  throw new Error("Environment variable NEXT_PUBLIC_API_POSTS is not set");
}
const CarPostCard: React.FC = () => {
  const [carPosts, setCarPosts] = useState<IPost[]>([]);
  const [editingCarPostId, setEditingCarPostId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<IPost>>({});
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortField, setSortField] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: 'GET',
        });
        const data: IPost[] = await response.json();
        if (Array.isArray(data)) {
          setCarPosts(data);
        } else {
          console.error('Expected an array but received:', data);
          setCarPosts([]);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (post: IPost) => {
    setEditingCarPostId(editingCarPostId === post.id ? null : post.id);
    setEditForm(post);
  };

  const handleDelete = (postId: string) => {
    setCarPosts(carPosts.filter(post => post.id !== postId));
  };

  const handleSave = async (post: IPost) => {
    try {
      const response = await fetch(`${apiUrl}/${post.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        const updatedPost = await response.json();
        setCarPosts(carPosts.map(p => (p.id === post.id ? updatedPost : p)));
        setEditingCarPostId(null);
        setEditForm({});
      } else {
        console.error('Failed to update the post');
      }
    } catch (error: any) {
      console.error('Error updating the post:', error.message);
    }
  };

  const handleSort = (field: string) => {
    const sortedPosts = [...carPosts].sort((a, b) => {
      const aValue = field === 'year' ? a.car.year : a.title;
      const bValue = field === 'year' ? b.car.year : b.title;
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
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
            onClick={() => handleSort('year')}
          >
            Ordenar por Año <FaSort className="ml-2" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCarPosts.map(post => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow-sm">
            <img src={post.car.image_url[0]} alt={post.title} className="w-full h-40 object-cover rounded-md mb-4" />
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
                  type="number"
                  value={editForm.car?.year || post.car.year}
                  onChange={(e) => setEditForm({ 
                    ...editForm, 
                    car: { 
                      ...editForm.car, 
                      year: parseInt(e.target.value), 
                      brand: post.car.brand,
                      model: post.car.model,
                      mileage: post.car.mileage,
                      color: post.car.color,
                      availability: post.car.availability,
                      image_url: post.car.image_url
                    } 
                  })}
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
                <p className="text-gray-500 mb-2">Año: {post.car.year}</p>
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