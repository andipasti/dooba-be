import { asyncHandler } from "./async";
import { getTeamMemberByUserId } from "../services/DBService";
import { isAllowedAction } from "../services/roleManager";
import { PERMISSION_DENIED } from "../constants/errorTypes";

export const checkPermissions = asyncHandler(async (req, res, next) => {
  const { userId } = req.user

  const teamMember = await getTeamMemberByUserId(userId)

  const routeName = req.route && req.route.path || req.path
  const pathname = req.baseUrl + routeName

  if (!isAllowedAction(teamMember.role, pathname)) return next(PERMISSION_DENIED)

  next()
});