import { useState } from 'react';
import { Plus, Search, Users, CheckCircle } from 'lucide-react';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectForm from '../components/projects/ProjectForm';
import { useProject } from '../contexts/ProjectContext';

const Projects = () => {
  const { projects, addProject } = useProject();
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  
  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           project.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filter === 'all' || 
                          (filter === 'completed' && project.isCompleted) || 
                          (filter === 'active' && !project.isCompleted);
    
    return matchesSearch && matchesStatus;
  });
  
  const handleCreateProject = (newProject: any) => {
    addProject(newProject);
    setIsCreating(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects</h1>
          <p className="text-gray-600 mt-1">Manage your team projects and collaborations</p>
        </div>
        <button 
          onClick={() => setIsCreating(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus size={20} />
          <span>New Project</span>
        </button>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
          />
        </div>
        
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-3 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="all">All Projects</option>
          <option value="active">Active Projects</option>
          <option value="completed">Completed Projects</option>
        </select>
      </div>
      
      {isCreating && (
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-200">
          <h2 className="text-lg font-semibold mb-4">Create New Project</h2>
          <ProjectForm onSubmit={handleCreateProject} onCancel={() => setIsCreating(false)} />
        </div>
      )}
      
      {filteredProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Users className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">No projects found</h3>
          <p className="text-gray-500 mb-4">
            {searchTerm || filter !== 'all'
              ? "Try adjusting your filters or search criteria"
              : "Get started by creating your first project"}
          </p>
          {!isCreating && (
            <button 
              onClick={() => setIsCreating(true)}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus size={16} />
              <span>Create Project</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Projects;