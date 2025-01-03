import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { userRoutes } from "./modules/user/user.routes";
import { authRouter } from "./modules/auth/auth.routes";
import { marketplaceRoutes } from "./modules/market_place/marketplace.routes";

const app = express();

app.use(express.json());
app.use(cookieParser());

const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));


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
