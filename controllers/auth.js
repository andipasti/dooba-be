import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../middlewares/async";
import { createTeamMember, createUser, getTeamMemberByEmail, getUserByEmail } from "../services/DBService"
import {
  USER_NOT_FOUND,
  USER_EXIST,
  EMAIL_PASSWORD_WRONG,
  CHANGE_PASSWORD_WITH_TOKEN_ERROR,
} from "../constants/errorTypes";

export const register = asyncHandler(async (req, res, next) => {
  const { email, password, name, token } = req.body;

  if (token) {
    return res.redirect(307, "register-by-invite")
  }

  const candidate = await getUserByEmail(email);
  if (candidate) return next(USER_EXIST);

  let teamMember = await getTeamMemberByEmail(email)

  const hashedPassword = await bcrypt.hash(password, 12);
  const user = await createUser(email, hashedPassword, name);

  if (!teamMember) {
    teamMember = await createTeamMember({ email, user: user._id })
  }

  user.team = teamMember.team
  await user.save()

  const { __v, password: p, ...data } = user.toObject();
  data.role = teamMember.role

  const jwtToken = jwt.sign({ userId: user.id, email }, process.env.JWT_SECRET, { expiresIn: "24h" });
  res.send({ user: data, token: jwtToken });
});

export const login = asyncHandler( async (req, res, next) => {
  const { email, password } = req.body;

  const user = await getUserByEmail(email);
  if (!user) return next(USER_NOT_FOUND);

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return next(EMAIL_PASSWORD_WRONG);

  const teamMember = await getTeamMemberByEmail(email)

  const { __v, password: p, projects, ...data } = user.toObject();
  data.role = teamMember.role

  const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET,{ expiresIn: "24h" });
  res.send({ user: data, token });
});

export const silentLogin = async (req, res, next) => {
  const { email } = req.user;

  const user = await getUserByEmail(email);
  if (!user) return next(USER_NOT_FOUND);

  const teamMember = await getTeamMemberByEmail(email)

  const { __v, password: p, projects, ...data } = user.toObject();
  data.role = teamMember.role

  res.send(data)
}

export const registerByInvite = asyncHandler(async (req, res, next) => {
  const { name, password, token } = req.body

  await jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
    if (err) return next(CHANGE_PASSWORD_WITH_TOKEN_ERROR)

    const candidate = await getUserByEmail(user.email);
    if (candidate) return next(USER_EXIST);

    const teamMember = await getTeamMemberByEmail(user.email)
    if (!teamMember) return next(USER_NOT_FOUND)

    const hashedPassword = await bcrypt.hash(password, 12);

    const new_user = await createUser(name, hashedPassword, teamMember.email)

    const { __v, password: p, ...data } = new_user.toObject();
    data.role = teamMember.role

    const token = jwt.sign({ userId: user.id, email: teamMember.email }, process.env.JWT_SECRET, { expiresIn: "24h" });
    res.send({ user: data, token });
  });
})
