import { useState } from 'react'

const formatDate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const getDefaultDueDate = () => {
  const date = new Date()
  date.setDate(date.getDate() + 7)
  return formatDate(date)
}

function TaskModal({ projects, team, onClose, onSubmit }) {
  const [title, setTitle] = useState('')
  const [project, setProject] = useState(projects[0]?.id || '')
  const [assignee, setAssignee] = useState('')
  const [priority, setPriority] = useState('medium')
  const [due, setDue] = useState(getDefaultDueDate)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title.trim() || !due || !project) return

    onSubmit({
      title: title.trim(),
      project,
      assignee: assignee || null,
      priority,
      due,
      status: 'todo',
    })
  }

  const inputClasses =
    'w-full h-[46px] rounded-[4px] border border-line bg-surface-2 px-3.5 font-sans text-[14px] text-paper outline-none transition-colors placeholder:text-muted/60 hover:border-line/90 focus:border-amber-dim'

  const labelClasses =
    'mb-2 block font-mono text-[11px] font-semibold uppercase tracking-[0.12em] text-muted'

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-6"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="relative w-full max-w-[640px] overflow-hidden rounded-[8px] border border-line bg-surface shadow-[0_24px_80px_-24px_rgba(0,0,0,0.9)]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
      >
        {/* Corner details */}
        <div className="pointer-events-none absolute left-[-1px] top-[-1px] h-3.5 w-3.5 border-l-[1.5px] border-t-[1.5px] border-amber-dim opacity-60" />
        <div className="pointer-events-none absolute bottom-[-1px] right-[-1px] h-3.5 w-3.5 border-b-[1.5px] border-r-[1.5px] border-amber-dim opacity-60" />

        <form onSubmit={handleSubmit}>
          <div className="px-7 pb-7 pt-7">
            {/* Header */}
            <div className="mb-6 flex items-start justify-between gap-4">
              <h2
                id="task-modal-title"
                className="font-display text-[22px] font-bold text-paper"
              >
                New task
              </h2>

              <button
                type="button"
                onClick={onClose}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-[4px] border border-line bg-surface-2 text-muted transition-colors hover:border-amber-dim hover:text-amber focus:outline-none focus:ring-1 focus:ring-amber-dim"
                aria-label="Close new task modal"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-4 w-4"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {/* Title */}
            <div className="mb-5">
              <label htmlFor="task-title" className={labelClasses}>
                Title
              </label>

              <input
                id="task-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Wire up API auth"
                className={inputClasses}
                autoFocus
                required
              />
            </div>

            {/* Project and assignee */}
            <div className="mb-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="task-project" className={labelClasses}>
                  Project
                </label>

                <select
                  id="task-project"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className={inputClasses}
                  required
                >
                  {projects.length === 0 && (
                    <option value="">No projects available</option>
                  )}

                  {projects.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="task-assignee" className={labelClasses}>
                  Assignee
                </label>

                <select
                  id="task-assignee"
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  className={inputClasses}
                >
                  <option value="">Unassigned</option>

                  {team.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Priority and due date */}
            <div className="mb-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="task-priority" className={labelClasses}>
                  Priority
                </label>

                <select
                  id="task-priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className={inputClasses}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label htmlFor="task-due-date" className={labelClasses}>
                  Due date
                </label>

                <input
                  id="task-due-date"
                  type="date"
                  value={due}
                  min={formatDate(new Date())}
                  onChange={(e) => setDue(e.target.value)}
                  className={`${inputClasses} [color-scheme:dark]`}
                  required
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onClose}
                className="w-full rounded-[4px] border border-line bg-surface-2 px-6 py-3 text-[14px] font-bold text-paper transition-all hover:border-amber-dim hover:bg-surface sm:w-auto sm:min-w-[110px]"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!title.trim() || !due || !project}
                className="w-full rounded-[4px] border border-amber bg-amber px-7 py-3 text-[14px] font-bold text-ink transition-all hover:bg-[#ffc372] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto sm:min-w-[120px]"
              >
                Add task
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskModal