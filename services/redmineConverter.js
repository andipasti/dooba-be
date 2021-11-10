export const defaultKanbanSchema = [
  { name: "Backlog", statuses: ["New", "Feedback"] },
  { name: "In Progress", statuses: ["In Progress"] },
  { name: "Done", statuses: ["Resolved", "Closed"] },
  { name: "Blocked", statuses: ["Blocked"] },
]

export const buildKanbanBoardFromSchema = (schema = defaultKanbanSchema, tasks) => {
  const board = schema.reduce((acc, column) => {
    acc[column.name] = []
    return acc
  }, {})

  const map = tasks.reduce((map, task) => {
    const item = schema.find(column => column.statuses.includes(task.status))

    if (!item) {
      map[schema[0].name].push(task._id)
      return map
    }

    map[item.name].push(task._id)
    return map
  }, board)

  return Object.entries(map).map(([name, values]) => ({ name, values }))
}

export const convertRedmineIssueToDooba = (projectId, issue) => {
  return {
    projectId: projectId,
    redmineTaskId: issue.id,
    redmineProjectId: issue.project.id,
    tracker: issue.tracker.name,
    status: issue.status.name,
    priority: issue.priority.name,
    subject: issue.subject,
    description: issue.description,
    start_date: issue.start_date,
    assigned_to: issue.assigned_to.name,
    done_ratio: issue.done_ratio,
    created_on: issue.created_on,
    updated_on: issue.updated_on,
    closed_on: issue.closed_on,
  }
}

export const convertRedmineProjectsToDooba = (projects) => {
  return projects.reduce((acc,project) => {
    acc[project.id] = project
    acc[project.id].redmineProjectId = project.id
    delete acc[project.id].id
    return acc
  }, {})
}