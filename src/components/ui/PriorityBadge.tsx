import React from 'react';
import { Priority } from '../../types';
import { AlertCircle, AlertTriangle, CheckCircle2 } from 'lucide-react';

interface PriorityBadgeProps {
  priority: Priority;
  showIcon?: boolean;
}

export const PriorityBadge: React.FC<PriorityBadgeProps> = ({ priority, showIcon = true }) => {
  switch (priority) {
    case 'high':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20 shadow-sm shadow-rose-900/10">
          {showIcon && <AlertCircle className="w-3.5 h-3.5 text-rose-400 animate-pulse" />}
          High Priority
        </span>
      );
    case 'medium':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-sm shadow-amber-900/10">
          {showIcon && <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />}
          Medium Priority
        </span>
      );
    case 'low':
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-sm shadow-emerald-900/10">
          {showIcon && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
          Low Priority
        </span>
      );
    default:
      return null;
  }
};
