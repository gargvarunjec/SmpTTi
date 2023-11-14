import { errorHandler } from "./error.js";
import jwt from "jsonwebtoken";

export const verifyUser = (req, res, next) => {
  const token = req.cookies.Token;

  if (!token) return next(errorHandler(401, "Unauthorised User"));

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(401, "Forbidden"));

    req.user = user;
    next();
  });
};
