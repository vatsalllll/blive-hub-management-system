import React, { useState } from 'react';
import { createVehicleEntry } from '../../services/vehicleService';

const VehicleEntryForm = () => {
  const [vehicleId, setVehicleId] = useState('');
  const [entryTime, setEntryTime] = useState('');
  const [state, setState] = useState('Service');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createVehicleEntry({
        unique_identifier: vehicleId,
        entry_time: entryTime,
        current_state: state,
      });
      setSuccess('Vehicle entry recorded successfully');
      setError('');
      // Reset form
      setVehicleId('');
      setEntryTime('');
      setState('Service');
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Record Vehicle Entry</h2>
        <form onSubmit={handleSubmit} className="card space-y-4">
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Vehicle ID
            </label>
            <input
              type="text"
              className="input-field"
              placeholder="Enter vehicle ID"
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Entry Time
            </label>
            <input
              type="datetime-local"
              className="input-field"
              value={entryTime}
              onChange={(e) => setEntryTime(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Initial State
            </label>
            <select 
              className="select-field"
              value={state} 
              onChange={(e) => setState(e.target.value)}
            >
              <option value="Service">Service</option>
              <option value="RTD">RTD</option>
            </select>
          </div>

          <button type="submit" className="btn-primary w-full">
            Submit Entry
          </button>
        </form>
      </div>
    </div>
  );
};

export default VehicleEntryForm;