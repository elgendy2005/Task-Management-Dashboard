import { useState, useEffect } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import sampleTasks from './data/sampleTasks';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TaskModal from './components/TaskModal';
import ConfirmDialog from './components/ConfirmDialog';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Board from './pages/Board';
import Settings from './pages/Settings';

const pageConfig = {
  dashboard: { title: 'Dashboard', subtitle: 'Welcome to your productivity overview' },
  tasks: { title: 'My Tasks', subtitle: 'Manage and organize your tasks' },
  board: { title: 'Board', subtitle: 'Kanban-style task organization' },
  settings: { title: 'Settings', subtitle: 'Customize your experience' },
};

const INIT_KEY = 'taskflow_initialized';

export default function App() {
  const [tasks, setTasks] = useLocalStorage('taskflow_tasks', []);
  const [theme, setTheme] = useLocalStorage('taskflow_theme', 'light');
  const [userName, setUserName] = useLocalStorage('taskflow_username', 'Ahmed');

  const [activePage, setActivePage] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [taskModal, setTaskModal] = useState({ open: false, task: null });
  const [deleteConfirm, setDeleteConfirm] = useState({ open: false, taskId: null });
  const [headerSearch, setHeaderSearch] = useState('');

  useEffect(() => {
    const initialized = window.localStorage.getItem(INIT_KEY);
    if (!initialized) {
      setTasks(sampleTasks);
      window.localStorage.setItem(INIT_KEY, 'true');
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  function toggleTheme() {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  }

  function handleCreateTask(taskData) {
    const newTask = {
      ...taskData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks((prev) => [newTask, ...prev]);
  }

  function handleUpdateTask(taskData) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskModal.task.id
          ? { ...t, ...taskData, updatedAt: new Date().toISOString() }
          : t
      )
    );
  }

  function handleStatusChange(taskId, newStatus) {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === taskId
          ? { ...t, status: newStatus, updatedAt: new Date().toISOString() }
          : t
      )
    );
  }

  function handleDeleteTask(taskId) {
    setDeleteConfirm({ open: true, taskId });
  }

  function confirmDelete() {
    setTasks((prev) => prev.filter((t) => t.id !== deleteConfirm.taskId));
  }

  function handleResetData() {
    setTasks(sampleTasks);
  }

  function openCreateModal() {
    setTaskModal({ open: true, task: null });
  }

  function openEditModal(task) {
    setTaskModal({ open: true, task });
  }

  function closeModal() {
    setTaskModal({ open: false, task: null });
  }

  function handleSaveTask(taskData) {
    if (taskModal.task) {
      handleUpdateTask(taskData);
    } else {
      handleCreateTask(taskData);
    }
  }

  const currentPage = pageConfig[activePage] || pageConfig.dashboard;

  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="app-main">
        <Header
          title={currentPage.title}
          subtitle={currentPage.subtitle}
          theme={theme}
          onToggleTheme={toggleTheme}
          onOpenSidebar={() => setSidebarOpen(true)}
          searchQuery={headerSearch}
          onSearchChange={setHeaderSearch}
          showSearch={activePage === 'tasks'}
        />

        <main className="page-content">
          {activePage === 'dashboard' && (
            <Dashboard
              tasks={tasks}
              userName={userName}
              onEditTask={openEditModal}
              onDeleteTask={handleDeleteTask}
              onStatusChange={handleStatusChange}
              onNavigate={setActivePage}
            />
          )}

          {activePage === 'tasks' && (
            <Tasks
              tasks={tasks}
              onCreateTask={openCreateModal}
              onEditTask={openEditModal}
              onDeleteTask={handleDeleteTask}
              onStatusChange={handleStatusChange}
            />
          )}

          {activePage === 'board' && (
            <Board
              tasks={tasks}
              onCreateTask={openCreateModal}
              onEditTask={openEditModal}
              onDeleteTask={handleDeleteTask}
              onStatusChange={handleStatusChange}
            />
          )}

          {activePage === 'settings' && (
            <Settings
              theme={theme}
              onToggleTheme={toggleTheme}
              userName={userName}
              onUserNameChange={setUserName}
              onResetData={handleResetData}
              taskCount={tasks.length}
            />
          )}
        </main>
      </div>

      <TaskModal
        isOpen={taskModal.open}
        onClose={closeModal}
        onSave={handleSaveTask}
        task={taskModal.task}
      />

      <ConfirmDialog
        isOpen={deleteConfirm.open}
        onClose={() => setDeleteConfirm({ open: false, taskId: null })}
        onConfirm={confirmDelete}
        title="Delete Task?"
        message="This task will be permanently removed. This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
}
