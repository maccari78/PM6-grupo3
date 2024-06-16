"use client"
import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

interface Review {
  id: number;
  user: string;
  content: string;
  rating: number;
  date: string;
}

const initialReviews: Review[] = [
  { id: 1, user: 'Juan Pérez', content: 'Excelente servicio!', rating: 5, date: '2023-06-01' },
  { id: 2, user: 'María Gómez', content: 'Muy buena experiencia.', rating: 4, date: '2023-06-05' },
  { id: 3, user: 'Carlos Rodríguez', content: 'Podría mejorar.', rating: 3, date: '2023-06-10' },
  { id: 4, user: 'Ana Fernández', content: 'No me gustó mucho.', rating: 2, date: '2023-06-12' },
  { id: 5, user: 'Luis García', content: 'Terrible experiencia.', rating: 1, date: '2023-06-15' },
];

const Reviews: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);

  const handleEdit = (reviewId: number) => {
    setEditingReviewId(editingReviewId === reviewId ? null : reviewId);
  };

  const handleDelete = (reviewId: number) => {
    setReviews(reviews.filter(review => review.id !== reviewId));
  };

  const handleSave = (review: Review) => {
    setReviews(reviews.map(r => (r.id === review.id ? review : r)));
    setEditingReviewId(null);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Reviews</h2>
      <p className="mb-4">Esta sección muestra todas las reseñas de la página. Puedes editar o eliminar las reseñas según sea necesario.</p>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2">Usuario</th>
            <th className="px-4 py-2">Reseña</th>
            <th className="px-4 py-2">Calificación</th>
            <th className="px-4 py-2">Fecha</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map(review => (
            <React.Fragment key={review.id}>
              <tr className="border-t">
                <td className="px-4 py-2">{review.user}</td>
                <td className="px-4 py-2">{review.content}</td>
                <td className="px-4 py-2">{review.rating}</td>
                <td className="px-4 py-2">{review.date}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                    onClick={() => handleEdit(review.id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                    onClick={() => handleDelete(review.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
              {editingReviewId === review.id && (
                <tr className="border-t bg-gray-100">
                  <td colSpan={5} className="px-4 py-4">
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold mb-2">Edit Review</h3>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSave(review);
                        }}
                      >
                        <div className="mb-2">
                          <label className="block text-sm font-medium">Usuario</label>
                          <input
                            type="text"
                            value={review.user}
                            onChange={(e) =>
                              setReviews(reviews.map(r =>
                                r.id === review.id ? { ...r, user: e.target.value } : r
                              ))
                            }
                            className="mt-1 p-2 border rounded-md w-full"
                          />
                        </div>
                        <div className="mb-2">
                          <label className="block text-sm font-medium">Reseña</label>
                          <textarea
                            value={review.content}
                            onChange={(e) =>
                              setReviews(reviews.map(r =>
                                r.id === review.id ? { ...r, content: e.target.value } : r
                              ))
                            }
                            className="mt-1 p-2 border rounded-md w-full"
                          />
                        </div>
                        <div className="mb-2">
                          <label className="block text-sm font-medium">Calificación</label>
                          <input
                            type="number"
                            min="1"
                            max="5"
                            value={review.rating}
                            onChange={(e) =>
                              setReviews(reviews.map(r =>
                                r.id === review.id ? { ...r, rating: parseInt(e.target.value) } : r
                              ))
                            }
                            className="mt-1 p-2 border rounded-md w-full"
                          />
                        </div>
                        <button
                          type="submit"
                          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        >
                          Save
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Reviews;