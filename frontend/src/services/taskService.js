import api from './api';

export const fetchTasks = async () => {
  try {
    const response = await api.get('/tasks');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching tasks');
  }
};

export const createTask = async (taskData) => {
  try {
    const response = await api.post('/tasks', taskData);
    return response.data;
  } catch (error) {
    throw new Error('Error creating task');
  }
};

export const updateTask = async (taskId, taskData) => {
  try {
    const response = await api.put(`/tasks/${taskId}`, taskData);
    return response.data;
  } catch (error) {
    throw new Error('Error updating task');
  }
}; 