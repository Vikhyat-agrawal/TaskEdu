import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { NotificationType } from '../types';

interface NotificationContextType {
  notifications: NotificationType[];
  unreadCount: number;
  addNotification: (notification: NotificationType) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationType[]>(() => {
    const storedNotifications = localStorage.getItem('notifications');
    return storedNotifications ? JSON.parse(storedNotifications) : sampleNotifications;
  });
  
  const [showNotifications, setShowNotifications] = useState(false);
  
  useEffect(() => {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }, [notifications]);
  
  const unreadCount = notifications.filter(n => !n.read).length;
  
  const addNotification = (notification: NotificationType) => {
    setNotifications(prev => [notification, ...prev]);
    
    // Check for deadline notifications
    if (notification.type === 'task' && notification.message.includes('created')) {
      const match = notification.message.match(/New task created: (.+)/);
      if (match && match[1]) {
        setTimeout(() => {
          const deadlineNotification: NotificationType = {
            id: Date.now().toString(),
            type: 'deadline',
            message: `Reminder: "${match[1]}" is due soon!`,
            timestamp: new Date().toISOString(),
            read: false,
          };
          setNotifications(prev => [deadlineNotification, ...prev]);
        }, 30000); // 30 seconds delay for demo purposes
      }
    }
  };
  
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };
  
  const clearNotifications = () => {
    setNotifications([]);
  };
  
  return (
    <NotificationContext.Provider value={{ 
      notifications, 
      unreadCount,
      addNotification, 
      markAsRead, 
      markAllAsRead, 
      clearNotifications,
      showNotifications,
      setShowNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

// Sample data
const sampleNotifications: NotificationType[] = [
  {
    id: '1',
    type: 'deadline',
    message: 'Your Math Assignment is due tomorrow!',
    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: '2',
    type: 'task',
    message: 'You completed "Physics Lab Report"',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
  {
    id: '3',
    type: 'project',
    message: 'New milestone added to "Mobile App Design Project"',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    read: false,
  },
  {
    id: '4',
    type: 'task',
    message: 'New task created: "Literature Review"',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    read: true,
  },
];