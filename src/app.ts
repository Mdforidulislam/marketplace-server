import express, { NextFunction, Request, Response } from "express";
import cors from 'cors'
import { userRoutes } from "./modules/user/user.routes";
import { authRouter } from "./modules/auth/auth.routes";
import { marketplaceRoutes } from "./modules/market_place/marketplace.routes";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, 
  })
);

// user route
app.use("/api/v1",userRoutes);
// authentication route 
app.use("/api/v1",authRouter);

// marketplace route
app.use("/api/v1", marketplaceRoutes);

// Catch-all for undefined routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
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
