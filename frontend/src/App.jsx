import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import VehicleStates from './pages/vehicles/VehicleStates';
import VehicleEntryForm from './pages/vehicles/VehicleEntryForm';
import TaskDashboard from './pages/tasks/TaskDashboard';
import UserManagement from './pages/users/UserManagement';
import BasicReports from './pages/reports/BasicReports';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/vehicles/states" element={<VehicleStates />} />
          <Route path="/vehicles/entry" element={<VehicleEntryForm />} />
          <Route path="/tasks" element={<TaskDashboard />} />
          <Route path="/users" element={<UserManagement />} />
          <Route path="/reports" element={<BasicReports />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
