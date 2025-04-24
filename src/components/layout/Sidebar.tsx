import { 
  LayoutDashboard, CheckSquare, Users, CalendarDays, 
  Tag, Settings, LifeBuoy, LogOut
} from 'lucide-react';

interface SidebarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const Sidebar = ({ currentPage, setCurrentPage }: SidebarProps) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'tasks', label: 'Tasks', icon: <CheckSquare size={20} /> },
    { id: 'projects', label: 'Projects', icon: <Users size={20} /> },
    { id: 'calendar', label: 'Calendar', icon: <CalendarDays size={20} /> },
    { id: 'tags', label: 'Tags', icon: <Tag size={20} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <aside className="w-16 md:w-64 border-r border-gray-200 bg-white flex flex-col transition-all duration-300">
      <nav className="flex-1 pt-5 px-2">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center py-2 px-2 md:px-3 rounded-lg transition-colors ${
                  currentPage === item.id
                    ? 'bg-blue-50 text-blue-600 font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <span className="flex-shrink-0">{item.icon}</span>
                <span className="ml-3 hidden md:block">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="pb-5 px-2 mt-auto">
        <ul className="space-y-1">
          <li>
            <button className="w-full flex items-center py-2 px-2 md:px-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
              <LifeBuoy size={20} />
              <span className="ml-3 hidden md:block">Help</span>
            </button>
          </li>
          <li>
            <button className="w-full flex items-center py-2 px-2 md:px-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors">
              <LogOut size={20} />
              <span className="ml-3 hidden md:block">Log Out</span>
            </button>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;