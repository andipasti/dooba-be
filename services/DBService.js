import { User } from "../models/User";
import { Project } from "../models/Project";
import { Comment } from "../models/Comment";
import { Task } from "../models/Task";
import { Team } from "../models/Team";
import { TeamMember } from "../models/TeamMember";

export const getUserByEmail = (email) => {
  return User.findOne({ email })
}

export const getUsersByTeam = (team) => {
  return User.find({ team }).select('email name')
}

export const getTeamByRedmineInstanceUrl = (redmine_url) => {
  return Team.findOne({ redmine_url })
}

export const getUserById = (id) => {
 return User.findOne({ _id: id }).populate('projects')
}

export const getUserTeamById = (id) => {
  return TeamMember.findOne({ user: id }).populate('team').select('team role')
}

export const getProjectById = (id) => {
  return Project.findOne({ _id: id })
}

export const getProjectByRedmineIds = (ids) => {
  return Project.find().where('redmineProjectId').in(ids).exec()
}

export const getTaskById = (id) => {
  return Task.findOne({ _id: id })
}

export const getAllTasksInProject = (projectId) => {
  return Task.find({ projectId })
}

export const createUserProject = async (userId, projectDetails) => {
  const project =  new Project({ ...projectDetails, owner: userId })
  await project.save()

  return project
}

export const getAllUserProjects = (id) => {
  return TeamMember.findOne({ user: id }).select('projects -_id').populate('projects', '-tasks -files -owner -__v')
}

export const updateProject = async (projectId, projectDetails) => {
  return new Promise(async (resolve, reject) => {
    try {
      const project = await Project.findByIdAndUpdate(projectId, projectDetails, { new: true, runValidators: true, omitUndefined: true }).select('-__v')

      resolve(project)
    } catch (e) {
      reject(e)
    }
  })
}

export const deleteProject = async (projectId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const project = await Project.deleteOne({ _id: projectId })

      resolve(project)
    } catch (e) {
      reject(e)
    }
  })
}

export const deleteProjectFromTeam = async (projectId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const team = await Team.findOne({ projects: projectId })
      if (!team) return resolve()

      team.projects.pull(projectId)
      await team.save()

      resolve(team)
    } catch (e) {
      reject(e)
    }
  })
}

export const deleteProjectFromMembers = async (projectId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const teamMembers = await TeamMember.find({ projects: projectId })
      if (!teamMembers.length) return resolve()

      for await (let teamMember of teamMembers) {
        teamMember.projects.pull(projectId)
        await teamMember.save()
      }

      resolve()
    } catch (e) {
      reject(e)
    }
  })
}

export const addCommentToTask = async (userId, taskId, commentDetails) => {
  const task = await getTaskById(taskId)
  if (!task) return

  const { author, text, files } = commentDetails
  const comment = new Comment({ taskId: task, author, text, files })
  await comment.save()

  task.comments.push(comment)
  await task.save()

  return comment
}

export const addMemberToTeam = async (userId, teamId) => {
  return new Promise(async (resolve, reject) => {
    try {
      const team = await getTeamById(teamId)
      const teamMember = await getTeamMemberByUserId(userId);
      const user = await getUserById(userId);

      team.users.push(teamMember)
      teamMember.team = team._id
      user.team = team._id

      await teamMember.save()
      await team.save()
      await user.save()

      resolve(teamMember)
    } catch (e) {
      reject(e)
    }
  })
}

export const createTaskInProject = async (taskDetails) => {
  const task = new Task(taskDetails)
  await task.save()

  return task
}


export const createUser = async (email, password, name) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = new User({ email, password, name })
      await user.save()

      resolve(user)
    } catch (e) {
      reject(e)
    }
  })
}

export const updateUser = async (userId, updatedFields) => {
  return new Promise(async (resolve, reject) => {
    try {
      const user = await User.findByIdAndUpdate(userId, updatedFields, { new: true, runValidators: true, omitUndefined: true }).select('-password -__v')

      resolve(user)
    } catch (e) {
      reject(e)
    }
  })
}

export const createNewTeam = async (teamDetails) => {
  return new Promise(async (resolve, reject) => {
    try {
      const team = new Team(teamDetails)
      await team.save()

      resolve(team)
    } catch (e) {
      reject(e)
    }
  })
}

export const createTeamMember = async (teamMemberDetails) => {
  return new Promise(async (resolve, reject) => {
    try {
      const teamMember = new TeamMember(teamMemberDetails)
      await teamMember.save()

      resolve(teamMember)
    } catch (e) {
      reject(e)
    }
  })
}

export const getTeamMemberByUserId = (id) => {
  return TeamMember.findOne({ user: id })
}

export const updateTeamMemberRole = (id, role) => {
  return TeamMember.findByIdAndUpdate(id,{ role }, { new: true })
}

export const getTeamMemberByEmail = (email) => {
  return TeamMember.findOne({ email })
}

export const getTeamById = (id) => {
  return Team.findOne({ _id: id })
}