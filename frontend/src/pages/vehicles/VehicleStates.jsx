import React, { useState, useEffect } from 'react';
import { fetchVehicles, updateVehicleState } from '../../services/vehicleService';

const VehicleStates = () => {
  const [vehicles, setVehicles] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadVehicles = async () => {
      try {
        const data = await fetchVehicles();
        setVehicles(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadVehicles();
  }, []);

  const handleStateChange = async (vehicleId, newState) => {
    try {
      await updateVehicleState(vehicleId, newState);
      setVehicles((prevVehicles) =>
        prevVehicles.map((vehicle) =>
          vehicle.vehicle_id === vehicleId ? { ...vehicle, current_state: newState } : vehicle
        )
      );
    } catch (err) {
      setError(err.message);
    }
  };

  const getStateColor = (state) => {
    const colors = {
      Service: 'bg-yellow-100 text-yellow-800',
      RTD: 'bg-green-100 text-green-800',
      Missing: 'bg-red-100 text-red-800',
      Deployed: 'bg-blue-100 text-blue-800',
    };
    return colors[state] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Vehicle States</h1>
      {error && <p className="error-message mb-4">{error}</p>}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {vehicles.map((vehicle) => (
          <div key={vehicle.vehicle_id} className="card">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{vehicle.unique_identifier}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStateColor(vehicle.current_state)}`}>
                {vehicle.current_state}
              </span>
            </div>
            <select
              className="select-field"
              value={vehicle.current_state}
              onChange={(e) => handleStateChange(vehicle.vehicle_id, e.target.value)}
            >
              <option value="Service">Service</option>
              <option value="RTD">RTD</option>
              <option value="Missing">Missing</option>
              <option value="Deployed">Deployed</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VehicleStates;