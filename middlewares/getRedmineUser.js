import { asyncHandler } from "./async";
import { getUserTeamById } from "../services/DBService";
import { REDMINE_ACCOUNT_NOT_EXIST } from "../constants/errorTypes";

export const getRedmineInstance = asyncHandler(async(req, res, next) => {
  const { userId } = req.user
  const { role, team: { redmine_url, redmine_api_key }} = await getUserTeamById(userId)

  if (!redmine_url || !redmine_api_key) return next(REDMINE_ACCOUNT_NOT_EXIST)

  req.user.redmine_url = redmine_url
  req.user.redmine_api_key = redmine_api_key
  req.user.role = role

  next();
})