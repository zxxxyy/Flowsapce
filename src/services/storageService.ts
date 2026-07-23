import { Task } from '../types';
import { initialTasks } from '../data/initialTasks';

const STORAGE_KEY = 'flowspace_tasks_v1';

export const storageService = {
  getTasks(): Task[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        // First load: seed with initial university tasks
        this.saveTasks(initialTasks);
        return initialTasks;
      }
      return JSON.parse(data) as Task[];
    } catch (error) {
      console.error('Failed to read tasks from localStorage', error);
      return initialTasks;
    }
  },

  saveTasks(tasks: Task[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Failed to save tasks to localStorage', error);
    }
  },

  clearTasks(): void {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear tasks from localStorage', error);
    }
  },

  resetToDefault(): Task[] {
    this.saveTasks(initialTasks);
    return initialTasks;
  }
};
