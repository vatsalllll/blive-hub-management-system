import { useEffect } from 'react';
import api from '../../services/api';

export const ErrorMessage = ({ message }) => (
  <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4">
    {message}
  </div>
);

export const SuccessMessage = ({ message }) => (
  <div className="bg-green-50 text-green-700 p-3 rounded-md mb-4">
    {message}
  </div>
);

useEffect(() => {
  const testConnection = async () => {
    try {
      await api.get('/vehicles');
      console.log('Backend connection successful');
    } catch (error) {
      console.error('Backend connection failed:', error);
    }
  };
  testConnection();
}, []);