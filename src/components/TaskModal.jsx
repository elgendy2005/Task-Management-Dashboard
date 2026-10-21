import { useEffect, useState } from 'react';
import { X, AlertCircle } from 'lucide-react';

const CATEGORIES = ['Development', 'Design', 'Marketing', 'Research', 'Documentation', 'Bug Fix', 'Management'];

const BLANK = { title: '', description: '', priority: 'medium', status: 'todo', dueDate: '', category: 'Development' };

export default function TaskModal({ isOpen, onClose, onSave, task }) {
  const isEditing = !!task;
  const [form, setForm] = useState(BLANK);
  const [errs, setErrs] = useState({});

  useEffect(() => {
    if (isOpen) {
      setForm(task ? {
        title: task.title,
        description: task.description || '',
        priority: task.priority,
        status: task.status,
        dueDate: task.dueDate || '',
        category: task.category || 'Development',
      } : BLANK);
      setErrs({});
    }
  }, [isOpen, task]);

  function change(e) {
    const { name, value } = e.target;
    setForm(p => ({ ...p, [name]: value }));
    if (errs[name]) setErrs(p => ({ ...p, [name]: '' }));
  }

  function submit(e) {
    e.preventDefault();
    const newErrs = {};
    if (!form.title.trim()) newErrs.title   = 'Title is required';
    if (!form.dueDate)      newErrs.dueDate = 'Due date is required';
    if (Object.keys(newErrs).length) { setErrs(newErrs); return; }
    onSave({ ...form, title: form.title.trim(), description: form.description.trim() });
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()} role="dialog" aria-modal="true">
      <div className="modal-panel">
        <div className="modal-header">
          <h2>{isEditing ? 'Edit Task' : 'Create New Task'}</h2>
          <button onClick={onClose} className="btn-ghost" style={{ padding: '0.375rem' }} aria-label="Close">
            <X size={18} color="var(--text-muted)" />
          </button>
        </div>

        <form onSubmit={submit}>
          <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1.125rem' }}>
            <div>
              <label htmlFor="tf-title" className="form-label">
                Title <span style={{ color: '#ef4444' }}>*</span>
              </label>
              <input
                id="tf-title" name="title" type="text" autoFocus
                value={form.title} onChange={change}
                placeholder="What needs to be done?"
                className="form-input"
                style={errs.title ? { borderColor: '#ef4444' } : {}}
              />
              {errs.title && <p className="form-error"><AlertCircle size={12} />{errs.title}</p>}
            </div>

            <div>
              <label htmlFor="tf-desc" className="form-label">Description</label>
              <textarea
                id="tf-desc" name="description" rows={3}
                value={form.description} onChange={change}
                placeholder="Add more details…"
                className="form-input"
                style={{ resize: 'none' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label htmlFor="tf-priority" className="form-label">Priority</label>
                <select id="tf-priority" name="priority" value={form.priority} onChange={change} className="form-input form-select">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
              <div>
                <label htmlFor="tf-status" className="form-label">Status</label>
                <select id="tf-status" name="status" value={form.status} onChange={change} className="form-input form-select">
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label htmlFor="tf-date" className="form-label">
                  Due Date <span style={{ color: '#ef4444' }}>*</span>
                </label>
                <input
                  id="tf-date" name="dueDate" type="date"
                  value={form.dueDate} onChange={change}
                  className="form-input"
                  style={errs.dueDate ? { borderColor: '#ef4444' } : {}}
                />
                {errs.dueDate && <p className="form-error"><AlertCircle size={12} />{errs.dueDate}</p>}
              </div>
              <div>
                <label htmlFor="tf-category" className="form-label">Category</label>
                <select id="tf-category" name="category" value={form.category} onChange={change} className="form-input form-select">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">
              {isEditing ? 'Save Changes' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
