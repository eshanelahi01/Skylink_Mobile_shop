import asyncHandler from "express-async-handler";
import { SiteSettings } from "../models/SiteSettings.js";

export const getSiteSettings = asyncHandler(async (_req, res) => {
  const settings = await SiteSettings.findOne();
  res.json(settings);
});

export const updateSiteSettings = asyncHandler(async (req, res) => {
  const settings = await SiteSettings.findOneAndUpdate({}, req.body, { new: true, upsert: true });
  res.json(settings);
});
