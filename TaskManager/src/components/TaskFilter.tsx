import React from 'react';
import { TaskPriority, TaskStatus } from '../types/task';

interface TaskFilterProps {
  statusFilter: TaskStatus | 'all';
  priorityFilter: TaskPriority | 'all';
  onStatusChange: (status: TaskStatus | 'all') => void;
  onPriorityChange: (priority: TaskPriority | 'all') => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({
  statusFilter,
  priorityFilter,
  onStatusChange,
  onPriorityChange,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Filter Tasks</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="status-filter" className="block text-sm text-gray-500 mb-1">
            Status
          </label>
          <select
            id="status-filter"
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value as TaskStatus | 'all')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="priority-filter" className="block text-sm text-gray-500 mb-1">
            Priority
          </label>
          <select
            id="priority-filter"
            value={priorityFilter}
            onChange={(e) => onPriorityChange(e.target.value as TaskPriority | 'all')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;