import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import LandingPage from './pages/LandingPage';
import VehicleStates from './pages/vehicles/VehicleStates';
import VehicleEntryForm from './pages/vehicles/VehicleEntryForm';
import TaskDashboard from './pages/tasks/TaskDashboard';
import UserManagement from './pages/users/UserManagement';
import BasicReports from './pages/reports/BasicReports';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<Layout />}>
          <Route index element={<Navigate to="vehicles/states" replace />} />
          <Route path="vehicles/states" element={<VehicleStates />} />
          <Route path="vehicles/entry" element={<VehicleEntryForm />} />
          <Route path="tasks" element={<TaskDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="reports" element={<BasicReports />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
