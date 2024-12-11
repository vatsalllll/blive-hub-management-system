import React, { useState, useEffect } from 'react';
import { fetchTasks, createTask } from '../../services/taskService';

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const data = await fetchTasks();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      }
    };

    loadTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const newTask = await createTask({
        title,
        description,
        assigned_to: parseInt(assignedTo),
        status: 'Pending',
        due_date: new Date().toISOString()
      });
      setTasks([...tasks, newTask]);
      setSuccess('Task created successfully');
      setError('');
      // Reset form
      setTitle('');
      setDescription('');
      setAssignedTo('');
    } catch (err) {
      setError(err.message);
      setSuccess('');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Task Dashboard</h1>
      
      <div className="grid gap-6 md:grid-cols-2">
        {/* Task Creation Form */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Create New Task</h2>
          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
          
          <form onSubmit={handleCreateTask} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Task Title
              </label>
              <input
                type="text"
                className="input-field"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                className="input-field min-h-[100px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Assign To
              </label>
              <input
                type="text"
                className="input-field"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              Create Task
            </button>
          </form>
        </div>

        {/* Task List */}
        <div className="card">
          <h2 className="text-xl font-semibold mb-4">Current Tasks</h2>
          <div className="space-y-4">
            {tasks.map((task) => (
              <div 
                key={task.task_id} 
                className="p-4 border border-gray-200 rounded-lg hover:border-primary-500 transition-colors"
              >
                <h3 className="font-medium text-gray-900">{task.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">
                    Assigned to: {task.assigned_to}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    task.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.status}
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

export default TaskDashboard;