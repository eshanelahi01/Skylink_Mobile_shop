import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import branchRoutes from "./routes/branch.routes.js";
import siteRoutes from "./routes/site.routes.js";
import salesRoutes from "./routes/sales.routes.js";
import purchaseRoutes from "./routes/purchase.routes.js";
import inquiryRoutes from "./routes/inquiry.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import reportRoutes from "./routes/report.routes.js";
import { errorHandler, notFound } from "./middleware/error.js";
import { env } from "./config/env.js";

export const app = express();

app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(helmet());
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "skylink-mobile-shop-api" });
});

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/branches", branchRoutes);
app.use("/api/site", siteRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/purchases", purchaseRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", reportRoutes);
app.use(notFound);
app.use(errorHandler);
