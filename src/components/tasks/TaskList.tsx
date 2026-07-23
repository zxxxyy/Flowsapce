import React from 'react';
import { Task } from '../../types';
import { TaskCard } from './TaskCard';
import { CheckSquare, Plus } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onOpenCreateModal: () => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onEditTask, onOpenCreateModal }) => {
  if (tasks.length === 0) {
    return (
      <div className="py-16 px-4 text-center rounded-2xl bg-slate-900/40 border border-slate-800/80 space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center mx-auto border border-indigo-500/20">
          <CheckSquare className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-white">No assignments found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            There are no assignments matching your current search or filter criteria.
          </p>
        </div>
        <button
          onClick={onOpenCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/20"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Assignment</span>
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map(task => (
        <TaskCard key={task.id} task={task} onEdit={onEditTask} />
      ))}
    </div>
  );
};
