import asyncHandler from "express-async-handler";
import { StatusCodes } from "http-status-codes";
import { verifyAccessToken } from "../utils/tokens.js";
import { User } from "../models/User.js";
import { ApiError } from "../utils/apiError.js";

export const protect = asyncHandler(async (req, _res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
  if (!token) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Authentication required");
  }

  const decoded = verifyAccessToken(token);
  const user = await User.findById(decoded.userId).select("-passwordHash");
  if (!user || !user.isActive) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "User access is not active");
  }

  req.user = user;
  next();
});

export const authorize = (...roles) => (req, _res, next) => {
  if (!roles.includes(req.user.role)) {
    throw new ApiError(StatusCodes.FORBIDDEN, "You are not allowed to access this resource");
  }
  next();
};
