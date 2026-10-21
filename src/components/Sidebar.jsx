import { LayoutDashboard, ListTodo, Kanban, Settings, X, Zap, CheckSquare } from 'lucide-react';

const navItems = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { key: 'tasks',     label: 'My Tasks',  icon: ListTodo },
  { key: 'board',     label: 'Board',     icon: Kanban },
  { key: 'settings',  label: 'Settings',  icon: Settings },
];

export default function Sidebar({ activePage, onNavigate, isOpen, onClose }) {
  return (
    <>
      <div
        className={`sidebar-backdrop ${isOpen ? 'visible' : ''}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`sidebar ${isOpen ? 'open' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="sidebar-brand">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="sidebar-logo">
              <Zap size={16} color="white" strokeWidth={2.5} />
            </div>
            <div>
              <p style={{ fontSize: '1.0625rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                TaskFlow
              </p>
              <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Workspace
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="btn-ghost"
            style={{ display: 'flex', alignItems: 'center', padding: '0.375rem' }}
            aria-label="Close sidebar"
          >
            <X size={18} color="var(--text-muted)" />
          </button>
        </div>

        <nav className="sidebar-nav">
          <p style={{ fontSize: '0.6875rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', padding: '0 0.5rem', marginBottom: '0.25rem' }}>
            Navigation
          </p>
          {navItems.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => { onNavigate(key); onClose(); }}
              className={`nav-item ${activePage === key ? 'active' : ''}`}
              aria-current={activePage === key ? 'page' : undefined}
            >
              <Icon size={17} className="nav-item-icon" strokeWidth={activePage === key ? 2.5 : 2} />
              <span>{label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-promo">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <CheckSquare size={14} color="rgba(255,255,255,0.9)" />
              <p style={{ fontSize: '0.8125rem', fontWeight: 700, color: 'white' }}>Stay on track</p>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', lineHeight: 1.6 }}>
              Organize your tasks and hit every deadline with TaskFlow.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}
