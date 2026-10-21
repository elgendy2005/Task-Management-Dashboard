import { Menu, Search, Sun, Moon } from 'lucide-react';

export default function Header({
  title, subtitle, theme, onToggleTheme, onOpenSidebar,
  searchQuery = '', onSearchChange, showSearch = false,
}) {
  return (
    <header className="app-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', minWidth: 0 }}>
        <button
          onClick={onOpenSidebar}
          className="btn-ghost"
          style={{ display: 'flex', alignItems: 'center', padding: '0.4375rem', flexShrink: 0 }}
          aria-label="Open menu"
        >
          <Menu size={20} color="var(--text-secondary)" />
        </button>
        <div className="header-title-block" style={{ minWidth: 0 }}>
          <h2 style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</h2>
          {subtitle && <p style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{subtitle}</p>}
        </div>
      </div>

      <div className="header-actions">
        {showSearch && (
          <div className="search-wrap" style={{ display: 'none', position: 'relative' }}
            ref={el => { if (el) el.style.display = window.innerWidth >= 640 ? 'block' : 'none'; }}
          >
            <Search size={15} />
            <input
              type="text"
              placeholder="Search tasks…"
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              className="form-input search-input"
              style={{ width: '14rem' }}
              aria-label="Search tasks"
            />
          </div>
        )}

        <button
          onClick={onToggleTheme}
          className="btn-icon"
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light'
            ? <Moon size={16} color="var(--text-secondary)" />
            : <Sun  size={16} color="var(--text-secondary)" />
          }
        </button>
      </div>
    </header>
  );
}
