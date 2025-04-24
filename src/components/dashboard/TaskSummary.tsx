import { useState } from 'react';
import { PieChart, ChevronDown } from 'lucide-react';
import { TaskType } from '../../types';

interface TaskSummaryProps {
  tasks: TaskType[];
}

const TaskSummary = ({ tasks }: TaskSummaryProps) => {
  const [timeframe, setTimeframe] = useState('This Week');
  
  const completedTasks = tasks.filter(task => task.completed).length;
  const pendingTasks = tasks.filter(task => !task.completed).length;
  const completionPercentage = tasks.length > 0 
    ? Math.round((completedTasks / tasks.length) * 100) 
    : 0;
  
  const categories = [
    { name: 'Assignment', color: 'bg-blue-500', count: tasks.filter(t => t.category === 'Assignment').length },
    { name: 'Lab', color: 'bg-purple-500', count: tasks.filter(t => t.category === 'Lab').length },
    { name: 'Quiz', color: 'bg-orange-500', count: tasks.filter(t => t.category === 'Quiz').length },
    { name: 'Exam', color: 'bg-red-500', count: tasks.filter(t => t.category === 'Exam').length },
    { name: 'Project', color: 'bg-teal-500', count: tasks.filter(t => t.category === 'Project').length },
    { name: 'Other', color: 'bg-gray-500', count: tasks.filter(t => t.category === 'Other').length },
  ].filter(c => c.count > 0);

  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2">
          <PieChart className="h-5 w-5 text-gray-700" />
          <h2 className="font-semibold text-lg">Task Summary</h2>
        </div>
        <div className="relative">
          <button className="text-sm flex items-center gap-1 text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors">
            {timeframe}
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="col-span-1">
          <div className="h-40 w-40 mx-auto relative">
            <div className="h-full w-full rounded-full bg-gray-100 flex items-center justify-center">
              <div 
                className="absolute inset-0 rounded-full" 
                style={{
                  background: `conic-gradient(#3B82F6 ${completionPercentage}%, #F3F4F6 0)`,
                }}
              />
              <div className="absolute inset-2 bg-white rounded-full" />
              <div className="relative flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">{completionPercentage}%</span>
                <span className="text-sm text-gray-500">Completed</span>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{completedTasks}</div>
              <div className="text-sm text-gray-500">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{pendingTasks}</div>
              <div className="text-sm text-gray-500">Pending</div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="font-medium mb-3 text-gray-700">Categories</h3>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category.name} className="flex items-center">
                <div className={`w-3 h-3 rounded-full ${category.color} mr-3`} />
                <div className="flex-1 text-sm text-gray-700">{category.name}</div>
                <div className="text-sm font-medium">{category.count}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskSummary;