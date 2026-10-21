export default function ProgressBar({ value = 0, label, showPercentage = true, size = 'md' }) {
  const clamped = Math.min(100, Math.max(0, value));
  const trackClass = `progress-track${size === 'lg' ? ' progress-track-lg' : ''}`;

  return (
    <div>
      {(label || showPercentage) && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.625rem' }}>
          {label && (
            <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)' }}>{label}</span>
          )}
          {showPercentage && (
            <span style={{ fontSize: '0.875rem', fontWeight: 800, color: 'var(--c-brand-500)' }}>
              {Math.round(clamped)}%
            </span>
          )}
        </div>
      )}
      <div
        className={trackClass}
        role="progressbar"
        aria-valuenow={Math.round(clamped)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label || 'Progress'}
      >
        <div className="progress-fill" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
