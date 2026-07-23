import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { Task, TaskFormData, DashboardSummary, Priority } from '../types';
import { storageService } from '../services/storageService';
import { calculatePriority, getPriorityWeight } from '../utils/priorityCalculator';
import { isTaskOverdue, getDaysRemaining } from '../utils/dateUtils';
import confetti from 'canvas-confetti';

interface TaskContextType {
  tasks: Task[];
  addTask: (formData: TaskFormData) => void;
  updateTask: (id: string, formData: Partial<TaskFormData>) => void;
  deleteTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  resetTasks: () => void;
  clearAllTasks: () => void;
  summary: DashboardSummary;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load initial tasks from storage
  useEffect(() => {
    const loaded = storageService.getTasks();
    setTasks(loaded);
    setIsInitialized(true);
  }, []);

  // Sync to storage on change
  useEffect(() => {
    if (isInitialized) {
      storageService.saveTasks(tasks);
    }
  }, [tasks, isInitialized]);

  const addTask = (formData: TaskFormData) => {
    const priority = calculatePriority(formData.deadline, formData.difficulty);
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: formData.title,
      courseName: formData.courseName,
      deadline: formData.deadline,
      difficulty: formData.difficulty,
      status: formData.status || 'pending',
      calculatedPriority: priority,
      notes: formData.notes || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setTasks(prev => [newTask, ...prev]);
  };

  const updateTask = (id: string, formData: Partial<TaskFormData>) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id !== id) return task;
        const updatedDeadline = formData.deadline !== undefined ? formData.deadline : task.deadline;
        const updatedDifficulty = formData.difficulty !== undefined ? formData.difficulty : task.difficulty;
        const priority = calculatePriority(updatedDeadline, updatedDifficulty);

        return {
          ...task,
          ...formData,
          calculatedPriority: priority,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  const deleteTask = (id: string) => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const toggleTaskStatus = (id: string) => {
    setTasks(prev =>
      prev.map(task => {
        if (task.id !== id) return task;
        const nextStatus = task.status === 'completed' ? 'pending' : 'completed';
        
        // Trigger celebratory confetti when completing a task
        if (nextStatus === 'completed') {
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.8 }
          });
        }

        return {
          ...task,
          status: nextStatus,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  const resetTasks = () => {
    const defaultTasks = storageService.resetToDefault();
    setTasks(defaultTasks);
  };

  const clearAllTasks = () => {
    storageService.clearTasks();
    setTasks([]);
  };

  const summary = useMemo<DashboardSummary>(() => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(t => t.status === 'completed').length;
    const pendingTasks = tasks.filter(t => t.status !== 'completed').length;
    const overdueTasks = tasks.filter(t => isTaskOverdue(t.deadline, t.status)).length;

    const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

    // Calculate Today's Focus: Top 3 pending tasks sorted by urgency (Priority weight desc, then deadline asc)
    const pendingList = tasks.filter(t => t.status !== 'completed');
    const sortedFocus = [...pendingList].sort((a, b) => {
      // Overdue comes first
      const aOverdue = isTaskOverdue(a.deadline, a.status);
      const bOverdue = isTaskOverdue(b.deadline, b.status);
      if (aOverdue && !bOverdue) return -1;
      if (!aOverdue && bOverdue) return 1;

      // Priority comparison
      const priorityDiff = getPriorityWeight(b.calculatedPriority) - getPriorityWeight(a.calculatedPriority);
      if (priorityDiff !== 0) return priorityDiff;

      // Deadline comparison
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    });

    const todaysFocus = sortedFocus.slice(0, 3);

    // Upcoming deadlines: tasks due within next 7 days
    const upcomingDeadlines = pendingList
      .filter(t => {
        const days = getDaysRemaining(t.deadline);
        return days >= 0 && days <= 7;
      })
      .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());

    return {
      totalTasks,
      pendingTasks,
      completedTasks,
      overdueTasks,
      completionRate,
      todaysFocus,
      upcomingDeadlines,
    };
  }, [tasks]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskStatus,
        resetTasks,
        clearAllTasks,
        summary,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};
