import React from 'react';
import { useTasks } from '../../hooks/useTasks';
import { BookOpen, Clock, CheckCircle2, AlertOctagon, TrendingUp } from 'lucide-react';

export const SummaryCards: React.FC = () => {
  const { summary } = useTasks();

  const cards = [
    {
      title: 'Total Tasks',
      value: summary.totalTasks,
      icon: BookOpen,
      color: 'text-indigo-400',
      bg: 'bg-indigo-500/10 border-indigo-500/20',
    },
    {
      title: 'Pending Tasks',
      value: summary.pendingTasks,
      icon: Clock,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20',
    },
    {
      title: 'Completed Tasks',
      value: summary.completedTasks,
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20',
    },
    {
      title: 'Overdue Tasks',
      value: summary.overdueTasks,
      icon: AlertOctagon,
      color: summary.overdueTasks > 0 ? 'text-rose-400 animate-pulse' : 'text-slate-400',
      bg: summary.overdueTasks > 0 ? 'bg-rose-500/10 border-rose-500/30' : 'bg-slate-800/40 border-slate-700/50',
    },
    {
      title: 'Completion Rate',
      value: `${summary.completionRate}%`,
      icon: TrendingUp,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className={`p-4 rounded-2xl border ${card.bg} backdrop-blur-sm transition-all hover:scale-[1.02] shadow-lg shadow-black/20 flex flex-col justify-between`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400">{card.title}</span>
              <Icon className={`w-4 h-4 ${card.color}`} />
            </div>
            <div className="mt-3">
              <span className="text-2xl font-bold text-white tracking-tight">{card.value}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
