'use client'
import React, { useEffect, useState } from 'react';
import { FaEdit, FaTrash, FaSort, FaBan } from 'react-icons/fa';
import { IUserAdm } from '@/interfaces/IUser';
import Swal from 'sweetalert2';
import { RiCloseFill } from 'react-icons/ri';
import { useRouter } from 'next/navigation';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
if (!apiUrl) {
  throw new Error("Environment variable NEXT_PUBLIC_API_BASE_URL is not set");
}

const UserTable: React.FC<{ userRole: string }> = ({ userRole }) => {
  const [users, setUsers] = useState<IUserAdm[]>([]);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Partial<IUserAdm>>({});
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortField, setSortField] = useState<string | null>(null);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [reload, setReload] = useState<boolean>(false)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('userSession');
    if (token) {
      const parsedToken = JSON.parse(token);
      setUserToken(parsedToken.token);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/users`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error fetching user data');
        }

        const data: IUserAdm[] = await response.json();
        setUsers(data);
      } catch (error: any) {
        console.error('Error fetching user data:', error.message);
      }
    };

    if (userToken) {
      fetchData();
    }
  }, [userToken, reload]);

  const handleEdit = (user: IUserAdm) => {
    setEditingUserId(editingUserId === user.id ? null : user.id);
    setEditForm(user);
  };

  const handleDelete = async (userId: string) => {
    Swal.fire({
      title: '¿Estás seguro de que deseas borrar este usuario?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
try {
      const response = await fetch(`${apiUrl}/users/soft-delete/${userId}`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setUsers(users.filter(user => user.id !== userId));
        Swal.fire('Usuario baneado', 'El usuario ha sido baneado correctamente', 'success');
      } else {
        throw new Error('Error banning user');
      }
    } catch (error: any) {
      console.error('Error banning user:', error.message);
      Swal.fire('Error', 'No se pudo banear al usuario', 'error');
    }
       }
    })
    
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
        
        setUsers(users.map(u => (u.id === user.id ? updatedUser : u)));
        setEditingUserId(null);
        setEditForm({});
        
        Swal.fire('Usuario actualizado', 'El usuario ha sido actualizado correctamente', 'success');
       setReload(false)
      } else {
        console.error('Failed to update the user');
        Swal.fire('Error', 'No se pudo actualizar el usuario', 'error');
      }
    } catch (error: any) {
      console.error('Error updating the user:', error.message);
    }
    finally{setReload(true)}
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
                  value={editForm.email || ''}
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
                  disabled={userRole !== 'superadmin'}
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
                {userRole === 'superadmin' && <p className="text-gray-500 mb-2">Rol: {user.roles}</p>}
                <div className="flex space-x-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                    onClick={() => handleEdit(user)}
                  >
                    <FaEdit />
                  </button>
                  {userRole === 'superadmin' ? (
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                      onClick={() => handleDelete(user.id)}
                    >
                      <FaBan />
                    </button>
                  ):''}
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