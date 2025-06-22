import React from 'react';
import { Task } from '../types/task';
import TaskCard from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (task: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({ 
  tasks, 
  onEdit, 
  onDelete, 
  onStatusChange 
}) => {
  if (tasks.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-lg shadow-sm">
        <p className="text-gray-500">No tasks found. Create a new task to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onStatusChange={onStatusChange}
        />
      ))}
    </div>
  );
};

export default TaskList;