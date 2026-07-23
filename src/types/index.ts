export type Priority = 'high' | 'medium' | 'low';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export interface Task {
  id: string;
  title: string;
  courseName: string;
  deadline: string; // ISO String format YYYY-MM-DD
  difficulty: Difficulty;
  status: TaskStatus;
  calculatedPriority: Priority;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TaskFormData {
  title: string;
  courseName: string;
  deadline: string;
  difficulty: Difficulty;
  status: TaskStatus;
  notes?: string;
}

export interface TaskFilter {
  search: string;
  course: string;
  status: string; // 'all' | TaskStatus
  priority: string; // 'all' | Priority
  sortBy: 'deadline' | 'priority' | 'courseName' | 'createdAt';
}

export interface DashboardSummary {
  totalTasks: number;
  pendingTasks: number;
  completedTasks: number;
  overdueTasks: number;
  completionRate: number; // 0 - 100 percentage
  todaysFocus: Task[];
  upcomingDeadlines: Task[];
}
