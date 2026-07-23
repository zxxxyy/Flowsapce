import React from 'react';
import { Difficulty } from '../../types';

interface DifficultyBadgeProps {
  difficulty: Difficulty;
}

export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({ difficulty }) => {
  const getStyles = () => {
    switch (difficulty) {
      case 'hard':
        return 'bg-purple-500/10 text-purple-300 border-purple-500/20';
      case 'medium':
        return 'bg-sky-500/10 text-sky-300 border-sky-500/20';
      case 'easy':
        return 'bg-slate-700/40 text-slate-300 border-slate-600/40';
      default:
        return 'bg-slate-700/40 text-slate-300 border-slate-600/40';
    }
  };

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border capitalize ${getStyles()}`}>
      {difficulty}
    </span>
  );
};
