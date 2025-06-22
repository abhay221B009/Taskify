import { Task } from '../types/task';

const STORAGE_KEY = 'taskmanager_tasks';

// Load tasks from localStorage
export const loadTasks = (): Task[] => {
  try {
    const tasksJSON = localStorage.getItem(STORAGE_KEY);
    if (!tasksJSON) return [];
    
    const tasks = JSON.parse(tasksJSON);
    
    // Convert string dates back to Date objects
    return tasks.map((task: any) => ({
      ...task,
      createdDate: new Date(task.createdDate)
    }));
  } catch (error) {
    console.error('Failed to load tasks:', error);
    return [];
  }
};

// Save tasks to localStorage
export const saveTasks = (tasks: Task[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Failed to save tasks:', error);
  }
};