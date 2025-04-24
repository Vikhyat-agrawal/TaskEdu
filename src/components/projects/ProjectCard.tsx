import { useState } from 'react';
import { 
  Calendar, Tag, Users, MoreVertical, 
  Edit, Trash2, CheckSquare, ChevronDown, ChevronUp 
} from 'lucide-react';
import { ProjectType, MilestoneType } from '../../types';
import { useProject } from '../../contexts/ProjectContext';
import { formatDate } from '../../utils/date';
import ProjectForm from './ProjectForm';

interface ProjectCardProps {
  project: ProjectType;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const { updateProject, deleteProject, toggleMilestoneCompletion } = useProject();
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showMilestones, setShowMilestones] = useState(false);
  
  const completedMilestones = project.milestones.filter(m => m.completed).length;
  const totalMilestones = project.milestones.length;
  const progressPercentage = Math.round((completedMilestones / (totalMilestones || 1)) * 100);
  
  const handleEditProject = (updatedProject: any) => {
    updateProject(project.id, updatedProject);
    setIsEditing(false);
  };

  const handleDeleteProject = () => {
    if (confirm('Are you sure you want to delete this project?')) {
      deleteProject(project.id);
    }
  };
  
  const handleToggleMilestone = (milestoneId: string) => {
    toggleMilestoneCompletion(project.id, milestoneId);
  };

  if (isEditing) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-200">
        <h3 className="text-lg font-semibold mb-3">Edit Project</h3>
        <ProjectForm 
          initialData={project} 
          onSubmit={handleEditProject} 
          onCancel={() => setIsEditing(false)} 
        />
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-sm p-5 border ${
      project.isCompleted ? 'border-green-200 bg-green-50' : 'border-gray-200'
    } hover:shadow-md transition-shadow relative`}>
      <div className="absolute top-5 right-5">
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
              onClick={handleDeleteProject}
              className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-gray-100 text-red-600"
            >
              <Trash2 size={16} />
              <span>Delete</span>
            </button>
          </div>
        )}
      </div>
      
      <div className="mb-4">
        <h3 className={`font-semibold text-xl ${project.isCompleted ? 'text-gray-700' : 'text-gray-900'}`}>
          {project.title}
        </h3>
        {project.description && (
          <p className={`mt-1 text-sm ${project.isCompleted ? 'text-gray-500' : 'text-gray-600'}`}>
            {project.description}
          </p>
        )}
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {project.course && (
          <div className="flex items-center text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
            {project.course}
          </div>
        )}
      </div>
      
      <div className="mb-4">
        <div className="flex justify-between items-center mb-1">
          <div className="text-sm font-medium">Progress</div>
          <div className="text-sm">{progressPercentage}%</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full transition-all duration-500 ease-out ${
              project.isCompleted ? 'bg-green-600' : 'bg-blue-600'
            }`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <Calendar size={16} />
          <span>Due: {formatDate(new Date(project.dueDate))}</span>
        </div>
        
        <div className="flex items-center gap-1">
          <Users size={16} />
          <span>{project.teamMembers.length} members</span>
        </div>
      </div>
      
      <button
        onClick={() => setShowMilestones(!showMilestones)}
        className="flex items-center justify-between w-full py-2 px-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
      >
        <div className="flex items-center gap-2">
          <CheckSquare size={16} className="text-gray-600" />
          <span className="font-medium text-sm">Milestones ({completedMilestones}/{totalMilestones})</span>
        </div>
        {showMilestones ? (
          <ChevronUp size={16} className="text-gray-600" />
        ) : (
          <ChevronDown size={16} className="text-gray-600" />
        )}
      </button>
      
      {showMilestones && (
        <div className="mt-3 space-y-2">
          {project.milestones.map((milestone) => (
            <div 
              key={milestone.id}
              className="flex items-start py-2 border-b border-gray-100 last:border-0"
            >
              <button
                onClick={() => handleToggleMilestone(milestone.id)}
                className={`flex-shrink-0 w-5 h-5 rounded-full border ${
                  milestone.completed 
                    ? 'bg-green-500 border-green-500 text-white' 
                    : 'border-gray-300 hover:border-blue-500'
                } flex items-center justify-center mr-3 mt-0.5`}
              >
                {milestone.completed && <CheckSquare size={12} />}
              </button>
              <div>
                <div className={`text-sm font-medium ${milestone.completed ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                  {milestone.title}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  Due: {formatDate(new Date(milestone.dueDate))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {project.teamMembers.length > 0 && (
        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Team Members</h4>
          <div className="flex -space-x-2 overflow-hidden">
            {project.teamMembers.map((member, index) => (
              <div 
                key={index}
                className="w-8 h-8 rounded-full bg-gray-300 ring-2 ring-white flex items-center justify-center text-xs font-medium"
                title={member}
              >
                {member.charAt(0)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;