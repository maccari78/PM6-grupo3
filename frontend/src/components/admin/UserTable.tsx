"use client"
import { IUserAdm } from '@/interfaces/IUser';
import { redirect, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaSort } from 'react-icons/fa';
import { RiCloseFill } from "react-icons/ri";
import Swal from 'sweetalert2';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!apiUrl) {
  throw new Error("Environment variable NEXT_PUBLIC_API_POSTS is not set");
}

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<IUserAdm[]>([]);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<IUserAdm>>({});
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortField, setSortField] = useState<string | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);
  const router = useRouter();

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
        const response = await fetch(`${apiUrl}/users`, {
          method: 'GET',
        });
        const data: IUserAdm[] = await response.json();
        if (Array.isArray(data)) {
          setUsers(data);
        } else {
          console.error('Expected an array but received:', data);
          setUsers([]);
        }
      } catch (error: any) {
        console.log(error.message);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (user: IUserAdm) => {
    setEditingUserId(editingUserId === user.id ? null : user.id);
    setEditForm(user);
  };

  const handleDelete = (userId: string) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleSave = async (user: IUserAdm) => {
    try {
      const response = await fetch(`${apiUrl}/users/${user.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      });

      if (response.ok) {
        const updatedUser = await response.json();
        setUsers(users.map(u => (u.id === user.id ? { ...u, ...editForm } : u)));
        setEditingUserId(null);
        setEditForm({});
      } else {
        console.error('Failed to update the user');
      }
    } catch (error: any) {
      console.error('Error updating the user:', error.message);
    }
  };

  const handleSort = (field: string) => {
    const sortedUsers = [...users].sort((a, b) => {
      const aValue = a[field as keyof IUserAdm];
      const bValue = b[field as keyof IUserAdm];
      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    setUsers(sortedUsers);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setSortField(field);
  };

  const filteredUsers = users.filter(user =>
    user.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md w-1/3"
        />
        <div className="flex space-x-4">
          <button
            className="flex items-center bg-gray-200 p-2 rounded-md hover:bg-gray-300"
            onClick={() => handleSort('name')}
          >
            Ordenar por Nombre <FaSort className="ml-2" />
          </button>
          <button
            className="flex items-center bg-gray-200 p-2 rounded-md hover:bg-gray-300"
            onClick={() => handleSort('email')}
          >
            Ordenar por Email <FaSort className="ml-2" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.map(user => (
          <div key={user.id} className="bg-white p-4 rounded-lg shadow-sm">
            {editingUserId === user.id ? (
              <div>
                <input
                  type="text"
                  placeholder='Nombre'
                  value={editForm.name || ''}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="mb-2 p-2 border rounded-md w-full"
                />
                <input
                  type="email"
                  placeholder='Email'
                  value={editForm.email || 'Dato sin cargar'}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="mb-2 p-2 border rounded-md w-full"
                />
                <input
                  type="text"
                  placeholder='Telefono'
                  value={editForm.phone || ''}
                  onChange={(e) => setEditForm({
                    ...editForm,
                    phone: e.target.value,
                  })}
                  className="mb-2 p-2 border rounded-md w-full"
                />
                <input
                  type="text"
                  placeholder='Rol'
                  value={editForm.roles || ''}
                  onChange={(e) => setEditForm({
                    ...editForm,
                    roles: e.target.value,
                  })}
                  className="mb-2 p-2 border rounded-md w-full"
                />
                <input
                  type="text"
                  placeholder='Vencimiento Registro'
                  value={editForm.nExpiration || ''}
                  onChange={(e) => setEditForm({
                    ...editForm,
                    nExpiration: e.target.value,
                  })}
                  className="mb-2 p-2 border rounded-md w-full"
                />
                <div className='flex justify-around'>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                    onClick={() => handleSave(user)}
                  >
                    Guardar
                  </button>
                  <button
                    className="text-red-700 px-2 py-1 rounded-md hover:text-red-400"
                    onClick={() => handleEdit(user)}
                  >
                    <RiCloseFill />
                  </button>
                </div>

              </div>
            ) : (
              <div>
                <h3 className="text-lg font-semibold mb-2">{user.name}</h3>
                <p className="text-gray-600 mb-2">{user.email}</p>
                <p className="text-gray-500 mb-2">Teléfono: {user.phone}</p>
                <p className="text-gray-500 mb-2">Rol: {user.roles}</p>
                <div className="flex space-x-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                    onClick={() => handleEdit(user)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                    onClick={() => handleDelete(user.id)}
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

export default UserTable;

