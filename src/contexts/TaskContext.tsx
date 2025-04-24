import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { TaskType } from '../types';
import { useNotification } from './NotificationContext';

interface TaskContextType {
  tasks: TaskType[];
  addTask: (task: TaskType) => void;
  updateTask: (id: string, task: Partial<TaskType>) => void;
  deleteTask: (id: string) => void;
  toggleTaskCompletion: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<TaskType[]>(() => {
    const storedTasks = localStorage.getItem('tasks');
    return storedTasks ? JSON.parse(storedTasks) : sampleTasks;
  });
  
  const { addNotification } = useNotification();
  
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);
  
  const addTask = (task: TaskType) => {
    setTasks(prev => [...prev, task]);
    addNotification({
      id: Date.now().toString(),
      type: 'task',
      message: `New task created: ${task.title}`,
      timestamp: new Date().toISOString(),
      read: false,
    });
  };
  
  const updateTask = (id: string, updatedTask: Partial<TaskType>) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, ...updatedTask } : task
      )
    );
  };
  
  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };
  
  const toggleTaskCompletion = (id: string) => {
    setTasks(prev => 
      prev.map(task => {
        if (task.id === id) {
          const completed = !task.completed;
          
          if (completed) {
            addNotification({
              id: Date.now().toString(),
              type: 'task',
              message: `Task completed: ${task.title}`,
              timestamp: new Date().toISOString(),
              read: false,
            });
          }
          
          return { ...task, completed };
        }
        return task;
      })
    );
  };
  
  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, deleteTask, toggleTaskCompletion }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TaskProvider');
  }
  return context;
};

// Sample data
const sampleTasks: TaskType[] = [
  {
    id: '1',
    title: 'Complete Math Assignment',
    description: 'Chapter 5 exercises 1-15',
    dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'High',
    category: 'Assignment',
    course: 'Calculus II',
    completed: false,
    estimatedTime: 2,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Physics Lab Report',
    description: 'Write up the results from the pendulum experiment',
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'Medium',
    category: 'Lab',
    course: 'Physics 101',
    completed: false,
    estimatedTime: 3,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Literature Review',
    description: 'Write a 2-page review of "Hamlet"',
    dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'Medium',
    category: 'Assignment',
    course: 'English Literature',
    completed: false,
    estimatedTime: 4,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Programming Quiz',
    description: 'Online quiz covering arrays and linked lists',
    dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'Low',
    category: 'Quiz',
    course: 'Data Structures',
    completed: false,
    estimatedTime: 1,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    title: 'Study for Midterm',
    description: 'Chapters 1-7 from the textbook',
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'High',
    category: 'Exam',
    course: 'Biology 201',
    completed: false,
    estimatedTime: 5,
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    title: 'History Presentation',
    description: 'Create slides for the French Revolution topic',
    dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'Medium',
    category: 'Project',
    course: 'World History',
    completed: true,
    estimatedTime: 3,
    createdAt: new Date().toISOString(),
  },
];