import { useEffect, useRef } from 'react'

function Overview({ state, onNewTask }) {
  const stats = {
    totalProjects: state.projects.length,
    activeTasks: state.tasks.filter(t => t.status !== 'done').length,
    doneThisWeek: state.tasks.filter(t => t.status === 'done').length,
    teamMembers: state.team.length,
  }

  return (
    <section>
      <div className="page-head">
        <div>
          <div className="page-eyebrow">// 01 — Overview</div>
          <h1 className="page-title">Good to see you back.</h1>
          <p className="page-desc">Here's the state of every project on the board, at a glance.</p>
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

      <StatGrid stats={stats} />

      <div className="overview-grid">
        <ProjectsPanel projects={state.projects} tasks={state.tasks} />
        <ActivityPanel activity={state.activity} />
      </div>
    </section>
  )
}

function StatGrid({ stats }) {
  const cards = [
    {
      label: 'Total projects',
      value: stats.totalProjects,
      trend: '+1 this month',
      up: true,
      icon: 'M3 3h7v9H3zM14 3h7v5h-7zM14 12h7v9h-7zM3 16h7v5H3z',
    },
    {
      label: 'Active tasks',
      value: stats.activeTasks,
      trend: '+4 this week',
      up: true,
      icon: 'M3 3h18v18H3zM9 3v18M15 3v18',
    },
    {
      label: 'Completed this week',
      value: stats.doneThisWeek,
      trend: 'on pace',
      up: true,
      icon: 'M20 6L9 17l-5-5',
    },
    {
      label: 'Team members',
      value: stats.teamMembers,
      trend: 'steady',
      up: true,
      icon: 'M9 8a3.2 3.2 0 110-6.4A3.2 3.2 0 019 8zM2.5 20c0-3.5 3-6 6.5-6s6.5 2.5 6.5 6',
    },
  ]

  return (
    <div className="stat-grid">
      {cards.map((card, i) => (
        <StatCard key={i} {...card} delay={i * 50} />
      ))}
    </div>
  )
}

function StatCard({ label, value, trend, up, icon, delay }) {
  const valueRef = useRef(null)

  useEffect(() => {
    if (!valueRef.current) return
    let cur = 0
    const step = Math.max(1, Math.ceil(value / 24))
    const animate = () => {
      cur = Math.min(value, cur + step)
      valueRef.current.textContent = cur
      if (cur < value) requestAnimationFrame(animate)
    }
    animate()
  }, [value])

  return (
    <div
      className="stat-card panel blueprint"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      <div className="stat-top">
        <span className="stat-label">{label}</span>
        <span className="stat-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--amber)" strokeWidth="1.8" className="w-3.5 h-3.5">
            <path d={icon} />
          </svg>
        </span>
      </div>
      <div ref={valueRef} className="stat-value">0</div>
      <div className={`stat-trend ${up ? 'up' : 'down'}`}>
        {up ? '▲' : '▼'} {trend}
      </div>
    </div>
  )
}

function ProjectsPanel({ projects, tasks }) {
  const fmtDate = (d) => {
    const dt = new Date(d + 'T00:00:00')
    return dt.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div className="panel blueprint">
      <div className="panel-head">
        <div className="panel-title">Project progress</div>
        <div className="panel-sub">{projects.length} ACTIVE</div>
      </div>

      {projects.map(p => (
        <div key={p.id} className="proj-row">
          <div
            className="proj-ring"
            style={{ background: `conic-gradient(${p.color} ${p.progress * 3.6}deg, var(--surface-2) 0deg)` }}
          >
            <span className="proj-ring-val">{p.progress}%</span>
          </div>
          <div className="proj-info">
            <div className="proj-name">{p.name}</div>
            <div className="proj-meta">{tasks.filter(t => t.project === p.id).length} tasks</div>
          </div>
          <div className="proj-due">
            DUE<br />{fmtDate(p.due)}
          </div>
        </div>
      ))}
    </div>
  )
}

function ActivityPanel({ activity }) {
  if (!activity.length) {
    return (
      <div className="panel blueprint">
        <div className="font-mono text-[10.5px] text-muted py-2.5">Loading activity…</div>
      </div>
    )
  }

  return (
    <div className="panel blueprint">
      <div className="panel-head">
        <div className="panel-title">Recent activity</div>
        <div className="panel-sub">LIVE FEED</div>
      </div>

      {activity.map((a, i) => (
        <div key={i} className="feed-item">
          <span className="feed-dot" style={{ background: a.color }} />
          <div>
            <div className="feed-text">
              <b>{a.person}</b> {a.verb} <b>{a.task}</b>
            </div>
            <div className="feed-time">{a.time}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Overview