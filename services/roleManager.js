import { CLIENT, INITIATOR, MEMBER, PROJECT_LEADER } from "../constants/roles";
const DEFAULT = "DEFAULT"

export const PROJECTS_DATA_MODEL = 'PROJECTS_DATA_MODEL'

const providerModel = {
  [PROJECTS_DATA_MODEL]: {
    [INITIATOR]: '',
    [MEMBER]: '',
    [CLIENT]: '',
    [PROJECT_LEADER]: '',
    [DEFAULT]: '-tasks -files -owner',
  },
}

export const dataProvider = (userRole, dataModel) => {
  return providerModel[dataModel][userRole]
}

const permissions = {
  "/api/user/redmine-projects": {
    [INITIATOR]: true,
    [MEMBER]: true,
  },
  "/api/user/import-redmine-projects": {
    [INITIATOR]: true,
  },
  "/api/user/projects/:id": {
    [INITIATOR]: true,
  },
  "/api/users": {
    [INITIATOR]: true,
  },
  "/api/users/share-project": {
    [INITIATOR]: true,
  },
  "/api/users/share-project-to-client": {
    [INITIATOR]: true,
  },
  "/api/users/add-to-team": {
    [INITIATOR]: true,
  },
  "/api/users/role": {
    [INITIATOR]: true,
  },
}

export const isAllowedAction = (role, endpoint) => {
  if (!permissions[endpoint]) return true

  return permissions[endpoint][role]
}