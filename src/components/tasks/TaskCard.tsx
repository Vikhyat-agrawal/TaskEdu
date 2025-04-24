import { useState } from 'react';
import { Calendar, Tag, Clock, MoreVertical, Edit, Trash2, Check } from 'lucide-react';
import { TaskType } from '../../types';
import { useTasks } from '../../contexts/TaskContext';
import { formatDate } from '../../utils/date';
import TaskForm from './TaskForm';

interface TaskCardProps {
  task: TaskType;
}

const TaskCard = ({ task }: TaskCardProps) => {
  const { toggleTaskCompletion, updateTask, deleteTask } = useTasks();
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
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

  const handleToggleCompletion = () => {
    toggleTaskCompletion(task.id);
  };

  const handleEditTask = (updatedTask: any) => {
    updateTask(task.id, updatedTask);
    setIsEditing(false);
  };

  const handleDeleteTask = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
        <h3 className="text-lg font-semibold mb-3">Edit Task</h3>
        <TaskForm 
          initialData={task} 
          onSubmit={handleEditTask} 
          onCancel={() => setIsEditing(false)} 
        />
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm p-4 border ${
      task.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'
    } hover:shadow-md transition-shadow relative`}>
      <div className="absolute top-4 right-4">
        <button 
          onClick={() => setShowMenu(!showMenu)}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <MoreVertical size={18} className="text-gray-500" />
        </button>
        
        {showMenu && (
          <div className="absolute right-0 mt-1 bg-white rounded-lg shadow-md border border-gray-200 py-1 z-10 w-36">
            <button
              onClick={() => {
                setIsEditing(true);
                setShowMenu(false);
              }}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-gray-100"
            >
              <Edit size={16} className="text-gray-500" />
              <span>Edit</span>
            </button>
            <button
              onClick={handleDeleteTask}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-gray-100 text-red-600"
            >
              <Trash2 size={16} />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>
      
      <div className="flex items-start mb-3">
        <button
          onClick={handleToggleCompletion}
          className={`flex-shrink-0 w-5 h-5 rounded-full border ${
            task.completed 
              ? 'bg-green-500 border-green-500 text-white' 
              : 'border-gray-300 hover:border-blue-500'
          } flex items-center justify-center mr-3 mt-1`}
        >
          {task.completed && <Check size={12} />}
        </button>
        
        <div className="flex-1">
          <h3 className={`font-medium text-lg ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className={`mt-1 text-sm ${task.completed ? 'text-gray-400' : 'text-gray-600'}`}>
              {task.description}
            </p>
          )}
        </div>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {task.course && (
          <div className="flex items-center text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
            {task.course}
          </div>
        )}
        
        {task.category && (
          <div className="flex items-center gap-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            <Tag size={12} />
            <span>{task.category}</span>
          </div>
        )}
        
        <div className={`flex items-center gap-1 text-xs ${getPriorityColor(task.priority)} px-2 py-1 rounded-full`}>
          <span>{task.priority}</span>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <Calendar size={14} />
          <span>Due: {formatDate(new Date(task.dueDate))}</span>
        </div>
        
        {task.estimatedTime && (
          <div className="flex items-center gap-1">
            <Clock size={14} />
            <span>{task.estimatedTime}h</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskCard;