import React from 'react';
import { useTasks } from '../../hooks/useTasks';
import { Award, Zap, Smile } from 'lucide-react';

export const ProgressCard: React.FC = () => {
  const { summary } = useTasks();
  const rate = summary.completionRate;

  const getMotivationalText = () => {
    if (summary.totalTasks === 0) return 'Add your semester assignments to start tracking progress.';
    if (rate === 100) return 'Incredible work! Every assignment completed! 🎓🌟';
    if (rate >= 75) return 'Almost done with your workload! Stay strong!';
    if (rate >= 50) return 'Halfway there! Keep up the momentum!';
    if (rate >= 25) return 'Good progress made. Focus on High Priority tasks today!';
    return 'Let\'s knock out your top priority assignment today!';
  };

  return (
    <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950/20 to-slate-900 border border-slate-800 shadow-xl space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Semester Progress</h3>
            <p className="text-xs text-slate-400">{getMotivationalText()}</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-2xl font-extrabold text-indigo-400">{rate}%</span>
          <span className="text-xs text-slate-500 block">Completed</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-1.5">
        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${rate}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] font-medium text-slate-500">
          <span>{summary.completedTasks} completed</span>
          <span>{summary.pendingTasks} remaining</span>
        </div>
      </div>
    </div>
  );
};
