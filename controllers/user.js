import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  PASSWORD_WRONG,
  USER_NOT_FOUND,
  CHANGE_PASSWORD_WITH_TOKEN_ERROR,
  PROJECT_NOT_EXIST,
  TEAM_NOT_FOUND,
} from "../constants/errorTypes";
import {
  getUserById,
  getUserByEmail,
  updateUser,
  createUserProject,
  updateProject,
  getAllUserProjects,
  getProjectById,
  getProjectByRedmineIds,
  createTaskInProject,
  getAllTasksInProject,
  getTeamByRedmineInstanceUrl,
  createNewTeam,
  getTeamMemberByUserId,
  getTeamById,
  deleteProject,
  deleteProjectFromTeam,
  deleteProjectFromMembers,
  updateTeamMemberRole,
} from "../services/DBService";
import { asyncHandler } from "../middlewares/async";
import r from "../services/redmine";
import { sendVerifyPasswordChange } from "../services/email";
import { convertRedmineIssueToDooba,
  convertRedmineProjectsToDooba,
  buildKanbanBoardFromSchema,
  defaultKanbanSchema,
} from "../services/redmineConverter";
import { INITIATOR } from "../constants/roles";

export const getUserRedmineProjects = asyncHandler(async (req, res) => {
  const { redmine_url, redmine_api_key } = req.user
  const data = await r.getRedmineUserProjects(redmine_url, redmine_api_key)

  const redmineIds = data.projects.map(project => project.id)
  const existingRedmineProjects = await getProjectByRedmineIds(redmineIds)

  data.projects = data.projects.filter(rProject => !existingRedmineProjects.some(project => rProject.id === project.redmineProjectId))

  res.send(data)
})

export const getUserProjects = asyncHandler(async (req, res) => {
  const { userId } = req.user;
  const projects = await getAllUserProjects(userId)

  res.send(projects)
})

export const getUserProject = asyncHandler(async (req, res, next) => {
  const { id } = req.params

  const project = await getProjectById(id).select('-__v -owner')
  if (!project) return next(PROJECT_NOT_EXIST)

  res.send(project)
})

export const changePassword = asyncHandler(async (req, res, next) => {
  const { userId } = req.user
  const { old_password, password } = req.body

  const user = await getUserById(userId);
  if (!user) return next(USER_NOT_FOUND);

  const isMatch = await bcrypt.compare(old_password, user.password);
  if (!isMatch) return next(PASSWORD_WRONG);

  user.password = await bcrypt.hash(password, 12);
  await user.save()

  res.send()
})

export const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email, hostname } = req.body

  const user = await getUserByEmail(email)
  if (!user) return next(USER_NOT_FOUND);

  const changePasswordToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  const confirmLink = `${hostname}?token=${changePasswordToken}`

  user.changePasswordToken = changePasswordToken
  await user.save()

  await sendVerifyPasswordChange(email, confirmLink)
  res.send()
})

export const changePasswordWithToken = asyncHandler(async (req, res, next) => {
  const { password, token } = req.body

  await jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return next(CHANGE_PASSWORD_WITH_TOKEN_ERROR)

    const db_user = await getUserByEmail(user.email)
    if (!db_user) return next(USER_NOT_FOUND);
    if (db_user.changePasswordToken !== token) return next(CHANGE_PASSWORD_WITH_TOKEN_ERROR)

    db_user.password = await bcrypt.hash(password, 12);
    db_user.changePasswordToken = ""
    await db_user.save()

    res.send()
  });
})

export const updateUserProfile = asyncHandler(async (req, res) => {
  const { userId } = req.user
  const { name, redmine_url, redmine_api_key } = req.body

  const updatedUser = await updateUser(userId, { name, redmine_url, redmine_api_key })

  res.send(updatedUser)
})

export const updateUserRole = asyncHandler(async (req, res) => {
  const { teamMemberId, role } = req.body

  const teamMember = await updateTeamMemberRole(teamMemberId, role)

  res.send({ role: teamMember.role })
})

export const importRedmineProjects = asyncHandler(async (req, res, next) => {
  const { redmine_url, redmine_api_key, userId } = req.user
  let { projectIds } = req.body

  const teamMember = await getTeamMemberByUserId(userId)
  if (!teamMember) return next(USER_NOT_FOUND)

  const team = await getTeamById(teamMember.team)
  if (!team) return next(TEAM_NOT_FOUND)

  const existingRedmineProjects = await getProjectByRedmineIds(projectIds)
  if (existingRedmineProjects.length) {
    projectIds = projectIds.filter(id => !existingRedmineProjects.some(project => id === project.redmineProjectId))
  }

  const data = await r.getRedmineUserProjects(redmine_url, redmine_api_key)
  const redmineProjectsMap = convertRedmineProjectsToDooba(data.projects)

  for await (let id of projectIds) {
    const issues = await r.getRedmineProjectIssues(redmine_url, redmine_api_key, { project_id: id })
    const closed_issues = await r.getRedmineProjectIssues(redmine_url, redmine_api_key, { project_id: id, status_id: "closed" })

    const project = await createUserProject(userId, redmineProjectsMap[id])
    const all_issues = [...issues.issues, ...closed_issues.issues]

    for await (let issue of all_issues) {
      const new_task = convertRedmineIssueToDooba(project._id, issue)
      const task = await createTaskInProject(new_task)

      project.tasks.push(task)
    }

    await project.save()
    teamMember.projects.push(project)
    team.projects.push(project)
  }

  await teamMember.save()
  await team.save()

  res.send()
})

export const updateUserProject = asyncHandler(async (req, res) => {
  const { projectId, deadline, members, kanbanBoard } = req.body

  const updatedProject = await updateProject(projectId, { deadline, members, kanbanBoard })

  res.send(updatedProject)
})

export const deleteUserProject = asyncHandler(async (req, res) => {
  const { id } = req.params

  await deleteProject(id)
  await deleteProjectFromTeam(id)
  await deleteProjectFromMembers(id)

  res.send({ id })
})

export const updateProjectKanbanSchema = asyncHandler(async (req, res) => {
  const { kanbanSchema } = req.body
  const { id } = req.params

  const tasks = await getAllTasksInProject(id)

  const kanbanBoard = buildKanbanBoardFromSchema(kanbanSchema, tasks)
  const updatedProject = await updateProject(id, { kanbanSchema, kanbanBoard })

  res.send(updatedProject)
})

export const getDefaultKanbanSchema = (req, res) => {
  res.send(defaultKanbanSchema)
}

export const addRedmineInstance = asyncHandler(async (req, res) => {
  const { userId } = req.user
  const { redmine_url, redmine_api_key } = req.body

  await r.getCurrentRedmineUser(redmine_url, redmine_api_key)
  let team = await getTeamByRedmineInstanceUrl(redmine_url)
  const teamMember = await getTeamMemberByUserId(userId)
  const user = await getUserById(userId)

  if (!team) {
    teamMember.role = INITIATOR
    team = await createNewTeam({ redmine_url, redmine_api_key })

    team.users.push(teamMember)
    teamMember.team = team._id
    user.team = team._id

    await team.save()
    await teamMember.save()
    await user.save()

    return res.send({ team: team._id, role: teamMember.role })
  }

  teamMember.team = team._id
  team.users.push(teamMember)
  user.team = team._id

  await team.save()
  await user.save()
  await teamMember.save()

  res.send({ team: team._id, role: teamMember.role })
})