import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ProjectType } from '../types';
import { useNotification } from './NotificationContext';

interface ProjectContextType {
  projects: ProjectType[];
  addProject: (project: ProjectType) => void;
  updateProject: (id: string, project: Partial<ProjectType>) => void;
  deleteProject: (id: string) => void;
  toggleMilestoneCompletion: (projectId: string, milestoneId: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<ProjectType[]>(() => {
    const storedProjects = localStorage.getItem('projects');
    return storedProjects ? JSON.parse(storedProjects) : sampleProjects;
  });
  
  const { addNotification } = useNotification();
  
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);
  
  const addProject = (project: ProjectType) => {
    setProjects(prev => [...prev, project]);
    addNotification({
      id: Date.now().toString(),
      type: 'project',
      message: `New project created: ${project.title}`,
      timestamp: new Date().toISOString(),
      read: false,
    });
  };
  
  const updateProject = (id: string, updatedProject: Partial<ProjectType>) => {
    setProjects(prev => 
      prev.map(project => 
        project.id === id ? { ...project, ...updatedProject } : project
      )
    );
  };
  
  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(project => project.id !== id));
  };
  
  const toggleMilestoneCompletion = (projectId: string, milestoneId: string) => {
    setProjects(prev => 
      prev.map(project => {
        if (project.id === projectId) {
          const updatedMilestones = project.milestones.map(milestone => {
            if (milestone.id === milestoneId) {
              const completed = !milestone.completed;
              
              if (completed) {
                addNotification({
                  id: Date.now().toString(),
                  type: 'project',
                  message: `Milestone completed: ${milestone.title} (${project.title})`,
                  timestamp: new Date().toISOString(),
                  read: false,
                });
              }
              
              return { ...milestone, completed };
            }
            return milestone;
          });
          
          // Check if all milestones are completed
          const allCompleted = updatedMilestones.every(m => m.completed);
          
          if (allCompleted && !project.isCompleted) {
            addNotification({
              id: Date.now().toString(),
              type: 'project',
              message: `Project completed: ${project.title}`,
              timestamp: new Date().toISOString(),
              read: false,
            });
          }
          
          return { 
            ...project, 
            milestones: updatedMilestones,
            isCompleted: allCompleted
          };
        }
        return project;
      })
    );
  };
  
  return (
    <ProjectContext.Provider value={{ 
      projects, 
      addProject, 
      updateProject, 
      deleteProject,
      toggleMilestoneCompletion
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};

// Sample data
const sampleProjects: ProjectType[] = [
  {
    id: '1',
    title: 'Mobile App Design Project',
    description: 'Create wireframes and prototype for a campus navigation app',
    dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    course: 'User Interface Design',
    isCompleted: false,
    teamMembers: ['Alex Student', 'Jamie Smith', 'Taylor Jones'],
    milestones: [
      {
        id: '1-1',
        title: 'Research and Requirements',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        completed: true,
      },
      {
        id: '1-2',
        title: 'Wireframe Design',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        completed: false,
      },
      {
        id: '1-3',
        title: 'Prototype Development',
        dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
        completed: false,
      },
      {
        id: '1-4',
        title: 'User Testing',
        dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        completed: false,
      }
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Robot Demonstration',
    description: 'Program a robot to navigate a maze and pick up objects',
    dueDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000).toISOString(),
    course: 'Robotics',
    isCompleted: false,
    teamMembers: ['Alex Student', 'Casey Brown', 'Jordan Green'],
    milestones: [
      {
        id: '2-1',
        title: 'Design Robot Architecture',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        completed: false,
      },
      {
        id: '2-2',
        title: 'Implement Navigation Algorithm',
        dueDate: new Date(Date.now() + 12 * 24 * 60 * 60 * 1000).toISOString(),
        completed: false,
      },
      {
        id: '2-3',
        title: 'Object Detection System',
        dueDate: new Date(Date.now() + 16 * 24 * 60 * 60 * 1000).toISOString(),
        completed: false,
      },
      {
        id: '2-4',
        title: 'Testing and Optimization',
        dueDate: new Date(Date.now() + 19 * 24 * 60 * 60 * 1000).toISOString(),
        completed: false,
      }
    ],
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Business Case Study',
    description: 'Analyze a local business and provide growth recommendations',
    dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    course: 'Business Management',
    isCompleted: false,
    teamMembers: ['Alex Student', 'Sam Wilson', 'Riley Cooper'],
    milestones: [
      {
        id: '3-1',
        title: 'Initial Research',
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        completed: true,
      },
      {
        id: '3-2',
        title: 'Interviews with Stakeholders',
        dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        completed: false,
      },
      {
        id: '3-3',
        title: 'Market Analysis',
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        completed: false,
      },
      {
        id: '3-4',
        title: 'Final Report',
        dueDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        completed: false,
      }
    ],
    createdAt: new Date().toISOString(),
  }
];