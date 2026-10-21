import { Plus, Circle, Timer, CheckCircle2, ArrowLeft, ArrowRight, Kanban } from 'lucide-react';
import TaskCard from '../components/TaskCard';

const COLUMNS = [
  { key: 'todo',        label: 'To Do',       Icon: Circle,       color: '#94a3b8', bg: 'rgba(148,163,184,0.1)' },
  { key: 'in-progress', label: 'In Progress',  Icon: Timer,        color: '#6366f1', bg: 'rgba(99,102,241,0.1)'  },
  { key: 'completed',   label: 'Completed',    Icon: CheckCircle2, color: '#10b981', bg: 'rgba(16,185,129,0.1)'  },
];

const STATUS_ORDER = COLUMNS.map(c => c.key);

export default function Board({ tasks, onCreateTask, onEditTask, onDeleteTask, onStatusChange }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Kanban size={17} color="var(--c-brand-500)" />
          <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', fontWeight: 500 }}>
            <span style={{ color: 'var(--text-primary)', fontWeight: 700 }}>{tasks.length}</span> task{tasks.length !== 1 ? 's' : ''} across {COLUMNS.length} columns
          </p>
        </div>
        <button onClick={onCreateTask} className="btn btn-primary btn-sm">
          <Plus size={15} strokeWidth={2.5} /> New Task
        </button>
      </div>

      <div className="board-grid">
        {COLUMNS.map((col, colIdx) => {
          const colTasks = tasks.filter(t => t.status === col.key);
          return (
            <div key={col.key} className="kanban-col">
              <div className="kanban-col-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <div style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', backgroundColor: col.color }} />
                  <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>{col.label}</span>
                  <span className="count-badge">{colTasks.length}</span>
                </div>
              </div>

              <div className="kanban-col-body">
                {colTasks.length === 0 ? (
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2.5rem 1rem', textAlign: 'center', opacity: 0.5 }}>
                    <col.Icon size={22} color={col.color} style={{ marginBottom: '0.5rem' }} />
                    <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>No tasks here</p>
                  </div>
                ) : (
                  colTasks.map(task => (
                    <div key={task.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                      <TaskCard task={task} onEdit={onEditTask} onDelete={onDeleteTask} onStatusChange={onStatusChange} compact />

                      <div style={{ display: 'flex', gap: '0.25rem' }}>
                        {colIdx > 0 && (
                          <button
                            onClick={() => onStatusChange(task.id, STATUS_ORDER[colIdx - 1])}
                            className="btn btn-xs btn-secondary"
                            style={{ flex: 1, fontSize: '0.6875rem', gap: '0.25rem' }}
                            title={`Move to ${COLUMNS[colIdx - 1].label}`}
                          >
                            <ArrowLeft size={10} /> {COLUMNS[colIdx - 1].label}
                          </button>
                        )}
                        {colIdx < COLUMNS.length - 1 && (
                          <button
                            onClick={() => onStatusChange(task.id, STATUS_ORDER[colIdx + 1])}
                            className="btn btn-xs btn-secondary"
                            style={{ flex: 1, fontSize: '0.6875rem', gap: '0.25rem' }}
                            title={`Move to ${COLUMNS[colIdx + 1].label}`}
                          >
                            {COLUMNS[colIdx + 1].label} <ArrowRight size={10} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
