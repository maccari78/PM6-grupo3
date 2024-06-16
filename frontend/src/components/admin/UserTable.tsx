"use client"
import React, { useState } from 'react';
import { FaEdit, FaTrash, FaSort } from 'react-icons/fa';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

const initialUsers: User[] = [
  { id: 1, name: 'Juan Pérez', email: 'juan.perez@example.com', role: 'Admin' },
  { id: 2, name: 'María Gómez', email: 'maria.gomez@example.com', role: 'User' },
  { id: 3, name: 'Carlos Rodríguez', email: 'carlos.rodriguez@example.com', role: 'User' },
  { id: 4, name: 'Ana Fernández', email: 'ana.fernandez@example.com', role: 'User' },
  { id: 5, name: 'Luis García', email: 'luis.garcia@example.com', role: 'User' },
  { id: 6, name: 'Marta López', email: 'marta.lopez@example.com', role: 'Admin' },
  { id: 7, name: 'Pedro Martínez', email: 'pedro.martinez@example.com', role: 'User' },
  { id: 8, name: 'Sofía Sánchez', email: 'sofia.sanchez@example.com', role: 'User' },
  { id: 9, name: 'Jorge Díaz', email: 'jorge.diaz@example.com', role: 'User' },
  { id: 10, name: 'Laura Romero', email: 'laura.romero@example.com', role: 'User' },
  { id: 11, name: 'Miguel Torres', email: 'miguel.torres@example.com', role: 'User' },
  { id: 12, name: 'Lucía Ramírez', email: 'lucia.ramirez@example.com', role: 'Admin' },
  { id: 13, name: 'Francisco Molina', email: 'francisco.molina@example.com', role: 'User' },
  { id: 14, name: 'Gabriela Ortiz', email: 'gabriela.ortiz@example.com', role: 'User' },
  { id: 15, name: 'Ricardo Herrera', email: 'ricardo.herrera@example.com', role: 'User' },
  { id: 16, name: 'Patricia Cruz', email: 'patricia.cruz@example.com', role: 'User' },
  { id: 17, name: 'Enrique Moreno', email: 'enrique.moreno@example.com', role: 'User' },
  { id: 18, name: 'Verónica Castro', email: 'veronica.castro@example.com', role: 'User' },
  { id: 19, name: 'Oscar Rivas', email: 'oscar.rivas@example.com', role: 'User' },
  { id: 20, name: 'Daniela Peña', email: 'daniela.pena@example.com', role: 'User' },
];

const UserTable: React.FC = () => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [sortField, setSortField] = useState<keyof User | null>(null);

  const handleEdit = (userId: number) => {
    setEditingUserId(editingUserId === userId ? null : userId);
  };

  const handleDelete = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  const handleSave = (user: User) => {
    setUsers(users.map(u => (u.id === user.id ? user : u)));
    setEditingUserId(null);
  };

  const handleSort = (field: keyof User) => {
    const sortedUsers = [...users].sort((a, b) => {
      if (a[field] < b[field]) return sortOrder === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    setUsers(sortedUsers);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    setSortField(field);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">User Management</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre de usuario"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md w-full"
        />
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('name')}>
              Nombre {sortField === 'name' && <FaSort />}
            </th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('email')}>
              Email {sortField === 'email' && <FaSort />}
            </th>
            <th className="px-4 py-2 cursor-pointer" onClick={() => handleSort('role')}>
              Role {sortField === 'role' && <FaSort />}
            </th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map(user => (
            <React.Fragment key={user.id}>
              <tr className="border-t">
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                    onClick={() => handleEdit(user.id)}
                  >
                    <FaEdit />
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                    onClick={() => handleDelete(user.id)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
              {editingUserId === user.id && (
                <tr className="border-t bg-gray-100">
                  <td colSpan={4} className="px-4 py-4">
                    <div className="mt-4">
                      <h3 className="text-lg font-semibold mb-2">Edit User</h3>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSave(user);
                        }}
                      >
                        <div className="mb-2">
                          <label className="block text-sm font-medium">Nombre</label>
                          <input
                            type="text"
                            value={user.name}
                            onChange={(e) =>
                              setUsers(users.map(u =>
                                u.id === user.id ? { ...u, name: e.target.value } : u
                              ))
                            }
                            className="mt-1 p-2 border rounded-md w-full"
                          />
                        </div>
                        <div className="mb-2">
                          <label className="block text-sm font-medium">Email</label>
                          <input
                            type="email"
                            value={user.email}
                            onChange={(e) =>
                              setUsers(users.map(u =>
                                u.id === user.id ? { ...u, email: e.target.value } : u
                              ))
                            }
                            className="mt-1 p-2 border rounded-md w-full"
                          />
                        </div>
                        <div className="mb-2">
                          <label className="block text-sm font-medium">Role</label>
                          <input
                            type="text"
                            value={user.role}
                            onChange={(e) =>
                              setUsers(users.map(u =>
                                u.id === user.id ? { ...u, role: e.target.value } : u
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

export default UserTable;
