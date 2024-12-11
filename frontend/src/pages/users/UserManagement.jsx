import React, { useState, useEffect } from 'react';
import { fetchUsers, createUser } from '../../services/userService';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('OEM Technician');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadUsers();
  }, []);

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const newUser = await createUser({
        username,
        email,
        role,
        first_name: '',
        last_name: ''
      });
      setUsers([...users, newUser]);
      setSuccess('User created successfully');
      setError('');
      // Reset form
      setUsername('');
      setEmail('');
      setRole('OEM Technician');
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  const getRoleColor = (role) => {
    const colors = {
      'OEM Technician': 'bg-blue-100 text-blue-800',
      'Blive Technician': 'bg-green-100 text-green-800',
      'TUT': 'bg-purple-100 text-purple-800',
      'Hub Ops': 'bg-orange-100 text-orange-800',
    };
    return colors[role] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">User Management</h1>

      <div className="grid gap-6 md:grid-cols-2">
        {/* User Creation Form */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Create New User</h2>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          
          <form onSubmit={handleCreateUser} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Username
              </label>
              <input
                type="text"
                className="input-field"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select 
                className="select-field"
                value={role} 
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="OEM Technician">OEM Technician</option>
                <option value="Blive Technician">Blive Technician</option>
                <option value="TUT">TUT</option>
                <option value="Hub Ops">Hub Ops</option>
              </select>
            </div>

            <button type="submit" className="btn-primary w-full">
              Create User
            </button>
          </form>
        </div>

        {/* User List */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Current Users</h2>
          <div className="space-y-4">
            {users.map((user) => (
              <div 
                key={user.user_id} 
                className="p-4 border border-gray-200 rounded-lg hover:border-primary-500 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{user.username}</h3>
                    <p className="text-gray-600 text-sm">{user.email}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                    {user.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;