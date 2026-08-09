function Team({ team, tasks, projects, onAddMember, onMemberDelete, searchQuery, searchResults }) {
  const initials = (name) => {
    return name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('')
  }

  // Use search results if available, otherwise use all team members
  const displayTeam = searchQuery && searchResults ? searchResults.team : team

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
      ) : displayTeam.length === 0 ? (
        <div className="panel blueprint p-8 text-center">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 mx-auto mb-3 text-muted opacity-50">
            <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
          </svg>
          <div className="text-lg font-medium text-text-primary mb-1">No team members found</div>
          <div className="text-sm text-muted">
            {searchQuery ? 'Try searching with different keywords' : 'Add your first team member to get started'}
          </div>
        </div>
      ) : (
        <div className="team-grid">
          {displayTeam.map((m, i) => {
            const taskCount = tasks.filter(t => t.assignee === m.id && t.status !== 'done').length
            
            const handleDelete = (e) => {
              e.stopPropagation()
              e.preventDefault()
              onMemberDelete(m.id)
            }

            return (
              <div
                key={m.id}
                className="member-card panel blueprint relative group"
                style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'forwards' }}
              >
                <button
                  onClick={handleDelete}
                  className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center bg-red-500/10 border border-red-500/20 rounded opacity-0 group-hover:opacity-100 hover:bg-red-500/20 hover:border-red-500/40 hover:scale-110 active:scale-95 transition-all duration-200 z-10"
                  title="Remove member"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3 h-3 text-red-500">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>

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
      )}
    </section>
  )
}

export default Team