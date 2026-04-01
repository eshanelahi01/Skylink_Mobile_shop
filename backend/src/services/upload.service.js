import { v2 as cloudinary } from "cloudinary";
import { env } from "../config/env.js";

cloudinary.config({
  cloud_name: env.cloudinary.cloudName,
  api_key: env.cloudinary.apiKey,
  api_secret: env.cloudinary.apiSecret
});

export const uploadImage = async (file) => {
  if (!env.cloudinary.cloudName) {
    return {
      url: `https://placehold.co/1200x1200/111827/e5e7eb?text=${encodeURIComponent(file.originalname)}`
    };
  }

  const result = await cloudinary.uploader.upload(file.path, {
    folder: "skylink-mobile-shop"
  });

  return { url: result.secure_url };
};
