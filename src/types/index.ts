export interface TaskType {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: string;
  category: string;
  course?: string;
  completed: boolean;
  estimatedTime?: number;
  createdAt: string;
}

export interface MilestoneType {
  id: string;
  title: string;
  dueDate: string;
  completed: boolean;
}

export interface ProjectType {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  course?: string;
  isCompleted: boolean;
  teamMembers: string[];
  milestones: MilestoneType[];
  createdAt: string;
}

export interface NotificationType {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  read: boolean;
}