import { useState, useEffect } from 'react';

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:4322/api/users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSave = async (userId, updatedData) => {
    try {
      await fetch(`http://localhost:4322/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
      });
      fetchUsers(); // Refrescar la lista de usuarios
      setEditingUser(null); // Cerrar el modo de edición
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await fetch(`http://localhost:4322/api/users/${userId}`, {
        method: 'DELETE',
      });
      fetchUsers(); // Refrescar la lista de usuarios
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-purple-900">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Apellido</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Perfil</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">
                {editingUser?.id === user.id ? (
                  <input
                    type="text"
                    value={editingUser.nombre}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, nombre: e.target.value })
                    }
                  />
                ) : (
                  user.nombre
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editingUser?.id === user.id ? (
                  <input
                    type="text"
                    value={editingUser.apellido}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, apellido: e.target.value })
                    }
                  />
                ) : (
                  user.apellido
                )}
              </td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">
                {editingUser?.id === user.id ? (
                  <select
                    value={editingUser.perfil_id}
                    onChange={(e) =>
                      setEditingUser({ ...editingUser, perfil_id: parseInt(e.target.value) })
                    }
                  >
                    <option value={1}>Administrador</option>
                    <option value={2}>Usuario</option>
                  </select>
                ) : (
                  user.perfil_id === 1 ? 'Administrador' : 'Usuario'
                )}
              </td>
              <td className="py-2 px-4 border-b">
                {editingUser?.id === user.id ? (
                  <button
                    onClick={() => handleSave(user.id, editingUser)}
                    className="bg-green-500 text-white py-1 px-2 rounded"
                  >
                    Guardar
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-blue-500 text-white py-1 px-2 rounded"
                  >
                    Editar
                  </button>
                )}
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded ml-2"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;