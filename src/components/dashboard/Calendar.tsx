import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';
import { TaskType } from '../../types';
import { getDaysInMonth, formatDateShort } from '../../utils/date';

interface CalendarProps {
  tasks: TaskType[];
}

const Calendar = ({ tasks }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const daysInMonth = getDaysInMonth(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const prevMonth = () => {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() - 1);
    setCurrentDate(date);
  };
  
  const nextMonth = () => {
    const date = new Date(currentDate);
    date.setMonth(date.getMonth() + 1);
    setCurrentDate(date);
  };
  
  const getTasksForDay = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return tasks.filter(task => {
      const taskDate = new Date(task.dueDate);
      return (
        taskDate.getDate() === date.getDate() &&
        taskDate.getMonth() === date.getMonth() &&
        taskDate.getFullYear() === date.getFullYear()
      );
    });
  };
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-gray-700" />
          <h2 className="font-semibold text-lg">Calendar</h2>
        </div>
        <div className="flex items-center">
          <button 
            className="p-1 rounded-full hover:bg-gray-100"
            onClick={prevMonth}
          >
            <ChevronLeft size={20} />
          </button>
          <h3 className="mx-2 font-medium">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <button 
            className="p-1 rounded-full hover:bg-gray-100"
            onClick={nextMonth}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {dayNames.map(day => (
          <div key={day} className="text-xs font-medium text-gray-500">{day}</div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: daysInMonth.firstDay }).map((_, index) => (
          <div key={`empty-${index}`} className="p-1 text-center" />
        ))}
        
        {Array.from({ length: daysInMonth.totalDays }).map((_, index) => {
          const day = index + 1;
          const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
          const isToday = new Date().toDateString() === date.toDateString();
          const tasks = getTasksForDay(day);
          const hasTask = tasks.length > 0;
          
          return (
            <div 
              key={day}
              className={`p-1 text-center rounded-lg ${
                isToday 
                  ? 'bg-blue-50 text-blue-700 font-semibold' 
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="text-sm">{day}</div>
              {hasTask && (
                <div className="flex justify-center mt-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;