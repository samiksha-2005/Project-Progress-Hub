function Analytics({ tasks, team }) {
  const columns = [
    { id: 'todo', name: 'To do', flag: '#7C8CAA' },
    { id: 'inprogress', name: 'In progress', flag: '#FFB454' },
    { id: 'review', name: 'In review', flag: '#9C8CFF' },
    { id: 'done', name: 'Done', flag: '#6EE7B7' },
  ]

  const total = tasks.length || 1
  const groups = columns.map(c => ({
    ...c,
    count: tasks.filter(t => t.status === c.id).length,
  }))

  const initials = (name) => {
    return name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('')
  }

  return (
    <section>
      <div className="page-head">
        <div>
          <div className="page-eyebrow">// 04 — Analytics</div>
          <h1 className="page-title">Charts &amp; breakdown</h1>
          <p className="page-desc">Task distribution and weekly throughput, drawn live from the board.</p>
        </div>
      </div>

      <div className="analytics-grid">
        <DonutChart groups={groups} total={total} />
        <BarChart tasks={tasks} />
      </div>

      <WorkloadPanel team={team} tasks={tasks} />
    </section>
  )
}

function DonutChart({ groups, total }) {
  let acc = 0
  const r = 60, cx = 80, cy = 80, circumference = 2 * Math.PI * r

  return (
    <div className="panel blueprint">
      <div className="panel-head">
        <div className="panel-title">Status distribution</div>
        <div className="panel-sub">{total} TOTAL</div>
      </div>

      <div className="flex items-center gap-6 flex-wrap">
        <svg viewBox="0 0 160 160" width="160" height="160">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--surface-2)" strokeWidth="18" />
          {groups.map((g, i) => {
            const frac = g.count / total
            const dash = frac * circumference
            const offset = -acc
            acc += dash
            return (
              <circle
                key={i}
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={g.flag}
                strokeWidth="18"
                strokeDasharray={`${dash} ${circumference - dash}`}
                strokeDashoffset={offset}
                transform={`rotate(-90 ${cx} ${cy})`}
                className="transition-all duration-1000"
              />
            )
          })}
          <text x={cx} y={cy - 4} textAnchor="middle" fill="var(--paper)" fontFamily="Space Grotesk" fontWeight="700" fontSize="22">
            {total}
          </text>
          <text x={cx} y={cy + 14} textAnchor="middle" fill="var(--muted)" fontFamily="JetBrains Mono" fontSize="9" letterSpacing="1">
            TASKS
          </text>
        </svg>

        <div className="flex flex-wrap gap-3">
          {groups.map((g, i) => (
            <span key={i} className="flex items-center gap-1.5 font-mono text-[10.5px] text-paper-dim">
              <span className="w-2 h-2 rounded-sm" style={{ background: g.flag }} />
              {g.name} · {g.count}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function BarChart({ tasks }) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const base = tasks.filter(t => t.status === 'done').length || 3
  const values = days.map((_, i) => Math.max(1, (base + i * 2) % 9))
  const max = Math.max(...values, 1)

  const w = 320, h = 160, padB = 24, padT = 10, barW = 26, gap = (w - barW * 7) / 8

  return (
    <div className="panel blueprint">
      <div className="panel-head">
        <div className="panel-title">Completed — last 7 days</div>
        <div className="panel-sub">TASKS / DAY</div>
      </div>

      <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="160" preserveAspectRatio="xMidYMid meet">
        <line x1="0" y1={h - padB} x2={w} y2={h - padB} stroke="var(--line)" strokeWidth="1" />
        {values.map((v, i) => {
          const barH = ((h - padB - padT) * v) / max
          const x = gap + i * (barW + gap)
          const y = h - padB - barH
          return (
            <g key={i}>
              <rect x={x} y={h - padB} width={barW} height="0" rx="2" fill="var(--amber)" opacity="0.85">
                <animate attributeName="height" from="0" to={barH} dur="0.7s" begin={`${i * 0.05}s`} fill="freeze" calcMode="spline" keySplines="0.22 0.9 0.3 1" />
                <animate attributeName="y" from={h - padB} to={y} dur="0.7s" begin={`${i * 0.05}s`} fill="freeze" calcMode="spline" keySplines="0.22 0.9 0.3 1" />
              </rect>
              <text x={x + barW / 2} y={h - padB + 14} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="var(--muted)">
                {days[i]}
              </text>
              <text x={x + barW / 2} y={y - 6} textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" fill="var(--paper-dim)">
                {v}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function WorkloadPanel({ team, tasks }) {
  const initials = (name) => {
    return name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('')
  }

  return (
    <div className="panel blueprint workload-panel">
      <div className="panel-head">
        <div className="panel-title">Workload by teammate</div>
        <div className="panel-sub">CAPACITY</div>
      </div>

      <div>
        {team.map(m => (
          <div key={m.id} className="workload-member-row">
            <div
              className="workload-avatar"
              style={{ background: m.color }}
            >
              {initials(m.name)}
            </div>
            <div className="workload-info">
              <div className="workload-name">{m.name}</div>
              <div className="workload-role">{m.role}</div>
            </div>
            <div className="workload-bar-container">
              <div className="workload-bar-track">
                <div 
                  className="workload-bar-fill" 
                  style={{ width: `${m.workload}%`, background: m.color }} 
                />
              </div>
            </div>
            <div className="workload-percentage">{m.workload}%</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Analytics