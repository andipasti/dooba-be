import { asyncHandler } from "../middlewares/async";
import { getUsersByTeam,
  getTeamMemberByEmail,
  getTeamMemberByUserId,
  getProjectById,
  createTeamMember,
  addMemberToTeam,
} from "../services/DBService";
import { sendInviteToProject } from "../services/email";
import { USER_NOT_FOUND } from "../constants/errorTypes";
import jwt from "jsonwebtoken";

export const getUsers = asyncHandler( async (req, res) => {
  const { team } = req.query;

  const users = await getUsersByTeam(team);

  res.send(users);
});

export const shareProject = asyncHandler( async (req, res, next) => {
  const { userId, projectId } = req.body;

  const project = await getProjectById(projectId)
  const teamMember = await getTeamMemberByUserId(userId);

  if (!teamMember) return next(USER_NOT_FOUND)

  teamMember.projects.push(project)
  await teamMember.save()

  res.send();
});

export const shareProjectToClient = asyncHandler( async (req, res) => {
  const { hostname, email, projectId, teamId } = req.body;

  const project = await getProjectById(projectId)
  let teamMember = await getTeamMemberByEmail(email);

  if (!teamMember) {
    teamMember = await createTeamMember({ email, team: teamId })
    teamMember.projects.push(project)
    await teamMember.save()
  }

  const inviteToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "24h" });
  const link = `${hostname}?token=${inviteToken}&email=${email}`

  await sendInviteToProject(email, link)

  res.send();
});

export const addToTeam = asyncHandler( async (req, res) => {
  const { userIds, teamId } = req.body;

  const members = []

  for await (let userId of userIds) {
    const member = await addMemberToTeam(userId, teamId)
    members.push(member.email)
  }

  res.send(members);
});