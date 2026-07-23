import React from 'react';
import { Plus, GraduationCap, Calendar } from 'lucide-react';
import { format } from 'date-fns';

interface HeaderProps {
  onOpenCreateModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCreateModal }) => {
  const todayStr = format(new Date(), 'EEEE, MMM d, yyyy');

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between px-6 py-4 bg-slate-900/80 backdrop-blur-md border-b border-slate-800/80">
      {/* Brand & Mobile Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white shadow-lg shadow-indigo-500/20">
          <GraduationCap className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold tracking-tight text-white">FlowSpace</h1>
            <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
              Student MVP
            </span>
          </div>
          <p className="text-xs text-slate-400">Smart Priority Assignment Manager</p>
        </div>
      </div>

      {/* Action Controls & Date */}
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/60 border border-slate-700/50 text-slate-300 text-xs font-medium">
          <Calendar className="w-3.5 h-3.5 text-indigo-400" />
          <span>{todayStr}</span>
        </div>

        <button
          onClick={onOpenCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 transition-all shadow-lg shadow-indigo-600/25 hover:shadow-indigo-600/40"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          <span>New Assignment</span>
        </button>
      </div>
    </header>
  );
};
