import React from 'react';
import { TaskStatus } from '../types/task';

interface TaskStatusBadgeProps {
  status: TaskStatus;
}

const TaskStatusBadge: React.FC<TaskStatusBadgeProps> = ({ status }) => {
  const getBadgeClasses = (): string => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
    
    switch (status) {
      case 'pending':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'in-progress':
        return `${baseClasses} bg-purple-100 text-purple-800`;
      case 'done':
        return `${baseClasses} bg-green-100 text-green-800`;
      default:
        return baseClasses;
    }
  };
  
  const getStatusLabel = (): string => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'in-progress':
        return 'In Progress';
      case 'done':
        return 'Done';
      default:
        return status;
    }
  };
  
  return (
    <span className={getBadgeClasses()}>
      {getStatusLabel()}
    </span>
  );
};

export default TaskStatusBadge;