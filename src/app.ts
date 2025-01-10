import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRoutes } from "./modules/user/user.routes";
import { authRouter } from "./modules/auth/auth.routes";
import { marketplaceRoutes } from "./modules/market_place/marketplace.routes";
import { intitalizeJobs } from "./job/main.job";

const app = express();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: 'https://marketplace-client-delta.vercel.app',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// cron - job handle 
intitalizeJobs();

// Routes
app.use("/api/v1", userRoutes);
app.use("/api/v1", authRouter);
app.use("/api/v1", marketplaceRoutes);
app.use("/api/v1", marketplaceRoutes);
app.use("/api/v1", marketplaceRoutes);

// Catch-all for undefined routes
app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Resource not found",
    error: {
      method: req.method,
      url: req.originalUrl,
    },
  });
});

export default app;
