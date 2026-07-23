import React from 'react';
import { Task } from '../../types';
import { useTasks } from '../../hooks/useTasks';
import { PriorityBadge } from '../ui/PriorityBadge';
import { DifficultyBadge } from '../ui/DifficultyBadge';
import { formatDeadlineRelative, isTaskOverdue } from '../../utils/dateUtils';
import { CheckCircle2, Circle, Edit3, Trash2, BookOpen, Calendar, AlertOctagon } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit }) => {
  const { toggleTaskStatus, deleteTask } = useTasks();
  const isCompleted = task.status === 'completed';
  const overdue = isTaskOverdue(task.deadline, task.status);

  return (
    <div
      className={`group p-4 sm:p-5 rounded-2xl border transition-all duration-200 shadow-md hover:shadow-xl flex flex-col justify-between gap-4 ${
        isCompleted
          ? 'bg-slate-900/40 border-slate-800/60 opacity-75'
          : overdue
          ? 'bg-rose-950/20 border-rose-500/30 hover:border-rose-500/50'
          : 'bg-slate-900 border-slate-800 hover:border-slate-700'
      }`}
    >
      <div className="space-y-3">
        {/* Header: Status + Title & Course */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <button
              onClick={() => toggleTaskStatus(task.id)}
              className="mt-1 text-slate-500 hover:text-emerald-400 transition-colors shrink-0"
              title={isCompleted ? 'Mark as pending' : 'Mark as completed'}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <Circle className="w-5 h-5 group-hover:border-emerald-400" />
              )}
            </button>

            <div className="min-w-0 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-indigo-400">
                <BookOpen className="w-3.5 h-3.5" />
                <span className="truncate">{task.courseName}</span>
              </div>

              <h3
                className={`text-base font-bold truncate ${
                  isCompleted ? 'line-through text-slate-400' : 'text-white'
                }`}
              >
                {task.title}
              </h3>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 opacity-90 sm:opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
            <button
              onClick={() => onEdit(task)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-300 hover:bg-slate-800 transition-colors"
              title="Edit assignment"
            >
              <Edit3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
              title="Delete assignment"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Notes preview */}
        {task.notes && (
          <p className="text-xs text-slate-400 line-clamp-2 pl-8 border-l-2 border-slate-800 italic">
            {task.notes}
          </p>
        )}
      </div>

      {/* Footer: Priority, Difficulty & Deadline */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-800/80 text-xs">
        <div className="flex items-center gap-2">
          <DifficultyBadge difficulty={task.difficulty} />
          <PriorityBadge priority={task.calculatedPriority} />
        </div>

        <div className="flex items-center gap-1.5 font-medium">
          {overdue ? (
            <span className="inline-flex items-center gap-1 text-rose-400 font-semibold bg-rose-500/10 px-2 py-0.5 rounded border border-rose-500/20">
              <AlertOctagon className="w-3 h-3 animate-pulse" />
              {formatDeadlineRelative(task.deadline)}
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-slate-300 bg-slate-800/60 px-2 py-0.5 rounded border border-slate-700/50">
              <Calendar className="w-3 h-3 text-indigo-400" />
              {formatDeadlineRelative(task.deadline)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
