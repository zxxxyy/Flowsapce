import React from 'react';
import { useTasks } from '../../hooks/useTasks';
import { PriorityBadge } from '../ui/PriorityBadge';
import { DifficultyBadge } from '../ui/DifficultyBadge';
import { formatDeadlineRelative } from '../../utils/dateUtils';
import { Target, CheckCircle2, Circle, ArrowRight, Sparkles, BookOpen } from 'lucide-react';

interface TodaysFocusProps {
  onNavigateTasks: () => void;
  onEditTask: (task: any) => void;
}

export const TodaysFocus: React.FC<TodaysFocusProps> = ({ onNavigateTasks, onEditTask }) => {
  const { summary, toggleTaskStatus } = useTasks();
  const focusTasks = summary.todaysFocus;

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-slate-900 border border-indigo-500/20 shadow-xl relative overflow-hidden">
      {/* Glow background accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-1">
            <Target className="w-4 h-4 text-indigo-400" />
            <span>Today's Focus</span>
            <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 text-[10px] font-bold">
              Top Priority
            </span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            What Should You Work On Today?
          </h2>
        </div>

        <button
          onClick={onNavigateTasks}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors self-start sm:self-auto group"
        >
          <span>View all assignments</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Focus Task Cards */}
      {focusTasks.length === 0 ? (
        <div className="py-8 text-center rounded-xl bg-slate-950/40 border border-slate-800/80 p-6 space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-white">All caught up for today! 🎉</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            You have no urgent pending assignments right now. Take a break or plan ahead for upcoming coursework.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {focusTasks.map((task, index) => (
            <div
              key={task.id}
              className="group p-4 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-indigo-500/40 transition-all shadow-md hover:shadow-indigo-500/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5 flex-1 min-w-0">
                {/* Numbered focus indicator or checkbox */}
                <button
                  onClick={() => toggleTaskStatus(task.id)}
                  className="mt-0.5 shrink-0 text-slate-500 hover:text-emerald-400 transition-colors"
                  title="Mark as completed"
                >
                  {task.status === 'completed' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5 group-hover:border-emerald-400" />
                  )}
                </button>

                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-800/50">
                      #{index + 1} Focus
                    </span>
                    <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-slate-500" />
                      {task.courseName}
                    </span>
                  </div>

                  <h3
                    onClick={() => onEditTask(task)}
                    className="text-base font-semibold text-slate-100 hover:text-indigo-300 cursor-pointer truncate transition-colors"
                  >
                    {task.title}
                  </h3>

                  {task.notes && (
                    <p className="text-xs text-slate-400 line-clamp-1 italic">
                      "{task.notes}"
                    </p>
                  )}
                </div>
              </div>

              {/* Badges & Relative Deadline */}
              <div className="flex items-center gap-2.5 sm:self-center shrink-0">
                <DifficultyBadge difficulty={task.difficulty} />
                <PriorityBadge priority={task.calculatedPriority} />
                <div className="text-right pl-2 border-l border-slate-800">
                  <span className="text-xs font-bold text-indigo-300 block">
                    {formatDeadlineRelative(task.deadline)}
                  </span>
                  <span className="text-[10px] text-slate-500 block">Deadline</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
