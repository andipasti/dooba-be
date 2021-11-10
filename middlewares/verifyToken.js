import jwt from 'jsonwebtoken'
import { asyncHandler } from "./async";
import { NOT_AUTHORIZED, AUTHORIZATION_DENIED } from "../constants/errorTypes";

export const verifyToken = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers;
  const token = authHeader.authorization && authHeader.authorization.split(" ")[1];
  if (!token) return next(NOT_AUTHORIZED)

  await jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(AUTHORIZATION_DENIED)

    req.user = { email: user.email, userId: user.userId };
    next();
  });
});