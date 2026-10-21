import { useState } from 'react';
import { User, Palette, Database, Sun, Moon, RotateCcw, Save, Check, Info } from 'lucide-react';
import ConfirmDialog from '../components/ConfirmDialog';

export default function Settings({ theme, onToggleTheme, userName, onUserNameChange, onResetData, taskCount }) {
  const [nameInput,        setNameInput]        = useState(userName);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [saved,            setSaved]            = useState(false);

  function saveName() {
    const trimmed = nameInput.trim();
    if (!trimmed) return;
    onUserNameChange(trimmed);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div style={{ maxWidth: '42rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
      <div className="settings-card">
        <div className="settings-section-title">
          <User size={16} color="var(--c-brand-500)" />
          Profile
        </div>
        <div className="settings-row">
          <div style={{ flex: 1, minWidth: 0 }}>
            <p className="settings-row-label">Display Name</p>
            <p className="settings-row-desc">Shown in the welcome greeting on your dashboard.</p>
            <div style={{ display: 'flex', gap: '0.625rem', marginTop: '0.75rem' }}>
              <input
                type="text"
                value={nameInput}
                onChange={e => setNameInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && saveName()}
                placeholder="Enter your name…"
                className="form-input"
                style={{ flex: 1 }}
                aria-label="Display name"
              />
              <button onClick={saveName} className={`btn ${saved ? '' : 'btn-primary'} btn-sm`}
                style={saved ? { backgroundColor: '#10b981', color: 'white', minWidth: '5.5rem' } : { minWidth: '5.5rem' }}>
                {saved ? <><Check size={14}/> Saved!</> : <><Save size={14}/> Save</>}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="settings-card">
        <div className="settings-section-title">
          <Palette size={16} color="var(--c-brand-500)" />
          Appearance
        </div>
        <div className="settings-row">
          <div>
            <p className="settings-row-label">Theme</p>
            <p className="settings-row-desc">Switch between light and dark mode. Your preference is saved automatically.</p>
          </div>
          <button
            onClick={onToggleTheme}
            className={`toggle-track ${theme === 'dark' ? 'on' : ''}`}
            role="switch"
            aria-checked={theme === 'dark'}
            aria-label="Toggle dark mode"
          >
            <div className={`toggle-thumb ${theme === 'dark' ? 'on' : 'off'}`}>
              {theme === 'dark'
                ? <Moon size={10} color="var(--c-brand-500)" />
                : <Sun  size={10} color="#94a3b8" />}
            </div>
          </button>
        </div>

        <div className="settings-row">
          <div>
            <p className="settings-row-label">Current theme</p>
            <p className="settings-row-desc">
              You are using <strong style={{ color: 'var(--text-primary)' }}>{theme === 'dark' ? 'Dark' : 'Light'} mode</strong>.
            </p>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.4375rem 0.875rem', borderRadius: '0.5rem',
            backgroundColor: theme === 'dark' ? 'rgba(99,102,241,0.1)' : 'rgba(245,158,11,0.1)',
            color: theme === 'dark' ? 'var(--c-brand-400)' : '#d97706',
            fontSize: '0.8125rem', fontWeight: 600,
          }}>
            {theme === 'dark' ? <Moon size={14}/> : <Sun size={14}/>}
            {theme === 'dark' ? 'Dark' : 'Light'}
          </div>
        </div>
      </div>

      <div className="settings-card">
        <div className="settings-section-title">
          <Database size={16} color="var(--c-brand-500)" />
          Data Management
        </div>
        <div className="settings-row">
          <div>
            <p className="settings-row-label">Reset All Data</p>
            <p className="settings-row-desc">
              Restore the default sample tasks. You currently have{' '}
              <strong style={{ color: 'var(--text-primary)' }}>{taskCount} task{taskCount !== 1 ? 's' : ''}</strong>.
              This action cannot be undone.
            </p>
          </div>
          <button onClick={() => setShowResetConfirm(true)} className="btn btn-danger-soft btn-sm" style={{ flexShrink: 0 }}>
            <RotateCcw size={14} /> Reset
          </button>
        </div>
      </div>

      <div className="settings-card">
        <div className="settings-section-title">
          <Info size={16} color="var(--c-brand-500)" />
          About TaskFlow
        </div>
        <div style={{ padding: '1.25rem 1.5rem' }}>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '0.75rem' }}>
            TaskFlow is a modern, client-side task management dashboard built with{' '}
            <strong style={{ color: 'var(--text-primary)' }}>React 19</strong>,{' '}
            <strong style={{ color: 'var(--text-primary)' }}>Vite 6</strong>, and{' '}
            <strong style={{ color: 'var(--text-primary)' }}>Tailwind CSS 4</strong>.
            All data is persisted in <strong style={{ color: 'var(--text-primary)' }}>localStorage</strong> — no backend required.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            {[
              { label: 'Version', value: '1.0.0' },
              { label: 'Framework', value: 'React 19' },
              { label: 'Build Tool', value: 'Vite 6' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p style={{ fontSize: '0.6875rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</p>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <ConfirmDialog
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        onConfirm={onResetData}
        title="Reset All Data?"
        message="This will replace all your tasks with the original sample data. This action cannot be undone."
        confirmText="Reset Data"
        variant="warning"
      />
    </div>
  );
}
