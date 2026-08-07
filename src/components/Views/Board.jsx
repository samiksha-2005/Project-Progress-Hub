import { useState } from 'react'

const columns = [
  { id: 'todo', name: 'To do', flag: '#7C8CAA' },
  { id: 'inprogress', name: 'In progress', flag: '#FFB454' },
  { id: 'review', name: 'In review', flag: '#9C8CFF' },
  { id: 'done', name: 'Done', flag: '#6EE7B7' },
]

const priorityColor = { low: '#7C8CAA', medium: '#FFB454', high: '#FF6B6B' }

function Board({ tasks, projects, team, onTaskMove, onNewTask, searchQuery, searchResults }) {
  const [draggedId, setDraggedId] = useState(null)

  // Use search results if available, otherwise use all tasks
  const displayTasks = searchQuery && searchResults ? searchResults.tasks : tasks

  return (
    <section>
      <div className="page-head">
        <div>
          <div className="page-eyebrow">// 02 — Task Board</div>
          <h1 className="page-title">Kanban workflow</h1>
          <p className="page-desc">Drag a card between columns to update its status.</p>
        </div>
        <button
          onClick={onNewTask}
          className="btn btn-primary"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
          New task
        </button>
      </div>

      {searchQuery && searchResults && searchResults.total === 0 ? (
        <div className="panel blueprint p-8 text-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 mx-auto mb-3 text-muted opacity-50">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.3-4.3" />
            <path d="M11 8v6M8 11h6" />
          </svg>
          <div className="text-lg font-medium text-text-primary mb-1">No results found</div>
          <div className="text-sm text-muted">Try searching with different keywords</div>
        </div>
      ) : (
        <div className="board">
          {columns.map(col => (
            <Column
              key={col.id}
              column={col}
              tasks={displayTasks.filter(t => t.status === col.id)}
              projects={projects}
              team={team}
              draggedId={draggedId}
              onDragStart={setDraggedId}
              onDragEnd={() => setDraggedId(null)}
              onDrop={(taskId) => onTaskMove(taskId, col.id)}
              searchActive={!!searchQuery}
            />
          ))}
        </div>
      )}
    </section>
  )
}

function Column({ column, tasks, projects, team, draggedId, onDragStart, onDragEnd, onDrop, searchActive }) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    if (draggedId) onDrop(draggedId)
  }

  return (
    <div className="col panel blueprint">
      <div className="col-head">
        <span className="col-flag" style={{ background: column.flag }} />
        <span className="col-name">{column.name}</span>
        <span className="col-count">{tasks.length}</span>
      </div>

      <div
        className={`col-body ${isDragOver ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {tasks.length === 0 ? (
          <div className="text-center text-muted font-mono text-[11px] py-5 px-1">
            {searchActive ? 'No matching tasks' : 'No tasks here'}
          </div>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              project={projects.find(p => p.id === task.project)}
              member={team.find(m => m.id === task.assignee)}
              onDragStart={() => onDragStart(task.id)}
              onDragEnd={onDragEnd}
              isDragging={draggedId === task.id}
            />
          ))
        )}
      </div>
    </div>
  )
}

function TaskCard({ task, project, member, onDragStart, onDragEnd, isDragging }) {
  const fmtDate = (d) => {
    const dt = new Date(d + 'T00:00:00')
    return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const isOverdue = (d) => new Date(d + 'T23:59:59') < new Date()

  const initials = (name) => {
    return name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('')
  }

  const overdue = task.status !== 'done' && isOverdue(task.due)

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      className={`task-card ${isDragging ? 'dragging' : ''}`}
    >
      <span
        className="task-tag"
        style={{
          background: project ? project.color + '22' : 'transparent',
          color: project ? project.color : 'var(--muted)',
          borderColor: project ? project.color + '55' : 'var(--line)',
        }}
      >
        {project ? project.name : '—'}
      </span>

      <div className="task-title">
        <span className="task-priority" style={{ background: priorityColor[task.priority] }} />
        {task.title}
      </div>

      <div className="task-foot">
        <span className={`task-due ${overdue ? 'overdue' : ''}`}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          {fmtDate(task.due)}
        </span>
        {member && (
          <span
            className="task-avatar"
            style={{ background: member.color }}
            title={member.name}
          >
            {initials(member.name)}
          </span>
        )}
      </div>
    </div>
  )
}

export default Board