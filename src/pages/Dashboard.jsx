import { CheckCircle2, ListTodo, Clock, AlertCircle, TrendingUp, Calendar, ArrowRight, Flame } from 'lucide-react';
import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';
import TaskCard from '../components/TaskCard';

function fmtDueLabel(dueDate, today) {
  const due = new Date(dueDate + 'T00:00:00');
  const isOverdue = due < today;
  const isToday   = due.toDateString() === today.toDateString();
  const diff      = Math.ceil((due - today) / 86400000);
  if (isOverdue)  return { text: `Overdue ${Math.abs(diff)}d`, color: '#ef4444', barColor: '#ef4444' };
  if (isToday)    return { text: 'Due today',    color: '#f59e0b', barColor: '#f59e0b' };
  if (diff === 1) return { text: 'Due tomorrow', color: '#f59e0b', barColor: '#f59e0b' };
  return { text: `${diff}d left`, color: 'var(--text-muted)', barColor: 'var(--c-brand-400)' };
}

export default function Dashboard({ tasks, userName, onEditTask, onDeleteTask, onStatusChange, onNavigate }) {
  const total     = tasks.length;
  const completed = tasks.filter(t => t.status === 'completed').length;
  const inProg    = tasks.filter(t => t.status === 'in-progress').length;
  const todo      = tasks.filter(t => t.status === 'todo').length;
  const pct       = total > 0 ? (completed / total) * 100 : 0;

  const recent = [...tasks].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)).slice(0, 5);

  const today = new Date(); today.setHours(0, 0, 0, 0);
  const upcoming = [...tasks]
    .filter(t => t.status !== 'completed' && t.dueDate)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const todayStr  = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const distro = [
    { label: 'To Do',       count: todo,      color: '#94a3b8' },
    { label: 'In Progress', count: inProg,     color: '#6366f1' },
    { label: 'Completed',   count: completed,  color: '#10b981' },
  ];

  return (
    <div className="dashboard-grid">
      <div className="welcome-banner">
        <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1.25rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.375rem' }}>
              <Flame size={18} color="rgba(255,255,255,0.8)" />
              <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {todayStr}
              </span>
            </div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', lineHeight: 1.25, marginBottom: '0.5rem' }}>
              {greeting}, {userName || 'there'} 👋
            </h1>
            <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
              {total === 0
                ? 'No tasks yet — create your first task to get started!'
                : `You have ${total} task${total !== 1 ? 's' : ''}. ${completed} completed${inProg > 0 ? `, ${inProg} in progress` : ''}.`}
            </p>
          </div>
          <button onClick={() => onNavigate('tasks')} className="btn"
            style={{ backgroundColor: 'rgba(255,255,255,0.15)', color: 'white', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.25)', flexShrink: 0 }}
            onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.25)'}
            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)'}
          >
            View All Tasks <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard title="Total Tasks"  value={total}     icon={ListTodo}     color="indigo" />
        <StatCard title="Completed"    value={completed} icon={CheckCircle2} color="emerald" />
        <StatCard title="In Progress"  value={inProg}    icon={Clock}        color="amber" />
        <StatCard title="To Do"        value={todo}      icon={AlertCircle}  color="rose" />
      </div>

      <div className="analytics-grid">
        <div className="card card-padded">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
            <TrendingUp size={17} color="var(--c-brand-500)" />
            <h3 className="section-title" style={{ fontSize: '0.9375rem' }}>Task Completion</h3>
          </div>

          <ProgressBar value={pct} label="Overall Progress" size="lg" />

          <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {distro.map(item => (
              <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div className="status-dot" style={{ backgroundColor: item.color }} />
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', flex: 1 }}>{item.label}</span>
                <span style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)', minWidth: '1.5rem', textAlign: 'right' }}>{item.count}</span>
                <div style={{ width: '5rem', height: '0.375rem', borderRadius: '999px', backgroundColor: 'var(--border-base)', overflow: 'hidden', flexShrink: 0 }}>
                  <div style={{
                    height: '100%', borderRadius: '999px', backgroundColor: item.color,
                    width: total > 0 ? `${(item.count / total) * 100}%` : '0%',
                    transition: 'width 500ms ease',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card card-padded">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar size={17} color="var(--c-brand-500)" />
              <h3 className="section-title" style={{ fontSize: '0.9375rem' }}>Upcoming Deadlines</h3>
            </div>
            <span className="count-badge">{upcoming.length}</span>
          </div>

          {upcoming.length === 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
              <Calendar size={28} color="var(--text-muted)" style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>No upcoming deadlines</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {upcoming.map(task => {
                const lbl = fmtDueLabel(task.dueDate, today);
                return (
                  <div key={task.id} style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.625rem 0.625rem', borderRadius: '0.625rem',
                    transition: 'background-color 150ms ease',
                  }}
                    onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--surface-hover)'}
                    onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                  >
                    <div style={{ width: '0.1875rem', height: '2.25rem', borderRadius: '999px', backgroundColor: lbl.barColor, flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {task.title}
                      </p>
                      <p style={{ fontSize: '0.75rem', color: lbl.color, fontWeight: 500 }}>{lbl.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="card card-padded">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <h3 className="section-title">Recent Tasks</h3>
          <button onClick={() => onNavigate('tasks')} className="btn btn-xs"
            style={{ color: 'var(--c-brand-500)', background: 'rgba(99,102,241,0.08)', border: 'none' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.15)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(99,102,241,0.08)'}
          >
            View all →
          </button>
        </div>

        {recent.length === 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem', textAlign: 'center' }}>
            <ListTodo size={28} color="var(--text-muted)" style={{ marginBottom: '0.5rem', opacity: 0.5 }} />
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>No tasks yet. Create your first task!</p>
          </div>
        ) : (
          <div className="tasks-list">
            {recent.map(task => (
              <TaskCard key={task.id} task={task} onEdit={onEditTask}
                onDelete={onDeleteTask} onStatusChange={onStatusChange} compact />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
