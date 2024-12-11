import React, { useState, useEffect } from 'react';
import { fetchServiceTATReport, fetchHubTATReport } from '../../services/reportService';

const BasicReports = () => {
  const [serviceTAT, setServiceTAT] = useState([]);
  const [hubTAT, setHubTAT] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadReports = async () => {
      try {
        const serviceData = await fetchServiceTATReport();
        setServiceTAT(serviceData);
        const hubData = await fetchHubTATReport();
        setHubTAT(hubData);
      } catch (err) {
        setError(err.message);
      }
    };

    loadReports();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Basic Reports</h1>
      {error && <p className="error-message mb-4">{error}</p>}

      <div className="grid gap-6 md:grid-cols-2">
        {/* Service TAT Report */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Service TAT Report</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    TAT (minutes)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {serviceTAT.map((report) => (
                  <tr key={report.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {report.vehicle_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.tat}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Hub TAT Report */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Hub TAT Report</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Vehicle ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    TAT (minutes)
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {hubTAT.map((report) => (
                  <tr key={report.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {report.vehicle_id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {report.tat}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicReports;