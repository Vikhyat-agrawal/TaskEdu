import { X, Check, Bell, Calendar, CheckSquare, Users } from 'lucide-react';
import { NotificationType } from '../../types';
import { formatDistanceToNow } from '../../utils/date';

interface NotificationPanelProps {
  notifications: NotificationType[];
  onClose: () => void;
}

const NotificationPanel = ({ notifications, onClose }: NotificationPanelProps) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'task':
        return <CheckSquare className="h-5 w-5 text-blue-500" />;
      case 'deadline':
        return <Calendar className="h-5 w-5 text-red-500" />;
      case 'project':
        return <Users className="h-5 w-5 text-purple-500" />;
      default:
        return <Bell className="h-5 w-5 text-gray-500" />;
    }
  };
  
  return (
    <div className="absolute right-0 top-16 w-80 md:w-96 bg-white border border-gray-200 rounded-lg shadow-lg z-20 max-h-[80vh] overflow-y-auto">
      <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="font-semibold text-gray-900">Notifications</h2>
        <button 
          onClick={onClose}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>
      
      {notifications.length > 0 ? (
        <div>
          {notifications.map((notification) => (
            <div 
              key={notification.id}
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                notification.read ? 'opacity-70' : ''
              }`}
            >
              <div className="flex items-start">
                <div className="mr-3 mt-0.5">
                  {getIcon(notification.type)}
                </div>
                
                <div className="flex-1">
                  <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-gray-900 font-medium'}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDistanceToNow(new Date(notification.timestamp))} ago
                  </p>
                </div>
                
                {!notification.read && (
                  <div className="ml-2 flex-shrink-0">
                    <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          <div className="p-3 flex justify-center border-t border-gray-100">
            <button className="text-sm text-blue-600 hover:text-blue-800 transition-colors">
              Mark all as read
            </button>
          </div>
        </div>
      ) : (
        <div className="p-6 text-center">
          <div className="mx-auto w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-3">
            <Bell className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="text-gray-900 font-medium">No new notifications</h3>
          <p className="text-sm text-gray-500 mt-1">
            You're all caught up!
          </p>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;