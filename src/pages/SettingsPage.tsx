import React, { useState, useRef } from 'react';
import { useTasks } from '../hooks/useTasks';
import { Task } from '../types';
import { HardDrive, RotateCcw, Trash2, Download, Database, Check, Upload, AlertCircle } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { tasks, resetTasks, clearAllTasks, addTask } = useTasks();
  const [copied, setCopied] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [importSuccess, setImportSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(tasks, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `flowspace_assignments_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImportError(null);
    setImportSuccess(false);
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (!Array.isArray(parsed)) {
          setImportError('Invalid file format. Expected a JSON array of tasks.');
          return;
        }
        // Basic validation: each item should have required Task fields
        const requiredFields: (keyof Task)[] = ['id', 'title', 'courseName', 'deadline', 'difficulty', 'status'];
        const isValid = parsed.every(item =>
          requiredFields.every(field => field in item)
        );
        if (!isValid) {
          setImportError('Some tasks are missing required fields (id, title, courseName, deadline, difficulty, status).');
          return;
        }
        // Import valid tasks (skip duplicates by id)
        const existingIds = new Set(tasks.map(t => t.id));
        let imported = 0;
        parsed.forEach((item: Task) => {
          if (!existingIds.has(item.id)) {
            addTask({
              title: item.title,
              courseName: item.courseName,
              deadline: item.deadline,
              difficulty: item.difficulty,
              status: item.status,
              notes: item.notes,
            });
            imported++;
          }
        });
        setImportSuccess(true);
        setTimeout(() => setImportSuccess(false), 3000);
        // Reset file input
        if (fileInputRef.current) fileInputRef.current.value = '';
      } catch {
        setImportError('Failed to parse JSON file. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Application Settings</h1>
        <p className="text-sm text-slate-400">
          Manage local storage data, seed demo assignments, or export your backup.
        </p>
      </div>

      {/* Storage Information Card */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <HardDrive className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Local Storage Persistence</h3>
            <p className="text-xs text-slate-400">
              100% Client-side. No cloud database or external tracking.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-500 block">Total Saved Assignments</span>
            <span className="text-xl font-bold text-white">{tasks.length} items</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <span className="text-xs text-slate-500 block">Storage Key</span>
            <span className="text-sm font-mono text-indigo-400">flowspace_tasks_v1</span>
          </div>
        </div>
      </div>

      {/* Data Operations */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Data Actions</h3>
            <p className="text-xs text-slate-400">
              Reset demo data or back up your coursework assignments.
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {/* Export JSON */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <h4 className="text-sm font-semibold text-white">Export Assignments JSON</h4>
              <p className="text-xs text-slate-400">Download a local backup file of all your assignments.</p>
            </div>
            <button
              onClick={handleExportJSON}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-indigo-300 bg-indigo-500/10 border border-indigo-500/30 hover:bg-indigo-500/20 transition-colors shrink-0"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Download className="w-4 h-4" />}
              <span>{copied ? 'Exported!' : 'Export JSON'}</span>
            </button>
          </div>

          {/* Import JSON */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div className="flex-1 min-w-0 mr-4">
              <h4 className="text-sm font-semibold text-white">Import Assignments JSON</h4>
              <p className="text-xs text-slate-400">Load a previously exported backup. Duplicates are skipped.</p>
              {importError && (
                <div className="mt-2 flex items-start gap-1.5 text-[11px] text-rose-400">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>{importError}</span>
                </div>
              )}
              {importSuccess && (
                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <Check className="w-3.5 h-3.5" />
                  <span>Tasks imported successfully!</span>
                </div>
              )}
            </div>
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={handleImportJSON}
                className="hidden"
                id="import-json-input"
              />
              <label
                htmlFor="import-json-input"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 transition-colors cursor-pointer shrink-0"
              >
                <Upload className="w-4 h-4" />
                <span>Import JSON</span>
              </label>
            </div>
          </div>

          {/* Reset Demo Assignments */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <h4 className="text-sm font-semibold text-white">Reset to Demo Assignments</h4>
              <p className="text-xs text-slate-400">Re-populate initial sample university tasks for demonstration.</p>
            </div>
            <button
              onClick={resetTasks}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 transition-colors shrink-0"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reset Data</span>
            </button>
          </div>

          {/* Clear All Data */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-slate-950 border border-slate-800">
            <div>
              <h4 className="text-sm font-semibold text-rose-400">Clear All Assignments</h4>
              <p className="text-xs text-slate-400">Permanently remove all assignments from local storage.</p>
            </div>
            <button
              onClick={clearAllTasks}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-300 bg-rose-500/10 border border-rose-500/30 hover:bg-rose-500/20 transition-colors shrink-0"
            >
              <Trash2 className="w-4 h-4" />
              <span>Clear Storage</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
