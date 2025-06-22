import React, { useState } from 'react';
import { Task } from './types/task';
import { TaskProvider, useTaskContext } from './context/TaskContext';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import { PlusCircle } from 'lucide-react';

// Main App Content that uses the TaskContext
const TaskManagerContent: React.FC = () => {
  const { 
    filteredTasks, 
    addTask, 
    updateTask, 
    deleteTask,
    statusFilter,
    priorityFilter,
    setStatusFilter,
    setPriorityFilter 
  } = useTaskContext();
  
  const [showForm, setShowForm] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | undefined>(undefined);

  const handleAddButtonClick = () => {
    setCurrentTask(undefined);
    setShowForm(true);
  };

  const handleEditTask = (task: Task) => {
    setCurrentTask(task);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setCurrentTask(undefined);
  };

  const handleTaskSave = (title: string, description: string, priority: any) => {
    addTask(title, description, priority);
    setShowForm(false);
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    updateTask(updatedTask);
    setShowForm(false);
    setCurrentTask(undefined);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Task Manager</h1>
        <p className="text-gray-600">Organize, track, and complete your tasks efficiently</p>
      </header>

      {showForm ? (
        <div className="mb-8">
          <TaskForm
            task={currentTask}
            onSave={handleTaskSave}
            onUpdate={handleTaskUpdate}
            onCancel={handleCancelForm}
          />
        </div>
      ) : (
        <>
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-800">Your Tasks</h2>
            <button
              onClick={handleAddButtonClick}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 shadow-sm"
            >
              <PlusCircle size={18} className="mr-2" />
              Add Task
            </button>
          </div>

          <TaskFilter
            statusFilter={statusFilter}
            priorityFilter={priorityFilter}
            onStatusChange={setStatusFilter}
            onPriorityChange={setPriorityFilter}
          />

          <TaskList
            tasks={filteredTasks}
            onEdit={handleEditTask}
            onDelete={deleteTask}
            onStatusChange={updateTask}
          />
        </>
      )}
    </div>
  );
};

// Root component that provides the TaskContext
function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <TaskProvider>
        <TaskManagerContent />
      </TaskProvider>
    </div>
  );
}

export default App;