import { useState } from 'react';
import { PlusCircle, Bell, BookOpen, FileText, Clock } from 'lucide-react';
import TaskSummary from '../components/dashboard/TaskSummary';
import UpcomingTasks from '../components/dashboard/UpcomingTasks';
import ProjectProgress from '../components/dashboard/ProjectProgress';
import Calendar from '../components/dashboard/Calendar';
import TaskForm from '../components/tasks/TaskForm';
import { useTasks } from '../contexts/TaskContext';
import { useProject } from '../contexts/ProjectContext';

const Dashboard = () => {
  const { tasks, addTask } = useTasks();
  const { projects } = useProject();
  const [filter, setFilter] = useState('all');
  const [isCreatingTask, setIsCreatingTask] = useState(false);

  const stats = [
    { 
      icon: <FileText className="h-5 w-5 text-blue-600" />, 
      label: 'Tasks', 
      value: tasks.length,
      color: 'bg-blue-100' 
    },
    { 
      icon: <BookOpen className="h-5 w-5 text-purple-600" />, 
      label: 'Projects', 
      value: projects.length,
      color: 'bg-purple-100'
    },
    { 
      icon: <Clock className="h-5 w-5 text-orange-600" />, 
      label: 'Upcoming', 
      value: tasks.filter(task => !task.completed && new Date(task.dueDate) > new Date()).length,
      color: 'bg-orange-100'
    },
    { 
      icon: <Bell className="h-5 w-5 text-teal-600" />, 
      label: 'Notifications', 
      value: 3,
      color: 'bg-teal-100'  
    },
  ];

  const handleCreateTask = (newTask: any) => {
    addTask(newTask);
    setIsCreatingTask(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, Alex! Here's your overview.</p>
        </div>
        <button 
          onClick={() => setIsCreatingTask(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <PlusCircle size={20} />
          <span>New Task</span>
        </button>
      </div>

      {isCreatingTask && (
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Create New Task</h2>
          <TaskForm onSubmit={handleCreateTask} onCancel={() => setIsCreatingTask(false)} />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-4 flex items-center gap-4 hover:shadow-md transition-shadow">
            <div className={`p-3 rounded-lg ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500">{stat.label}</div>
              <div className="text-xl font-bold">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <TaskSummary tasks={tasks} />
          <ProjectProgress projects={projects} />
        </div>
        <div className="space-y-6">
          <Calendar tasks={tasks} />
          <UpcomingTasks tasks={tasks} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;