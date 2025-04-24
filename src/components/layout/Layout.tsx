import { ReactNode } from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { useNotification } from '../../contexts/NotificationContext';
import NotificationPanel from '../notifications/NotificationPanel';

interface LayoutProps {
  children: ReactNode;
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Layout = ({ children, currentPage, setCurrentPage }: LayoutProps) => {
  const { notifications, showNotifications, setShowNotifications } = useNotification();
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar setShowNotifications={setShowNotifications} />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
        
        {showNotifications && (
          <NotificationPanel 
            notifications={notifications} 
            onClose={() => setShowNotifications(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Layout;