import { AlertTriangle } from 'lucide-react';

export default function ConfirmDialog({
  isOpen, onClose, onConfirm,
  title = 'Are you sure?',
  message = 'This action cannot be undone.',
  confirmText = 'Confirm',
  variant = 'danger',
}) {
  if (!isOpen) return null;

  const isDanger  = variant === 'danger';
  const iconColor = isDanger ? '#ef4444' : '#f59e0b';
  const iconBg    = isDanger ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)';
  const btnBg     = isDanger ? '#dc2626' : '#d97706';

  return (
    <div
      className="modal-overlay"
      onClick={e => e.target === e.currentTarget && onClose()}
      role="alertdialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="modal-panel modal-panel-sm">
        <div style={{ padding: '2rem 1.75rem 1.5rem', textAlign: 'center' }}>
          <div style={{
            width: '3rem', height: '3rem', borderRadius: '50%', backgroundColor: iconBg,
            display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.25rem',
          }}>
            <AlertTriangle size={22} color={iconColor} />
          </div>
          <h3 style={{ fontSize: '1.0625rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            {title}
          </h3>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{message}</p>
        </div>
        <div className="modal-footer" style={{ justifyContent: 'center' }}>
          <button onClick={onClose} className="btn btn-secondary">Cancel</button>
          <button
            onClick={() => { onConfirm(); onClose(); }}
            className="btn"
            style={{ backgroundColor: btnBg, color: 'white' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '0.9'}
            onMouseLeave={e => e.currentTarget.style.opacity = '1'}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
