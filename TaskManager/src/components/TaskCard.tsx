import React from 'react';
import { Task } from '../types/task';
import { Pencil, Trash2 } from 'lucide-react';
import TaskPriorityBadge from './TaskPriorityBadge';
import TaskStatusBadge from './TaskStatusBadge';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onStatusChange }) => {
  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };

  const handleStatusChange = () => {
    const newStatus = task.status === 'pending' 
      ? 'in-progress' 
      : task.status === 'in-progress' 
        ? 'done' 
        : 'pending';
    
    onStatusChange({
      ...task,
      status: newStatus,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{task.title}</h3>
          <div className="flex space-x-2">
            <TaskPriorityBadge priority={task.priority} />
          </div>
        </div>
        
        <p className="text-gray-600 mb-4">{task.description}</p>
        
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Created: {formatDate(task.createdDate)}
          </div>
          <div>
            <button 
              onClick={handleStatusChange}
              className="mr-3 focus:outline-none"
            >
              <TaskStatusBadge status={task.status} />
            </button>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 px-5 py-3 flex justify-end space-x-2">
        <button
          onClick={() => onEdit(task)}
          className="p-2 text-blue-600 hover:text-blue-800 transition-colors duration-200 rounded-full hover:bg-blue-100"
          aria-label="Edit task"
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="p-2 text-red-600 hover:text-red-800 transition-colors duration-200 rounded-full hover:bg-red-100"
          aria-label="Delete task"
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default TaskCard;