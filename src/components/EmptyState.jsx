import { ClipboardList } from 'lucide-react';

export default function EmptyState({
  icon: Icon = ClipboardList,
  title = 'Nothing here yet',
  message = 'Create your first item to get started.',
  actionLabel,
  onAction,
}) {
  return (
    <div className="empty-state">
      <div className="empty-icon-wrap">
        <Icon size={26} />
      </div>
      <p className="empty-title">{title}</p>
      <p className="empty-desc">{message}</p>
      {actionLabel && onAction && (
        <button onClick={onAction} className="btn btn-primary" style={{ marginTop: '1.25rem' }}>
          {actionLabel}
        </button>
      )}
    </div>
  );
}
