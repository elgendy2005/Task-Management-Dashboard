import { useState } from 'react';
import { Calendar, Flag, MoreVertical, CheckCircle2, Circle, Timer, Edit2, Trash2 } from 'lucide-react';

function formatDate(s) {
  if (!s) return '';
  return new Date(s + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function isOverdue(s, status) {
  if (!s || status === 'completed') return false;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  return new Date(s + 'T00:00:00') < today;
}

function daysUntil(s) {
  if (!s) return null;
  const today = new Date(); today.setHours(0, 0, 0, 0);
  return Math.ceil((new Date(s + 'T00:00:00') - today) / 86400000);
}

const PRIORITY = {
  high:   { label: 'High',   cls: 'badge-priority-high' },
  medium: { label: 'Medium', cls: 'badge-priority-medium' },
  low:    { label: 'Low',    cls: 'badge-priority-low' },
};

const STATUS = {
  'todo':        { label: 'To Do',       Icon: Circle,       color: '#94a3b8' },
  'in-progress': { label: 'In Progress', Icon: Timer,        color: '#6366f1' },
  'completed':   { label: 'Completed',   Icon: CheckCircle2, color: '#10b981' },
};

const STATUS_ORDER = ['todo', 'in-progress', 'completed'];

export default function TaskCard({ task, onEdit, onDelete, onStatusChange, compact = false }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const priority = PRIORITY[task.priority] || PRIORITY.medium;
  const status   = STATUS[task.status]     || STATUS.todo;
  const { Icon: StatusIcon } = status;
  const overdue  = isOverdue(task.dueDate, task.status);
  const days     = daysUntil(task.dueDate);

  function cycleStatus() {
    const i = STATUS_ORDER.indexOf(task.status);
    onStatusChange(task.id, STATUS_ORDER[(i + 1) % STATUS_ORDER.length]);
  }

  function dateLabel() {
    if (!task.dueDate) return null;
    if (overdue) return { text: `Overdue ${Math.abs(days)}d`, cls: 'overdue' };
    if (days === 0) return { text: 'Due today',    cls: 'urgent' };
    if (days === 1) return { text: 'Due tomorrow', cls: 'urgent' };
    return { text: formatDate(task.dueDate), cls: '' };
  }

  const dl = dateLabel();

  return (
    <div
      className={`task-card${compact ? ' task-card-compact' : ''}${overdue ? ' overdue' : ''}`}
      style={{ display: 'flex', flexDirection: 'column', gap: compact ? '0.5rem' : '0.75rem' }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
        <button
          onClick={cycleStatus}
          style={{ marginTop: '0.1rem', flexShrink: 0, cursor: 'pointer', background: 'none', border: 'none', padding: 0, color: status.color, transition: 'transform 150ms ease' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          aria-label={`Status: ${status.label}. Click to advance.`}
          title={`Current: ${status.label} — click to advance`}
        >
          <StatusIcon size={compact ? 16 : 19} strokeWidth={task.status === 'completed' ? 2.5 : 1.75} />
        </button>

        <div style={{ flex: 1, minWidth: 0 }}>
          <p className={`task-title${compact ? ' compact' : ''}${task.status === 'completed' ? ' done' : ''}`}
            style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {task.title}
          </p>
          {!compact && task.description && (
            <p className="task-desc line-clamp-2">{task.description}</p>
          )}
        </div>

        <div style={{ position: 'relative', flexShrink: 0 }}>
          <button
            onClick={() => setMenuOpen(v => !v)}
            className="btn-ghost"
            style={{ padding: '0.25rem', opacity: 0.5, transition: 'opacity 150ms ease' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => { if (!menuOpen) e.currentTarget.style.opacity = '0.5'; }}
            aria-label="Task actions"
            aria-expanded={menuOpen}
          >
            <MoreVertical size={15} color="var(--text-muted)" />
          </button>

          {menuOpen && (
            <>
              <div style={{ position: 'fixed', inset: 0, zIndex: 29 }} onClick={() => setMenuOpen(false)} />
              <div className="dropdown-menu" role="menu">
                <button className="dropdown-item" role="menuitem"
                  onClick={() => { onEdit(task); setMenuOpen(false); }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Edit2 size={13} /> Edit
                  </span>
                </button>
                <button className="dropdown-item danger" role="menuitem"
                  onClick={() => { onDelete(task.id); setMenuOpen(false); }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Trash2 size={13} /> Delete
                  </span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.375rem' }}>
        <span className={`badge ${priority.cls}`}>
          <Flag size={9} />
          {priority.label}
        </span>

        {task.category && (
          <span className="badge badge-category">{task.category}</span>
        )}

        {dl && (
          <span className={`badge-date ${dl.cls}`} style={{ marginLeft: 'auto' }}>
            <Calendar size={10} />
            {dl.text}
          </span>
        )}
      </div>
    </div>
  );
}
