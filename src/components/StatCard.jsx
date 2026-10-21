const colorMap = {
  indigo:  { iconBg: 'rgba(99,102,241,0.12)',  iconColor: '#6366f1', trendColor: '#6366f1' },
  emerald: { iconBg: 'rgba(16,185,129,0.12)',  iconColor: '#10b981', trendColor: '#10b981' },
  amber:   { iconBg: 'rgba(245,158,11,0.12)',  iconColor: '#f59e0b', trendColor: '#f59e0b' },
  rose:    { iconBg: 'rgba(239,68,68,0.12)',   iconColor: '#ef4444', trendColor: '#ef4444' },
};

export default function StatCard({ title, value, icon: Icon, color = 'indigo', trend }) {
  const c = colorMap[color] || colorMap.indigo;
  return (
    <div className="stat-card">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '0.75rem' }}>
        <div style={{ minWidth: 0 }}>
          <p className="stat-label">{title}</p>
          <p className="stat-value">{value}</p>
          {trend && (
            <p className="stat-trend" style={{ color: c.trendColor }}>{trend}</p>
          )}
        </div>
        <div className="stat-icon-wrap" style={{ backgroundColor: c.iconBg }}>
          <Icon size={20} color={c.iconColor} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}
