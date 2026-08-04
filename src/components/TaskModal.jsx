import { useState } from 'react'

function TaskModal({ projects, team, onClose, onSubmit }) {
  const [title, setTitle] = useState('')
  const [project, setProject] = useState(projects[0]?.id || '')
  const [assignee, setAssignee] = useState('')
  const [priority, setPriority] = useState('medium')
  const [due, setDue] = useState('')

  useState(() => {
    const date = new Date(Date.now() + 7 * 24 * 3600 * 1000)
    setDue(date.toISOString().slice(0, 10))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim() || !due) return
    
    onSubmit({
      title: title.trim(),
      project,
      assignee: assignee || null,
      priority,
      due,
      status: 'todo',
    })
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="w-full max-w-[420px] bg-surface border border-line rounded-[3px] p-5 max-h-[86vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div className="font-display text-base font-semibold">New task</div>
          <button
            onClick={onClose}
            className="w-6 h-6 border border-line rounded-[3px] grid place-items-center text-muted bg-surface-2 hover:text-amber transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3.5">
            <label className="block font-mono text-[10.5px] uppercase tracking-wider text-muted mb-1.5">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Wire up API auth"
              className="w-full bg-surface-2 border border-line text-paper px-2.5 py-2 rounded-[3px] text-[13px] focus:border-amber-dim focus:outline-none transition-colors"
              required
            />
          </div>

          <div className="flex gap-2.5 mb-3.5">
            <div className="flex-1">
              <label className="block font-mono text-[10.5px] uppercase tracking-wider text-muted mb-1.5">Project</label>
              <select
                value={project}
                onChange={(e) => setProject(e.target.value)}
                className="w-full bg-surface-2 border border-line text-paper px-2.5 py-2 rounded-[3px] text-[13px] focus:border-amber-dim focus:outline-none transition-colors"
              >
                {projects.map(p => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="flex-1">
              <label className="block font-mono text-[10.5px] uppercase tracking-wider text-muted mb-1.5">Assignee</label>
              <select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="w-full bg-surface-2 border border-line text-paper px-2.5 py-2 rounded-[3px] text-[13px] focus:border-amber-dim focus:outline-none transition-colors"
              >
                <option value="">Unassigned</option>
                {team.map(m => (
                  <option key={m.id} value={m.id}>{m.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-2.5 mb-3.5">
            <div className="flex-1">
              <label className="block font-mono text-[10.5px] uppercase tracking-wider text-muted mb-1.5">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full bg-surface-2 border border-line text-paper px-2.5 py-2 rounded-[3px] text-[13px] focus:border-amber-dim focus:outline-none transition-colors"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div className="flex-1">
              <label className="block font-mono text-[10.5px] uppercase tracking-wider text-muted mb-1.5">Due date</label>
              <input
                type="date"
                value={due}
                onChange={(e) => setDue(e.target.value)}
                className="w-full bg-surface-2 border border-line text-paper px-2.5 py-2 rounded-[3px] text-[13px] focus:border-amber-dim focus:outline-none transition-colors"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2.5 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="font-semibold text-[13px] px-4 py-2.5 rounded-[3px] border border-line bg-surface-2 text-paper hover:border-amber-dim transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-amber text-ink font-semibold text-[13px] px-4 py-2.5 rounded-[3px] border border-amber hover:bg-[#ffc372] transition-all"
            >
              Add task
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskModal