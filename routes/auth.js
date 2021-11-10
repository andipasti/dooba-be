import { Router } from "express";
import { check } from 'express-validator'
import { runValidators } from "../middlewares/runValidators";
import { login, register, registerByInvite, silentLogin } from "../controllers/auth";
import { verifyToken } from "../middlewares/verifyToken";

import {
  EMAIL_NOT_VALID,
  EMAIL_PASSWORD_EMPTY,
  PASSWORD_SHORT,
  NAME_EMPTY
} from "../constants/errorTypes";

const router = Router();

router.post('/login',
  [
    check('email', EMAIL_PASSWORD_EMPTY).exists().notEmpty(),
    check('password', EMAIL_PASSWORD_EMPTY).exists().notEmpty(),
  ], runValidators,
  login)

router.post('/register',
  [
    check('email', EMAIL_PASSWORD_EMPTY).exists().notEmpty(),
    check('email', EMAIL_NOT_VALID).isEmail(),
    check('password', EMAIL_PASSWORD_EMPTY).exists().notEmpty(),
    check('password', PASSWORD_SHORT).isLength({ min: 6 }),
    check('name', NAME_EMPTY).exists().notEmpty().isLength({ min: 2 }),
  ], runValidators,
  register)

router.post('/register-by-invite', registerByInvite)

router.get('/silent-login', verifyToken, silentLogin)

export default router