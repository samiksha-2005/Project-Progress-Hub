function Team({ team, tasks, projects, onAddMember }) {
  const initials = (name) => {
    return name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('')
  }

  return (
    <section>
      <div className="page-head">
        <div>
          <div className="page-eyebrow">// 03 — Team</div>
          <h1 className="page-title">People on the roster</h1>
          <p className="page-desc">Workload is calculated from active task assignments across {projects.length} projects.</p>
        </div>
        <button
          onClick={onAddMember}
          className="btn btn-primary"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add member
        </button>
      </div>

      <div className="team-grid">
        {team.map((m, i) => {
          const taskCount = tasks.filter(t => t.assignee === m.id && t.status !== 'done').length
          return (
            <div
              key={m.id}
              className="member-card panel blueprint"
              style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'forwards' }}
            >
              <div className="member-top">
                <div
                  className="member-avatar"
                  style={{ background: m.color }}
                >
                  {initials(m.name)}
                </div>
                <div>
                  <div className="member-name">{m.name}</div>
                  <div className="member-role">{m.role}</div>
                </div>
              </div>

              <div className="member-stats">
                <span>{taskCount} active tasks</span>
                <span>{m.workload}%</span>
              </div>

              <div className="workload-track">
                <div
                  className="workload-fill"
                  style={{ width: `${m.workload}%`, background: m.color }}
                />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default Team