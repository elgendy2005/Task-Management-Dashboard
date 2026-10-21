import { Search, SlidersHorizontal, X } from 'lucide-react';

export default function TaskFilters({
  searchQuery, onSearchChange,
  statusFilter, onStatusFilterChange,
  priorityFilter, onPriorityFilterChange,
  sortBy, onSortChange,
}) {
  const hasFilters = searchQuery || statusFilter !== 'all' || priorityFilter !== 'all';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div className="search-wrap">
        <Search size={15} />
        <input
          type="text"
          placeholder="Search by title or description…"
          value={searchQuery}
          onChange={e => onSearchChange(e.target.value)}
          className="form-input search-input"
          aria-label="Search tasks"
        />
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <SlidersHorizontal size={14} color="var(--text-muted)" />
          <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-muted)' }}>Filter:</span>
        </div>

        <select value={statusFilter} onChange={e => onStatusFilterChange(e.target.value)}
          className="filter-select" aria-label="Filter by status">
          <option value="all">All Status</option>
          <option value="todo">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select value={priorityFilter} onChange={e => onPriorityFilterChange(e.target.value)}
          className="filter-select" aria-label="Filter by priority">
          <option value="all">All Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: 500, color: 'var(--text-muted)' }}>Sort:</span>
          <select value={sortBy} onChange={e => onSortChange(e.target.value)}
            className="filter-select" aria-label="Sort tasks">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="dueDate">Due Date</option>
            <option value="priority">Priority</option>
          </select>
        </div>

        {hasFilters && (
          <button
            onClick={() => { onSearchChange(''); onStatusFilterChange('all'); onPriorityFilterChange('all'); }}
            className="btn btn-xs btn-danger-soft"
          >
            <X size={11} /> Clear
          </button>
        )}
      </div>
    </div>
  );
}
