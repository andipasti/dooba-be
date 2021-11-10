export const USER_NOT_FOUND = 'USER_NOT_FOUND'
export const TEAM_NOT_FOUND = 'TEAM_NOT_FOUND'
export const USER_EXIST = 'USER_EXIST'
export const EMAIL_PASSWORD_WRONG = 'EMAIL_PASSWORD_WRONG'
export const EMAIL_PASSWORD_EMPTY = 'EMAIL_PASSWORD_EMPTY'
export const NAME_EMPTY = 'NAME_EMPTY'
export const PASSWORD_WRONG = 'PASSWORD_WRONG'
export const FIELDS_EMPTY = 'FIELDS_EMPTY'
export const INVALID_ROLE = 'INVALID_ROLE'
export const UNKNOWN_ERROR = 'UNKNOWN_ERROR'
export const EMAIL_NOT_VALID = 'EMAIL_NOT_VALID'
export const PASSWORD_SHORT = 'PASSWORD_SHORT'
export const NOT_AUTHORIZED = 'NOT_AUTHORIZED'
export const AUTHORIZATION_DENIED = 'AUTHORIZATION_DENIED'
export const PERMISSION_DENIED = 'PERMISSION_DENIED'
export const CHANGE_PASSWORD_WITH_TOKEN_ERROR = 'CHANGE_PASSWORD_WITH_TOKEN_ERROR'
export const PROJECT_NOT_EXIST = 'PROJECT_NOT_EXIST'
export const DATABASE_ERROR = 'DATABASE_ERROR'
export const REDMINE_ERROR = 'REDMINE_ERROR'
export const REDMINE_ACCOUNT_NOT_EXIST = 'REDMINE_ACCOUNT_NOT_EXIST'

export default {
  [USER_NOT_FOUND]: { message: 'User is not found', status: 404 },
  [TEAM_NOT_FOUND]: { message: 'Team is not found', status: 404 },
  [USER_EXIST]: { message: 'User already exist', status: 400 },
  [EMAIL_NOT_VALID]: { message: 'Email is not valid', status: 400},
  [EMAIL_PASSWORD_WRONG]: { message: 'Email or password is wrong', status: 400 },
  [NAME_EMPTY]: { message: 'Name is required and should be at least 2 symbols long', status: 400 },
  [PASSWORD_WRONG]: { message: 'Password is wrong', status: 401 },
  [EMAIL_PASSWORD_EMPTY]: { message: 'Email and password are required', status: 400 },
  [FIELDS_EMPTY]: { message: 'Fields cannot be empty', status: 400 },
  [INVALID_ROLE]: { message: 'Role value is invalid', status: 400 },
  [PASSWORD_SHORT]:  { message: 'Password is too short', status: 400 },
  [NOT_AUTHORIZED]:  { message: 'Not authorized', status: 403 },
  [AUTHORIZATION_DENIED]:  { message: 'Authorization denied', status: 403 },
  [CHANGE_PASSWORD_WITH_TOKEN_ERROR]:  { message: 'Code is wrong or link expired', status: 400 },
  [PROJECT_NOT_EXIST]:  { message: 'Project with this id doesnt exist', status: 404 },
  [PERMISSION_DENIED]:  { message: 'Permission denied', status: 401 },
  [DATABASE_ERROR]:  { message: 'Database error', status: 400 },
  [REDMINE_ACCOUNT_NOT_EXIST]:  { message: 'Provide credentials to your redmine account', status: 401 },
  [REDMINE_ERROR]:  { message: 'Redmine error', status: 400 },
  [UNKNOWN_ERROR]:  { message: 'Something went wrong', status: 500 },
}

