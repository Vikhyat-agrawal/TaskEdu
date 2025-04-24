import { Bell, Search, Settings, User } from 'lucide-react';
import { useNotification } from '../../contexts/NotificationContext';

interface NavbarProps {
  setShowNotifications: (show: boolean) => void;
}

const Navbar = ({ setShowNotifications }: NavbarProps) => {
  const { unreadCount } = useNotification();
  
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 md:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="text-blue-600 font-bold text-2xl">TaskEdu</div>
        </div>
        
        <div className="hidden md:flex items-center mx-4 flex-1 max-w-md relative">
          <Search className="absolute left-3 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search tasks, projects..."
            className="pl-10 pr-4 py-2 bg-gray-100 rounded-full w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
        </div>
        
        <div className="flex items-center gap-1 md:gap-3">
          <button 
            className="relative p-2 rounded-full hover:bg-gray-100 transition-colors"
            onClick={() => setShowNotifications(prev => !prev)}
          >
            <Bell className="h-5 w-5 text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
                {unreadCount}
              </span>
            )}
          </button>
          
          <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
            <Settings className="h-5 w-5 text-gray-600" />
          </button>
          
          <button className="ml-2 flex items-center gap-2 py-1 px-2 rounded-full hover:bg-gray-100 transition-colors">
            <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-purple-600" />
            </div>
            <span className="hidden md:block font-medium text-sm">Alex Student</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;