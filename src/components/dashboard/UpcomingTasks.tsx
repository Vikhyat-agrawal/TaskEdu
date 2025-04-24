import { Calendar, Clock } from 'lucide-react';
import { TaskType } from '../../types';
import { formatDate, isToday, isTomorrow } from '../../utils/date';

interface UpcomingTasksProps {
  tasks: TaskType[];
}

const UpcomingTasks = ({ tasks }: UpcomingTasksProps) => {
  const upcomingTasks = tasks
    .filter(task => !task.completed && new Date(task.dueDate) >= new Date())
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 5);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-orange-100 text-orange-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDateLabel = (date: string) => {
    if (isToday(new Date(date))) {
      return 'Today';
    } else if (isTomorrow(new Date(date))) {
      return 'Tomorrow';
    } else {
      return formatDate(new Date(date));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-gray-700" />
          <h2 className="font-semibold text-lg">Upcoming Tasks</h2>
        </div>
        <a href="#" className="text-sm text-blue-600 hover:underline">View All</a>
      </div>

      {upcomingTasks.length > 0 ? (
        <div className="space-y-3">
          {upcomingTasks.map((task) => (
            <div key={task.id} className="rounded-lg border border-gray-200 p-3 hover:shadow-sm transition-shadow">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{task.title}</h3>
                  <div className="mt-1 flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    <span>{getDateLabel(task.dueDate)}</span>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </div>
              {task.course && (
                <div className="mt-2 text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded inline-block">
                  {task.course}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          <p>No upcoming tasks</p>
        </div>
      )}
    </div>
  );
};

export default UpcomingTasks;