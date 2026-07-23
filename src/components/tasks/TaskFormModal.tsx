import React, { useState, useEffect } from 'react';
import { Task, TaskFormData, Difficulty } from '../../types';
import { Modal } from '../ui/Modal';
import { calculatePriority } from '../../utils/priorityCalculator';
import { PriorityBadge } from '../ui/PriorityBadge';
import { format, addDays } from 'date-fns';

interface TaskFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: TaskFormData) => void;
  initialTask?: Task | null;
}

export const TaskFormModal: React.FC<TaskFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialTask,
}) => {
  const defaultDeadline = format(addDays(new Date(), 2), 'yyyy-MM-dd');

  const [title, setTitle] = useState('');
  const [courseName, setCourseName] = useState('');
  const [deadline, setDeadline] = useState(defaultDeadline);
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (initialTask) {
      setTitle(initialTask.title);
      setCourseName(initialTask.courseName);
      setDeadline(initialTask.deadline);
      setDifficulty(initialTask.difficulty);
      setNotes(initialTask.notes || '');
    } else {
      setTitle('');
      setCourseName('');
      setDeadline(defaultDeadline);
      setDifficulty('medium');
      setNotes('');
    }
  }, [initialTask, isOpen]);

  // Preview calculated priority live
  const previewPriority = calculatePriority(deadline, difficulty);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !courseName.trim() || !deadline) return;

    onSubmit({
      title: title.trim(),
      courseName: courseName.trim(),
      deadline,
      difficulty,
      status: initialTask ? initialTask.status : 'pending',
      notes: notes.trim(),
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialTask ? 'Edit Assignment' : 'Add New Assignment'}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Assignment Title */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Assignment Title *</label>
          <input
            type="text"
            required
            placeholder="e.g. Operating Systems Lab 3"
            value={title}
            onChange={e => setTitle(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Course Name */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Course / Subject *</label>
          <input
            type="text"
            required
            placeholder="e.g. CS 301 - Operating Systems"
            value={courseName}
            onChange={e => setCourseName(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>

        {/* Deadline & Difficulty Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Deadline */}
          <div className="space-y-1">
            <label htmlFor="task-deadline" className="text-xs font-semibold text-slate-300">Due Date *</label>
            <input
              id="task-deadline"
              type="date"
              required
              value={deadline}
              onChange={e => setDeadline(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Difficulty */}
          <div className="space-y-1">
            <label htmlFor="task-difficulty" className="text-xs font-semibold text-slate-300">Difficulty Level *</label>
            <select
              id="task-difficulty"
              value={difficulty}
              onChange={e => setDifficulty(e.target.value as Difficulty)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 focus:outline-none focus:border-indigo-500"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard (+1 Priority level)</option>
            </select>
          </div>
        </div>

        {/* Smart Priority Live Preview Callout */}
        <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/20 flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-slate-400 block">Calculated Smart Priority</span>
            <span className="text-[11px] text-slate-500">Auto-assigned based on deadline & difficulty</span>
          </div>
          <PriorityBadge priority={previewPriority} />
        </div>

        {/* Notes / Description */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-300">Notes / Details (Optional)</label>
          <textarea
            rows={3}
            placeholder="Add assignment instructions, sub-tasks, or submission links..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 resize-none"
          />
        </div>

        {/* Form Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-600/25"
          >
            {initialTask ? 'Save Changes' : 'Create Assignment'}
          </button>
        </div>
      </form>
    </Modal>
  );
};
