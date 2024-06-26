"use client"
import { IReview } from '@/interfaces/Iadmin';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaAlignCenter, FaEdit, FaSort, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { FiMinimize2 } from "react-icons/fi";

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!apiUrl) {
  throw new Error("Environment variable NEXT_PUBLIC_API_BASE_URL is not set");
}

const ReviewsAdm: React.FC = () => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<IReview>>({});
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortField, setSortField] = useState<string | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);
  const router = useRouter();
  const [reload, setReload] = useState<boolean>(true)
  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userSession = localStorage.getItem("userSession");
      if (userSession) {
        const parsedSession = JSON.parse(userSession);
        setUserToken(parsedSession.token);  
      } else {
        Swal.fire({
          title: "Error de acceso",
          text: "Necesitas estar logueado para ingresar",
          icon: "error"
        });
        redirect("/login")
      }
    }
  }, [router]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/reviews`, {
          method: 'GET',
        });
        const data: IReview[] = await response.json();
        if (Array.isArray(data)) {
          setReviews(data);
        } else {
          console.error('Expected an array but received:', data);
          setReviews([]);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [reload]);

  const handleEdit = (review: IReview) => {
    setEditingReviewId(editingReviewId === review.id ? null : review.id);
    setEditForm(review);
  };

  const handleDelete = async (reviewId: string) => {
      const apiKey = process.env.NEXT_PUBLIC_CUSTOM_HEADERS_KEY;
    
    try {
      const response = await fetch(`${apiUrl}/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${userToken}`,
            [apiKey!]: process.env.NEXT_PUBLIC_CUSTOM_HEADERS_VALUE!,          
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setEditingReviewId(editingReviewId === reviewId ? null : reviewId);
        Swal.fire('Borrado', 'La Review ha sido borrada', 'success');
        setReload(false)
      } else {
        throw new Error('Error de borrado del review');
      }
    } catch (error: any) {
      console.error('Error delete review:', error.message);
      Swal.fire('Error', 'No se pudo eliminar la reseña', 'error');
    }
    setReload(true)
    setReviews(reviews.filter(review => review.id !== reviewId));
  };

  const handleSave = async (review: IReview) => {
      const apiKey = process.env.NEXT_PUBLIC_CUSTOM_HEADERS_KEY;

    try {
      const response = await fetch(`${apiUrl}/reviews/${review.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${userToken}`,
            [apiKey!]: process.env.NEXT_PUBLIC_CUSTOM_HEADERS_VALUE!,          
          'Content-Type': 'application/json',

        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        Swal.fire({
          title: "Buen trabajo!",
          text: "Datos actualizados correctamente",
          icon: "success"
        });
        const updatedReview = await response.json();
        setReviews(reviews.map(r => (r.id === review.id ? updatedReview : r)));
        setEditingReviewId(null);
        setEditForm({});
        setReload(false)
      } else {
        Swal.fire({
          title: "Error",
          text: "No se han podido actualizar los datos",
          icon: "error"
        });
      }
    } catch (error: any) {
    
    }finally{
      setReload(true)
    }
  };

  const handleSort = (field: string) => {
    const sortedReviews = [...reviews].sort((a, b) => {
      const aValue = field === 'rating' ? a.rating : a.comment;
      const bValue = field === 'rating' ? b.rating : b.comment;
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    setReviews(sortedReviews);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setSortField(field);
  };

  const filteredReviews = reviews.filter(review =>
    review.user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Buscar por nombre de usuario"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md w-1/3"
        />
        <div className="flex space-x-4">
          <button
            className="flex items-center bg-gray-200 p-2 rounded-md hover:bg-gray-300"
            onClick={() => handleSort('comment')}
          >
            Ordenar por Comentario <FaSort className="ml-2" />
          </button>
          <button
            className="flex items-center bg-gray-200 p-2 rounded-md hover:bg-gray-300"
            onClick={() => handleSort('rating')}
          >
            Ordenar por Calificación <FaSort className="ml-2" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredReviews.map(review => (
          <div key={review.id} className="bg-white p-4 rounded-lg shadow-sm">
            {editingReviewId === review.id ? (
              <div>
                <input
                  type="number"
                  value={editForm.rating}
                  onChange={(e) => setEditForm({ ...editForm, rating: parseInt(e.target.value) })}
                  className="mb-2 p-2 border rounded-md w-full"
                />
                <textarea
                  value={editForm.comment || ''}
                  onChange={(e) => setEditForm({ ...editForm, comment: e.target.value })}
                  className="mb-2 p-2 border rounded-md w-full"
                />
                <div className='flex justify-evenly'>
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                  onClick={() => handleSave(review)}
                >
                  Guardar
                </button>
                <button
                    className="bg-red-600 text-white px-4  rounded-md hover:bg-red-500"
                    onClick={() => handleEdit(review)}
                  >
                    <FiMinimize2 />
                  </button>
                </div>
                
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold mb-2">{review.user.name}</h3>
                <p className="text-gray-600 mb-2">Calificación: {review.rating}</p>
                <p className="text-gray-500 mb-2">{review.comment}</p>
                <div className="flex space-x-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                    onClick={() => handleEdit(review)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                    onClick={() => handleDelete(review.id)}
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
  
  export default ReviewsAdm;