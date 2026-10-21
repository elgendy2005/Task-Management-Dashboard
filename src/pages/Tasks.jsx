import { useState } from 'react';
import { Plus, LayoutList, LayoutGrid } from 'lucide-react';
import TaskCard from '../components/TaskCard';
import TaskFilters from '../components/TaskFilters';
import EmptyState from '../components/EmptyState';
import { ListTodo, SearchX } from 'lucide-react';

const PRIORITY_W = { high: 3, medium: 2, low: 1 };

function applyFilters(tasks, { searchQuery, statusFilter, priorityFilter, sortBy }) {
  let out = tasks.filter(t => {
    const q = searchQuery.toLowerCase();
    const matchSearch   = !q || t.title.toLowerCase().includes(q) || (t.description || '').toLowerCase().includes(q);
    const matchStatus   = statusFilter === 'all' || t.status === statusFilter;
    const matchPriority = priorityFilter === 'all' || t.priority === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });

  return [...out].sort((a, b) => {
    if (sortBy === 'newest')   return new Date(b.createdAt) - new Date(a.createdAt);
    if (sortBy === 'oldest')   return new Date(a.createdAt) - new Date(b.createdAt);
    if (sortBy === 'dueDate')  return (!a.dueDate ? 1 : !b.dueDate ? -1 : new Date(a.dueDate) - new Date(b.dueDate));
    if (sortBy === 'priority') return (PRIORITY_W[b.priority] || 0) - (PRIORITY_W[a.priority] || 0);
    return 0;
  });
}

export default function Tasks({ tasks, onCreateTask, onEditTask, onDeleteTask, onStatusChange }) {
  const [search,   setSearch]   = useState('');
  const [status,   setStatus]   = useState('all');
  const [priority, setPriority] = useState('all');
  const [sort,     setSort]     = useState('newest');
  const [view,     setView]     = useState('list');

  const filtered = applyFilters(tasks, { searchQuery: search, statusFilter: status, priorityFilter: priority, sortBy: sort });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 500 }}>
          <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{filtered.length}</span> of {tasks.length} task{tasks.length !== 1 ? 's' : ''}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.625rem' }}>
          <div className="view-toggle">
            <button onClick={() => setView('list')} className={`view-toggle-btn ${view === 'list' ? 'active' : ''}`} aria-label="List view" title="List view">
              <LayoutList size={16} />
            </button>
            <button onClick={() => setView('grid')} className={`view-toggle-btn ${view === 'grid' ? 'active' : ''}`} aria-label="Grid view" title="Grid view">
              <LayoutGrid size={16} />
            </button>
          </div>
          <button onClick={onCreateTask} className="btn btn-primary btn-sm">
            <Plus size={15} strokeWidth={2.5} /> New Task
          </button>
        </div>
      </div>

      <TaskFilters
        searchQuery={search} onSearchChange={setSearch}
        statusFilter={status} onStatusFilterChange={setStatus}
        priorityFilter={priority} onPriorityFilterChange={setPriority}
        sortBy={sort} onSortChange={setSort}
      />

      {filtered.length === 0 ? (
        <div className="card">
          <EmptyState
            icon={tasks.length === 0 ? ListTodo : SearchX}
            title={tasks.length === 0 ? 'No tasks yet' : 'No matching tasks'}
            message={tasks.length === 0
              ? 'Create your first task to start organizing your workflow.'
              : 'Try adjusting your search or filters to find what you\'re looking for.'}
            actionLabel={tasks.length === 0 ? 'Create Task' : undefined}
            onAction={tasks.length === 0 ? onCreateTask : undefined}
          />
        </div>
      ) : view === 'list' ? (
        <div className="tasks-list">
          {filtered.map(t => <TaskCard key={t.id} task={t} onEdit={onEditTask} onDelete={onDeleteTask} onStatusChange={onStatusChange} />)}
        </div>
      ) : (
        <div className="tasks-grid">
          {filtered.map(t => <TaskCard key={t.id} task={t} onEdit={onEditTask} onDelete={onDeleteTask} onStatusChange={onStatusChange} />)}
        </div>
      )}
    </div>
  );
}
