import React, { useState, useMemo } from 'react';
import { useTasks } from '../hooks/useTasks';
import { Task, TaskFilter } from '../types';
import { TaskFilterBar } from '../components/tasks/TaskFilterBar';
import { TaskList } from '../components/tasks/TaskList';
import { getPriorityWeight } from '../utils/priorityCalculator';
import { Plus } from 'lucide-react';

interface TasksPageProps {
  onEditTask: (task: Task) => void;
  onOpenCreateModal: () => void;
}

export const TasksPage: React.FC<TasksPageProps> = ({ onEditTask, onOpenCreateModal }) => {
  const { tasks } = useTasks();

  const [filter, setFilter] = useState<TaskFilter>({
    search: '',
    course: 'all',
    status: 'all',
    priority: 'all',
    sortBy: 'deadline',
  });

  const availableCourses = useMemo(() => {
    const courses = new Set<string>();
    tasks.forEach(t => {
      if (t.courseName) courses.add(t.courseName);
    });
    return Array.from(courses).sort();
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    return tasks
      .filter(t => {
        if (filter.search.trim()) {
          const q = filter.search.toLowerCase();
          const matchTitle = t.title.toLowerCase().includes(q);
          const matchCourse = t.courseName.toLowerCase().includes(q);
          const matchNotes = t.notes?.toLowerCase().includes(q) || false;
          if (!matchTitle && !matchCourse && !matchNotes) return false;
        }

        if (filter.course !== 'all' && t.courseName !== filter.course) {
          return false;
        }

        if (filter.status !== 'all' && t.status !== filter.status) {
          return false;
        }

        if (filter.priority !== 'all' && t.calculatedPriority !== filter.priority) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (filter.sortBy === 'deadline') {
          return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
        }
        if (filter.sortBy === 'priority') {
          return getPriorityWeight(b.calculatedPriority) - getPriorityWeight(a.calculatedPriority);
        }
        if (filter.sortBy === 'courseName') {
          return a.courseName.localeCompare(b.courseName);
        }
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [tasks, filter]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Assignments Manager</h1>
          <p className="text-sm text-slate-400">
            View, filter, and organize all your university course assignments.
          </p>
        </div>

        <button
          onClick={onOpenCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20 self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Assignment</span>
        </button>
      </div>

      <TaskFilterBar
        filter={filter}
        onChangeFilter={setFilter}
        availableCourses={availableCourses}
      />

      <TaskList
        tasks={filteredTasks}
        onEditTask={onEditTask}
        onOpenCreateModal={onOpenCreateModal}
      />
    </div>
  );
};
