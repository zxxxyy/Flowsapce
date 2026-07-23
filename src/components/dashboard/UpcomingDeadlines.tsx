import React from 'react';
import { useTasks } from '../../hooks/useTasks';
import { PriorityBadge } from '../ui/PriorityBadge';
import { formatDeadlineRelative, formatDateStandard } from '../../utils/dateUtils';
import { Calendar, Clock, CheckCircle2, Circle } from 'lucide-react';

interface UpcomingDeadlinesProps {
  onEditTask: (task: any) => void;
}

export const UpcomingDeadlines: React.FC<UpcomingDeadlinesProps> = ({ onEditTask }) => {
  const { summary, toggleTaskStatus } = useTasks();
  const upcoming = summary.upcomingDeadlines;

  return (
    <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Upcoming Deadlines</h3>
            <p className="text-xs text-slate-400">Assignments due within the next 7 days</p>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
          {upcoming.length} Pending
        </span>
      </div>

      {upcoming.length === 0 ? (
        <div className="py-6 text-center text-xs text-slate-500">
          No upcoming deadlines in the next 7 days.
        </div>
      ) : (
        <div className="space-y-2.5 divide-y divide-slate-800/60">
          {upcoming.map(task => (
            <div key={task.id} className="pt-2.5 first:pt-0 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <button
                  onClick={() => toggleTaskStatus(task.id)}
                  className="text-slate-500 hover:text-emerald-400 transition-colors shrink-0"
                >
                  {task.status === 'completed' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Circle className="w-4 h-4" />
                  )}
                </button>

                <div className="min-w-0">
                  <h4
                    onClick={() => onEditTask(task)}
                    className="text-sm font-semibold text-slate-200 hover:text-indigo-300 cursor-pointer truncate transition-colors"
                  >
                    {task.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="truncate">{task.courseName}</span>
                    <span>•</span>
                    <span className="text-slate-500">{formatDateStandard(task.deadline)}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <PriorityBadge priority={task.calculatedPriority} showIcon={false} />
                <span className="text-xs font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">
                  {formatDeadlineRelative(task.deadline)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
