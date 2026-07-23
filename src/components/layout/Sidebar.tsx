import React from 'react';
import { LayoutDashboard, CheckSquare, Settings, Sparkles, Flame } from 'lucide-react';
import { useTasks } from '../../hooks/useTasks';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onSelectTab }) => {
  const { summary } = useTasks();

  const navItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard,
      badge: summary.todaysFocus.length > 0 ? `${summary.todaysFocus.length} focus` : null,
      badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    },
    {
      id: 'tasks',
      label: 'Assignments',
      icon: CheckSquare,
      badge: summary.pendingTasks > 0 ? `${summary.pendingTasks}` : null,
      badgeColor: 'bg-slate-800 text-slate-300 border-slate-700',
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      badge: null,
      badgeColor: '',
    },
  ];

  return (
    <aside className="w-full md:w-64 bg-slate-900/50 border-r border-slate-800/80 p-4 flex flex-col justify-between shrink-0">
      <div className="space-y-6">
        {/* Nav Links */}
        <div className="space-y-1">
          <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Navigation
          </p>
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-600/15 text-indigo-400 border border-indigo-500/30 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-2 py-0.5 text-[11px] font-semibold rounded-full border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Motivational Widget */}
        <div className="p-4 rounded-xl bg-gradient-to-b from-indigo-950/40 to-slate-900 border border-indigo-900/30 space-y-2">
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Smart Priority Rules</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Priorities auto-calculated by deadline & assignment difficulty.
          </p>
          {summary.overdueTasks > 0 && (
            <div className="flex items-center gap-1.5 pt-1 text-[11px] font-medium text-rose-400">
              <Flame className="w-3.5 h-3.5 animate-bounce" />
              <span>{summary.overdueTasks} overdue assignment(s)!</span>
            </div>
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-slate-800/60 text-center">
        <p className="text-[11px] text-slate-500">FlowSpace Student MVP • v1.0</p>
      </div>
    </aside>
  );
};
