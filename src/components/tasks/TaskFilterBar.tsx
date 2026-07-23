import React from 'react';
import { TaskFilter } from '../../types';
import { Search, Filter, ArrowUpDown } from 'lucide-react';

interface TaskFilterBarProps {
  filter: TaskFilter;
  onChangeFilter: (filter: TaskFilter) => void;
  availableCourses: string[];
}

export const TaskFilterBar: React.FC<TaskFilterBarProps> = ({
  filter,
  onChangeFilter,
  availableCourses,
}) => {
  return (
    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 shadow-md space-y-3">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by assignment title, course, or notes..."
            value={filter.search}
            onChange={e => onChangeFilter({ ...filter, search: e.target.value })}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Filter Icon Indicator */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold text-slate-400">
            <Filter className="w-3.5 h-3.5 text-indigo-400" />
            <span>Filters</span>
          </div>

          {/* Course Select */}
          <select
            value={filter.course}
            onChange={e => onChangeFilter({ ...filter, course: e.target.value })}
            aria-label="Filter by course"
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Courses</option>
            {availableCourses.map(course => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>

          {/* Status Select */}
          <select
            value={filter.status}
            onChange={e => onChangeFilter({ ...filter, status: e.target.value })}
            aria-label="Filter by status"
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>

          {/* Priority Select */}
          <select
            value={filter.priority}
            onChange={e => onChangeFilter({ ...filter, priority: e.target.value })}
            aria-label="Filter by priority"
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-slate-200 focus:outline-none focus:border-indigo-500"
          >
            <option value="all">All Priorities</option>
            <option value="high">High Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="low">Low Priority</option>
          </select>

          {/* Sort By Select */}
          <div className="flex items-center gap-1">
            <select
              value={filter.sortBy}
              onChange={e => onChangeFilter({ ...filter, sortBy: e.target.value as any })}
              aria-label="Sort assignments by"
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs font-medium text-indigo-300 focus:outline-none focus:border-indigo-500"
            >
              <option value="deadline">Sort by Deadline</option>
              <option value="priority">Sort by Priority</option>
              <option value="courseName">Sort by Course</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
