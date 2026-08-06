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

  return (
    <div
      className="task-modal-overlay"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="task-modal-container"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="task-modal-title"
      >
        {/* Corner details */}
        <div className="task-modal-corner-tl" />
        <div className="task-modal-corner-br" />

        <form onSubmit={handleSubmit}>
          <div className="task-modal-content">
            {/* Header */}
            <div className="task-modal-header">
              <h2 id="task-modal-title" className="task-modal-title">
                New task
              </h2>

              <button
                type="button"
                onClick={onClose}
                className="task-modal-close"
                aria-label="Close new task modal"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  aria-hidden="true"
                >
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>

            {/* Title */}
            <div className="task-field">
              <label htmlFor="task-title" className="task-field-label">
                Title
              </label>

              <input
                id="task-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Wire up API auth"
                className="task-field-input"
                autoFocus
                required
              />
            </div>

            {/* Project and assignee */}
            <div className="task-field-row">
              <div className="task-field">
                <label htmlFor="task-project" className="task-field-label">
                  Project
                </label>

                <select
                  id="task-project"
                  value={project}
                  onChange={(e) => setProject(e.target.value)}
                  className="task-field-input"
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

              <div className="task-field">
                <label htmlFor="task-assignee" className="task-field-label">
                  Assignee
                </label>

                <select
                  id="task-assignee"
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  className="task-field-input"
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
            <div className="task-field-row">
              <div className="task-field">
                <label htmlFor="task-priority" className="task-field-label">
                  Priority
                </label>

                <select
                  id="task-priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="task-field-input"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="task-field">
                <label htmlFor="task-due-date" className="task-field-label">
                  Due date
                </label>

                <input
                  id="task-due-date"
                  type="date"
                  value={due}
                  min={formatDate(new Date())}
                  onChange={(e) => setDue(e.target.value)}
                  className="task-field-input"
                  style={{ colorScheme: 'dark' }}
                  required
                />
              </div>
            </div>

            {/* Buttons */}
            <div className="task-modal-actions">
              <button
                type="button"
                onClick={onClose}
                className="task-modal-btn task-modal-btn-cancel"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={!title.trim() || !due || !project}
                className="task-modal-btn task-modal-btn-submit"
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