"use client";
import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash, FaSort } from "react-icons/fa";
import { IPost } from "../VehiclesComponent/interfaces/IPost";
import Swal from "sweetalert2";
import { redirect, useRouter } from "next/navigation";
import { RiCloseFill } from "react-icons/ri";

const apiUrl = process.env.NEXT_PUBLIC_API_POSTS;
if (!apiUrl) {
  throw new Error("Environment variable NEXT_PUBLIC_API_POSTS is not set");
}

const CarPostCard: React.FC = () => {
  const [carPosts, setCarPosts] = useState<IPost[]>([]);
  const [editingCarPostId, setEditingCarPostId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<IPost>>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortField, setSortField] = useState<string | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [reload, setReload] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userSession = localStorage.getItem("userSession");
      if (userSession) {
        const parsedSession = JSON.parse(userSession);
        setUserToken(parsedSession.token);
      }
    }
  }, [router]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
        });
        const data: IPost[] = await response.json();
        if (Array.isArray(data)) {
          setCarPosts(data);
          console.log(data);
        } else {
          console.error("Expected an array but received:", data);
          setCarPosts([]);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [reload]);

  const handleEdit = (post: IPost) => {
    setEditingCarPostId(editingCarPostId === post.id ? null : post.id);
    setEditForm({
      title: post.title,
      price: post.price,
      description: post.description,
      car: {
        brand: post.car.brand,
        color: post.car.color,
        model: post.car.model,
        year: post.car.year,
      },
    });
  };

  const handleDelete = async (postId: string) => {
    try {
      const response = await fetch(`${apiUrl}/soft-delete/${postId}`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {

        setCarPosts(carPosts.filter(post => post.id !== postId));
        Swal.fire('Borrado logico', 'La publicacion ha sido eliminada', 'success');

      } else {
        throw new Error("Error de borrado del post");
      }
    } catch (error: any) {
      console.error("Error delete car:", error.message);
      Swal.fire("Error", "No se pudo Eliminar la publicacion", "error");
    }
    setCarPosts(carPosts.filter((post) => post.id !== postId));
  };

  const handleSave = async (post: IPost) => {
    try {
      const response = await fetch(`${apiUrl}/${post.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${userToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {

        if(editForm.car && post.car.image_url)
          editForm.car.image_url = [...post.car.image_url];
        
        const updatedPost: IPost = { ...post, ...editForm };   
        setCarPosts(carPosts.map(p => (p.id === post.id ? updatedPost : p)));
        
        setEditingCarPostId(null);
        setEditForm({});
        setReload(false);
      } else {
        console.error("Failed to update the post");
      }
    } catch (error: any) {
      console.error("Error updating the post:", error.message);
    } finally {
      setReload(true);
    }
  };

  const handleSort = (field: string) => {
    const sortedPosts = [...carPosts].sort((a, b) => {
      const aValue = field === "year" ? a.car.year : a.title;
      const bValue = field === "year" ? b.car.year : b.title;

      if (aValue === undefined || bValue === undefined) {
        return 0;
      }

      if (aValue < bValue) return sortOrder === "asc" ? -1 : 1;
      if (aValue > bValue) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });
    setCarPosts(sortedPosts);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    setSortField(field);
  };

  const filteredCarPosts = carPosts.filter((post) =>
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
            onClick={() => handleSort("title")}
          >
            Ordenar por Título <FaSort className="ml-2" />
          </button>
          <button
            className="flex items-center bg-gray-200 p-2 rounded-md hover:bg-gray-300"
            onClick={() => handleSort("year")}
          >
            Ordenar por Año <FaSort className="ml-2" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCarPosts.map((post) => (
          <div key={post.id} className="bg-white p-4 rounded-lg shadow-sm">
            {post.car.image_url && post.car.image_url.length > 0 ? (
              <img
                src={post.car.image_url[0]}
                alt={post.title}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
            ) : (
              <div className="w-full h-40 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                <span className="text-gray-500">No Image</span>
              </div>
            )}
            {editingCarPostId === post.id ? (
              <div>
                <input
                  type="text"
                  value={editForm.title || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, title: e.target.value })
                  }
                  className="mb-2 p-2 border rounded-md w-full"
                />
                <input
                  type="number"
                  value={editForm.price}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      price: parseInt(e.target.value),
                    })
                  }
                  className="mb-2 p-2 border rounded-md w-full"
                />
                <textarea
                  value={editForm.description || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                  className="mb-2 p-2 border rounded-md w-full"
                />
                <input
                  type="text"
                  value={editForm.car?.brand || ""}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      car: { ...editForm.car, brand: e.target.value },
                    })
                  }
                  className="mb-2 p-2 border rounded-md w-full"
                />
                <input
                  type="text"
                  value={editForm.car?.color || ""}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      car: { ...editForm.car, color: e.target.value },
                    })
                  }
                  className="mb-2 p-2 border rounded-md w-full"
                />
                <input
                  type="text"
                  value={editForm.car?.model || ""}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      car: { ...editForm.car, model: e.target.value },
                    })
                  }
                  className="mb-2 p-2 border rounded-md w-full"
                />
                <input
                  type="number"
                  value={editForm.car?.year || 0}
                  onChange={(e) =>
                    setEditForm({
                      ...editForm,
                      car: { ...editForm.car, year: parseInt(e.target.value) },
                    })
                  }
                  className="mb-2 p-2 border rounded-md w-full"
                />
                <div className="flex justify-around">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    onClick={() => handleSave(post)}
                  >
                    Guardar
                  </button>
                  <button
                    className="text-red-600 px-2 py-1 text-4xl rounded-md "
                    onClick={() => handleEdit(post)}
                  >
                    <RiCloseFill />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-2">${post.price} por día</p>
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
