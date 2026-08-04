import { useState, useEffect } from 'react'

const palette = ['#FFB454', '#6EE7B7', '#9C8CFF', '#FF6B6B', '#5EC8F2', '#F2A6D6']
let colorCursor = 0
const nextColor = () => palette[(colorCursor++) % palette.length]

const localFallbackTeam = [
  { name: 'Maya Chen', role: 'Product Designer' },
  { name: 'Diego Ramirez', role: 'Frontend Engineer' },
  { name: 'Sara Ibrahim', role: 'Backend Engineer' },
  { name: 'Owen Whitfield', role: 'QA Lead' },
  { name: 'Anika Rao', role: 'Project Manager' },
]

export function useAppState(showToast) {
  const [state, setState] = useState({
    projects: [
      { id: 'p1', name: 'Aurora Mobile App', color: '#FFB454', progress: 64, due: '2026-08-22' },
      { id: 'p2', name: 'Ledger Billing Engine', color: '#6EE7B7', progress: 38, due: '2026-09-05' },
      { id: 'p3', name: 'Northwind Marketing Site', color: '#9C8CFF', progress: 82, due: '2026-08-10' },
      { id: 'p4', name: 'Internal Design System', color: '#5EC8F2', progress: 21, due: '2026-09-28' },
    ],
    team: [],
    tasks: [],
    activity: [],
    idSeed: 100,
  })

  const [apiStatus, setApiStatus] = useState({
    loading: false,
    error: false,
    message: 'API integration ready — team roster syncs from a live REST endpoint (jsonplaceholder.typicode.com/users).',
  })

  const uid = (prefix) => {
    setState(prev => ({ ...prev, idSeed: prev.idSeed + 1 }))
    return prefix + (state.idSeed + 1)
  }

  const seedTasks = () => {
    const taskData = [
      ['Design onboarding flow', 'p1', 'high', 'inprogress', -2],
      ['Set up CI pipeline', 'p2', 'medium', 'todo', 5],
      ['Write API auth middleware', 'p2', 'high', 'inprogress', 2],
      ['Landing page hero copy', 'p3', 'low', 'review', 1],
      ['QA pass on checkout', 'p1', 'medium', 'todo', 7],
      ['Token & color audit', 'p4', 'low', 'todo', 12],
      ['Component library — buttons', 'p4', 'medium', 'done', -4],
      ['Integrate payment gateway', 'p2', 'high', 'todo', 9],
      ['Usability test round 2', 'p1', 'medium', 'review', 3],
      ['SEO metadata pass', 'p3', 'low', 'done', -6],
      ['Deploy staging environment', 'p2', 'medium', 'inprogress', 4],
      ['Accessibility audit', 'p1', 'high', 'todo', 10],
    ]

    const tasks = taskData.map(([title, project, priority, status, dueOffset], i) => {
      const due = new Date()
      due.setDate(due.getDate() + dueOffset)
      return {
        id: 't' + (101 + i),
        title,
        project,
        priority,
        status,
        due: due.toISOString().slice(0, 10),
        assignee: null,
      }
    })

    setState(prev => ({ ...prev, tasks }))
  }

  const assignTasksToTeam = (team, tasks) => {
    return tasks.map((task, i) => ({
      ...task,
      assignee: team[i % team.length]?.id || null,
    }))
  }

  const seedActivity = (team, tasks) => {
    if (!team.length) return []
    const verbs = ['moved', 'completed', 'commented on', 'was assigned', 'opened']
    return tasks.slice(0, 6).map((task, i) => {
      const person = team[i % team.length]
      return {
        person: person?.name || 'Someone',
        color: person?.color || '#7C8CAA',
        verb: verbs[i % verbs.length],
        task: task.title,
        time: `${(i + 1) * 7}m ago`,
      }
    })
  }

  const loadTeamFromAPI = async () => {
    setApiStatus({
      loading: true,
      error: false,
      message: 'Syncing team roster from REST API…',
    })

    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/users')
      if (!res.ok) throw new Error('Bad response ' + res.status)
      const data = await res.json()

      const team = data.slice(0, 6).map((u, i) => ({
        id: 'm' + (101 + i),
        name: u.name,
        role: ['Frontend Engineer', 'Backend Engineer', 'Product Designer', 'QA Engineer', 'Project Manager', 'DevOps Engineer'][i % 6],
        color: nextColor(),
        workload: 30 + Math.round(Math.random() * 60),
      }))

      const tasksWithAssignees = assignTasksToTeam(team, state.tasks)
      const activity = seedActivity(team, tasksWithAssignees)

      setState(prev => ({
        ...prev,
        team,
        tasks: tasksWithAssignees,
        activity,
      }))

      setApiStatus({
        loading: false,
        error: false,
        message: 'Connected — team roster synced from jsonplaceholder.typicode.com/users (GET).',
      })
    } catch (err) {
      const team = localFallbackTeam.map((p, i) => ({
        id: 'm' + (101 + i),
        name: p.name,
        role: p.role,
        color: nextColor(),
        workload: 30 + Math.round(Math.random() * 60),
      }))

      const tasksWithAssignees = assignTasksToTeam(team, state.tasks)
      const activity = seedActivity(team, tasksWithAssignees)

      setState(prev => ({
        ...prev,
        team,
        tasks: tasksWithAssignees,
        activity,
      }))

      setApiStatus({
        loading: false,
        error: true,
        message: 'API unreachable — showing local fallback roster instead.',
      })
    }
  }

  useEffect(() => {
    seedTasks()
  }, [])

  useEffect(() => {
    if (state.tasks.length > 0 && state.team.length === 0) {
      loadTeamFromAPI()
    }
  }, [state.tasks])

  const addTask = (task) => {
    const newTask = {
      ...task,
      id: uid('t'),
    }
    setState(prev => ({
      ...prev,
      tasks: [newTask, ...prev.tasks],
    }))
  }

  const addMember = (member) => {
    const newMember = {
      ...member,
      id: uid('m'),
      color: nextColor(),
      workload: 20 + Math.round(Math.random() * 50),
    }
    setState(prev => ({
      ...prev,
      team: [...prev.team, newMember],
    }))
  }

  const moveTask = (taskId, newStatus) => {
    setState(prev => ({
      ...prev,
      tasks: prev.tasks.map(t =>
        t.id === taskId ? { ...t, status: newStatus } : t
      ),
    }))
  }

  const refreshTeam = () => {
    showToast('Refreshing roster from API…')
    loadTeamFromAPI()
  }

  return {
    state,
    addTask,
    addMember,
    moveTask,
    apiStatus,
    refreshTeam,
  }
}