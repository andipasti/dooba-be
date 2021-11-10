import { validationResult } from "express-validator";

export const runValidators = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return next(errors.array()[0].msg)

  next()
}