import React, { useState } from 'react';
import { TaskProvider } from './context/TaskContext';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardPage } from './pages/DashboardPage';
import { TasksPage } from './pages/TasksPage';
import { SettingsPage } from './pages/SettingsPage';
import { TaskFormModal } from './components/tasks/TaskFormModal';
import { useTaskContext } from './context/TaskContext';
import { Task, TaskFormData } from './types';

const MainContent: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const { addTask, updateTask } = useTaskContext();

  const handleOpenCreate = () => {
    setEditingTask(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (task: Task) => {
    setEditingTask(task);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (formData: TaskFormData) => {
    if (editingTask) {
      updateTask(editingTask.id, formData);
    } else {
      addTask(formData);
    }
  };

  return (
    <DashboardLayout
      currentTab={currentTab}
      onSelectTab={setCurrentTab}
      onOpenCreateModal={handleOpenCreate}
    >
      {currentTab === 'dashboard' && (
        <DashboardPage
          onNavigateTasks={() => setCurrentTab('tasks')}
          onEditTask={handleOpenEdit}
        />
      )}

      {currentTab === 'tasks' && (
        <TasksPage
          onEditTask={handleOpenEdit}
          onOpenCreateModal={handleOpenCreate}
        />
      )}

      {currentTab === 'settings' && <SettingsPage />}

      {/* Shared Task Form Modal */}
      <TaskFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialTask={editingTask}
      />
    </DashboardLayout>
  );
};

export function App() {
  return (
    <TaskProvider>
      <MainContent />
    </TaskProvider>
  );
}

export default App;
