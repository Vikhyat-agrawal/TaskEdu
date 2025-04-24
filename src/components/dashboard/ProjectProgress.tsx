import { useState } from 'react';
import { Users, ChevronDown } from 'lucide-react';
import { ProjectType } from '../../types';

interface ProjectProgressProps {
  projects: ProjectType[];
}

const ProjectProgress = ({ projects }: ProjectProgressProps) => {
  const [filter, setFilter] = useState('Active');
  
  const activeProjects = projects
    .filter(p => !p.isCompleted)
    .sort((a, b) => {
      const aProgress = a.milestones.filter(m => m.completed).length / a.milestones.length;
      const bProgress = b.milestones.filter(m => m.completed).length / b.milestones.length;
      return bProgress - aProgress;
    })
    .slice(0, 3);
  
  return (
    <div className="bg-white rounded-xl shadow-sm p-5">
      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-gray-700" />
          <h2 className="font-semibold text-lg">Project Progress</h2>
        </div>
        <div className="relative">
          <button className="text-sm flex items-center gap-1 text-gray-600 bg-gray-100 px-3 py-1.5 rounded-lg hover:bg-gray-200 transition-colors">
            {filter}
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {activeProjects.length > 0 ? (
        <div className="space-y-5">
          {activeProjects.map((project) => {
            const completedMilestones = project.milestones.filter(m => m.completed).length;
            const totalMilestones = project.milestones.length;
            const progressPercentage = totalMilestones > 0 
              ? Math.round((completedMilestones / totalMilestones) * 100)
              : 0;
            
            return (
              <div key={project.id} className="space-y-2">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-800">{project.title}</h3>
                  <span className="text-sm font-medium">{progressPercentage}%</span>
                </div>
                
                <div className="flex gap-2 text-xs text-gray-500">
                  <span>{project.course}</span>
                  <span>•</span>
                  <span>Team: {project.teamMembers.length} members</span>
                </div>
                
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div 
                    className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-out" 
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                
                <div className="text-sm text-gray-500">
                  {completedMilestones} of {totalMilestones} milestones completed
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-6 text-gray-500">
          <p>No active projects</p>
        </div>
      )}
    </div>
  );
};

export default ProjectProgress;