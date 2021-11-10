import { Router } from "express";
import { check } from "express-validator";
import { runValidators } from "../middlewares/runValidators";
import { verifyToken } from "../middlewares/verifyToken";
import { getRedmineInstance } from "../middlewares/getRedmineUser";
import { checkPermissions } from "../middlewares/checkPermissions";
import {
  getUserProjects,
  getUserProject,
  changePassword,
  forgotPassword,
  changePasswordWithToken,
  updateUserProfile,
  importRedmineProjects,
  updateUserProject,
  deleteUserProject,
  getUserRedmineProjects,
  updateProjectKanbanSchema,
  getDefaultKanbanSchema,
  addRedmineInstance,
  updateUserRole,
} from "../controllers/user";
import { EMAIL_NOT_VALID, FIELDS_EMPTY, PASSWORD_SHORT, INVALID_ROLE } from "../constants/errorTypes";
import { CLIENT, INITIATOR, MEMBER } from "../constants/roles";

const router = Router();

router.get('/projects', verifyToken, getUserProjects)
router.get('/projects/:id', verifyToken, getUserProject)
router.put('/projects/:id', verifyToken, updateUserProject)
router.delete('/projects/:id', verifyToken, checkPermissions, deleteUserProject)
router.put('/projects/:id/build-kanban', verifyToken, updateProjectKanbanSchema)

router.get('/default-kanban-schema', verifyToken, getDefaultKanbanSchema)

router.put('/', verifyToken, updateUserProfile)

router.put('/role',
  [
    check('teamMemberId', FIELDS_EMPTY).exists().notEmpty(),
    check('role', FIELDS_EMPTY).exists().notEmpty(),
    check('role', INVALID_ROLE).isIn([CLIENT, INITIATOR, MEMBER]),
  ], verifyToken, checkPermissions, runValidators,
  updateUserRole)

router.post('/add-redmine-instance',
  [
    check('redmine_url', FIELDS_EMPTY).exists().notEmpty(),
    check('redmine_api_key', FIELDS_EMPTY).exists().notEmpty(),
  ], verifyToken, runValidators,
  addRedmineInstance)

router.get('/redmine-projects', verifyToken, checkPermissions, getRedmineInstance, getUserRedmineProjects)

router.post('/import-redmine-projects',
  [
    check('projectIds', FIELDS_EMPTY).exists().isArray({ min: 1 }),
  ], verifyToken, checkPermissions, runValidators, getRedmineInstance,
  importRedmineProjects)

router.post('/change-password',
  verifyToken,
  [
    check('old_password', FIELDS_EMPTY).exists().notEmpty(),
    check('password', FIELDS_EMPTY).exists().notEmpty(),
    check('password', PASSWORD_SHORT).isLength({ min: 6 })
  ], runValidators,
  changePassword)

router.post('/forgot-password',
  [
    check('email', FIELDS_EMPTY).exists().notEmpty(),
    check('email', EMAIL_NOT_VALID).isEmail(),
  ], runValidators,
  forgotPassword)

router.post('/change-password-with-token',
  [
    check('password', FIELDS_EMPTY).exists().notEmpty(),
    check('token', FIELDS_EMPTY).exists().notEmpty()
  ], runValidators,
  changePasswordWithToken)

export default router