import { useState, FormEvent } from 'react';
import { X, Plus } from 'lucide-react';
import { MilestoneType } from '../../types';

interface ProjectFormProps {
  initialData?: any;
  onSubmit: (project: any) => void;
  onCancel: () => void;
}

const ProjectForm = ({ initialData, onSubmit, onCancel }: ProjectFormProps) => {
  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    description: initialData?.description || '',
    dueDate: initialData?.dueDate 
      ? new Date(initialData.dueDate).toISOString().split('T')[0] 
      : new Date().toISOString().split('T')[0],
    course: initialData?.course || '',
    isCompleted: initialData?.isCompleted || false,
  });
  
  const [milestones, setMilestones] = useState<MilestoneType[]>(
    initialData?.milestones || []
  );
  
  const [teamMembers, setTeamMembers] = useState<string[]>(
    initialData?.teamMembers || []
  );
  
  const [newMilestone, setNewMilestone] = useState({
    title: '',
    dueDate: new Date().toISOString().split('T')[0],
  });
  
  const [newTeamMember, setNewTeamMember] = useState('');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value 
    }));
  };
  
  const handleAddMilestone = () => {
    if (!newMilestone.title) return;
    
    const milestone: MilestoneType = {
      id: Date.now().toString(),
      title: newMilestone.title,
      dueDate: newMilestone.dueDate,
      completed: false,
    };
    
    setMilestones(prev => [...prev, milestone]);
    setNewMilestone({
      title: '',
      dueDate: new Date().toISOString().split('T')[0],
    });
  };
  
  const handleRemoveMilestone = (id: string) => {
    setMilestones(prev => prev.filter(m => m.id !== id));
  };
  
  const handleAddTeamMember = (e: FormEvent) => {
    e.preventDefault();
    if (!newTeamMember.trim()) return;
    if (teamMembers.includes(newTeamMember.trim())) return;
    
    setTeamMembers(prev => [...prev, newTeamMember.trim()]);
    setNewTeamMember('');
  };
  
  const handleRemoveTeamMember = (member: string) => {
    setTeamMembers(prev => prev.filter(m => m !== member));
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const newProject = {
      ...initialData,
      ...formData,
      id: initialData?.id || Date.now().toString(),
      milestones,
      teamMembers,
      createdAt: initialData?.createdAt || new Date().toISOString(),
    };
    
    onSubmit(newProject);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Project Title*
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="px-3 py-2 bg-white border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        
        <div className="sm:col-span-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            className="px-3 py-2 bg-white border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
            Due Date*
          </label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
            className="px-3 py-2 bg-white border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        
        <div>
          <label htmlFor="course" className="block text-sm font-medium text-gray-700 mb-1">
            Course
          </label>
          <input
            type="text"
            id="course"
            name="course"
            value={formData.course}
            onChange={handleChange}
            className="px-3 py-2 bg-white border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        
        {initialData && (
          <div className="sm:col-span-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isCompleted"
                name="isCompleted"
                checked={formData.isCompleted}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="isCompleted" className="ml-2 block text-sm text-gray-700">
                Mark as completed
              </label>
            </div>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Team Members</h3>
        <div className="flex flex-wrap gap-2 mb-3">
          {teamMembers.map((member) => (
            <div 
              key={member}
              className="inline-flex items-center bg-gray-100 rounded-full px-3 py-1"
            >
              <span className="text-sm text-gray-800">{member}</span>
              <button
                type="button"
                onClick={() => handleRemoveTeamMember(member)}
                className="ml-2 text-gray-500 hover:text-gray-700"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
        
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add team member"
            value={newTeamMember}
            onChange={(e) => setNewTeamMember(e.target.value)}
            className="px-3 py-2 bg-white border border-gray-300 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTeamMember(e);
              }
            }}
          />
          <button
            type="button"
            onClick={handleAddTeamMember}
            className="px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Add
          </button>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Milestones</h3>
        <div className="space-y-2 mb-3">
          {milestones.map((milestone) => (
            <div 
              key={milestone.id}
              className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
            >
              <div>
                <div className="font-medium text-sm">{milestone.title}</div>
                <div className="text-xs text-gray-500">
                  Due: {new Date(milestone.dueDate).toLocaleDateString()}
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemoveMilestone(milestone.id)}
                className="text-gray-500 hover:text-red-600"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 gap-2">
          <div className="col-span-4">
            <input
              type="text"
              placeholder="Milestone title"
              value={newMilestone.title}
              onChange={(e) => setNewMilestone(prev => ({ ...prev, title: e.target.value }))}
              className="px-3 py-2 bg-white border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="col-span-2">
            <input
              type="date"
              value={newMilestone.dueDate}
              onChange={(e) => setNewMilestone(prev => ({ ...prev, dueDate: e.target.value }))}
              className="px-3 py-2 bg-white border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="button"
            onClick={handleAddMilestone}
            className="col-span-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>
      
      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
        >
          {initialData ? 'Update' : 'Create'} Project
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;