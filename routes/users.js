import { Router } from "express";
import { check } from "express-validator";
import { runValidators } from "../middlewares/runValidators";
import { checkPermissions } from "../middlewares/checkPermissions";
import { addToTeam, getUsers, shareProject, shareProjectToClient } from "../controllers/users";
import { verifyToken } from "../middlewares/verifyToken";
import { FIELDS_EMPTY } from "../constants/errorTypes";


const router = Router();

router.use(verifyToken)
router.use(checkPermissions)

router.get('/', getUsers)

router.put('/share-project',
  [
    check('userId', FIELDS_EMPTY).exists().notEmpty(),
    check('projectId', FIELDS_EMPTY).exists().notEmpty()
  ], runValidators,
  shareProject)

router.post('/share-project-to-client',
  [
    check('email', FIELDS_EMPTY).exists().notEmpty(),
    check('projectId', FIELDS_EMPTY).exists().notEmpty(),
    check('hostname', FIELDS_EMPTY).exists().notEmpty(),
    check('teamId', FIELDS_EMPTY).exists().notEmpty(),
  ], runValidators,
  shareProjectToClient)

router.post('/add-to-team',
  [
    check('userIds', FIELDS_EMPTY).exists().isArray({ min: 1 }),
    check('teamId', FIELDS_EMPTY).exists().notEmpty()
  ], runValidators,
  addToTeam)

export default router