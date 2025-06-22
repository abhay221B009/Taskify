import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Task, TaskPriority, TaskStatus } from '../types/task';
import { loadTasks, saveTasks } from '../utils/storage';

interface TaskContextType {
  tasks: Task[];
  addTask: (title: string, description: string, priority: TaskPriority) => void;
  updateTask: (updatedTask: Task) => void;
  deleteTask: (id: string) => void;
  getTaskById: (id: string) => Task | undefined;
  filteredTasks: Task[];
  setStatusFilter: (status: TaskStatus | 'all') => void;
  setPriorityFilter: (priority: TaskPriority | 'all') => void;
  statusFilter: TaskStatus | 'all';
  priorityFilter: TaskPriority | 'all';
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [statusFilter, setStatusFilter] = useState<TaskStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | 'all'>('all');

  // Load tasks from localStorage on initial render
  useEffect(() => {
    const savedTasks = loadTasks();
    setTasks(savedTasks);
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Add a new task
  const addTask = (title: string, description: string, priority: TaskPriority) => {
    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      status: 'pending',
      priority,
      createdDate: new Date(),
    };
    
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  // Update an existing task
  const updateTask = (updatedTask: Task) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  // Delete a task
  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  // Get a task by id
  const getTaskById = (id: string) => {
    return tasks.find((task) => task.id === id);
  };

  // Filter tasks based on status and priority filters
  const filteredTasks = tasks.filter((task) => {
    const statusMatch = statusFilter === 'all' || task.status === statusFilter;
    const priorityMatch = priorityFilter === 'all' || task.priority === priorityFilter;
    return statusMatch && priorityMatch;
  });

  const value = {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    getTaskById,
    filteredTasks,
    setStatusFilter,
    setPriorityFilter,
    statusFilter,
    priorityFilter
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};