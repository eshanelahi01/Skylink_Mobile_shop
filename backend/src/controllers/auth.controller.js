import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/User.js";
import { RefreshToken } from "../models/RefreshToken.js";
import { ApiError } from "../utils/apiError.js";
import { signAccessToken, signRefreshToken, verifyRefreshToken } from "../utils/tokens.js";

const buildAuthPayload = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  branchId: user.branchId
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.validated.body;
  const user = await User.findOne({ email }).populate("branchId");

  if (!user || !user.isActive) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid credentials");
  }

  const passwordMatches = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatches) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid credentials");
  }

  user.lastLogin = new Date();
  await user.save();

  const tokenPayload = { userId: user._id, role: user.role, branchId: user.branchId?._id || null };
  const accessToken = signAccessToken(tokenPayload);
  const refreshToken = signRefreshToken(tokenPayload);

  await RefreshToken.create({
    userId: user._id,
    token: refreshToken,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  });

  res.json({ accessToken, refreshToken, user: buildAuthPayload(user) });
});

export const refresh = asyncHandler(async (req, res) => {
  const token = req.body.refreshToken;
  if (!token) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Refresh token is required");
  }

  const existing = await RefreshToken.findOne({ token });
  if (!existing) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Refresh token is invalid");
  }

  const decoded = verifyRefreshToken(token);
  const accessToken = signAccessToken({
    userId: decoded.userId,
    role: decoded.role,
    branchId: decoded.branchId
  });

  res.json({ accessToken });
});

export const logout = asyncHandler(async (req, res) => {
  const token = req.body.refreshToken;
  if (token) {
    await RefreshToken.deleteOne({ token });
  }
  res.status(StatusCodes.NO_CONTENT).send();
});

export const me = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});
