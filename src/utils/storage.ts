import { TaskType, ProjectType, NotificationType } from '../types';

export const saveToLocalStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

export const loadFromLocalStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

export const clearStorageItem = (key: string): void => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error clearing ${key} from localStorage:`, error);
  }
};

export const clearAllStorage = (): void => {
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

export const exportData = (): string => {
  try {
    const tasks = loadFromLocalStorage<TaskType[]>('tasks', []);
    const projects = loadFromLocalStorage<ProjectType[]>('projects', []);
    const notifications = loadFromLocalStorage<NotificationType[]>('notifications', []);
    
    const exportData = {
      tasks,
      projects,
      notifications,
      exportDate: new Date().toISOString()
    };
    
    return JSON.stringify(exportData, null, 2);
  } catch (error) {
    console.error('Error exporting data:', error);
    return JSON.stringify({ error: 'Failed to export data' });
  }
};

export const importData = (jsonData: string): boolean => {
  try {
    const data = JSON.parse(jsonData);
    
    if (data.tasks) {
      saveToLocalStorage('tasks', data.tasks);
    }
    
    if (data.projects) {
      saveToLocalStorage('projects', data.projects);
    }
    
    if (data.notifications) {
      saveToLocalStorage('notifications', data.notifications);
    }
    
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
};