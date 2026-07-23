import React from 'react';
import { SummaryCards } from '../components/dashboard/SummaryCards';
import { TodaysFocus } from '../components/dashboard/TodaysFocus';
import { UpcomingDeadlines } from '../components/dashboard/UpcomingDeadlines';
import { ProgressCard } from '../components/dashboard/ProgressCard';

interface DashboardPageProps {
  onNavigateTasks: () => void;
  onEditTask: (task: any) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigateTasks,
  onEditTask,
}) => {
  return (
    <div className="space-y-6">
      {/* Top Section Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Student Dashboard</h1>
        <p className="text-sm text-slate-400">
          Track your semester workload, upcoming deadlines, and focus items.
        </p>
      </div>

      {/* 1. Metric Summary Cards */}
      <SummaryCards />

      {/* 2. Today's Focus Component (Core Problem Solver) */}
      <TodaysFocus onNavigateTasks={onNavigateTasks} onEditTask={onEditTask} />

      {/* 3. Upcoming Deadlines & Progress Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <UpcomingDeadlines onEditTask={onEditTask} />
        <ProgressCard />
      </div>
    </div>
  );
};
