import React from 'react';
import { TaskPriority } from '../types/task';

interface TaskPriorityBadgeProps {
  priority: TaskPriority;
}

const TaskPriorityBadge: React.FC<TaskPriorityBadgeProps> = ({ priority }) => {
  const getBadgeClasses = (): string => {
    const baseClasses = 'px-2 py-1 rounded-full text-xs font-medium';
    
    switch (priority) {
      case 'low':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'medium':
        return `${baseClasses} bg-amber-100 text-amber-800`;
      case 'high':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return baseClasses;
    }
  };
  
  return (
    <span className={getBadgeClasses()}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </span>
  );
};

export default TaskPriorityBadge;