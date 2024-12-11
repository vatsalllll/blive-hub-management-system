import api from './api';

export const fetchVehicles = async () => {
  try {
    const response = await api.get('/vehicles');
    return response.data;
  } catch (error) {
    throw new Error('Error fetching vehicles');
  }
};

export const updateVehicleState = async (vehicleId, newState) => {
  try {
    const response = await api.put(`/vehicles/${vehicleId}`, { current_state: newState });
    return response.data;
  } catch (error) {
    throw new Error('Error updating vehicle state');
  }
};

export const createVehicleEntry = async (vehicleData) => {
  try {
    const response = await api.post('/vehicles', vehicleData);
    return response.data;
  } catch (error) {
    throw new Error('Error creating vehicle entry');
  }
}; 