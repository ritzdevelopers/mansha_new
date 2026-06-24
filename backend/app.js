import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./route/auth.routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

// Database Connection
connectDB();

// Middlewares
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000","https://mansha-backend-dxti.onrender.com"],
    credentials: true,
  })
);

// Routes
app.use("/api", authRoutes);
app.use("/uploads", express.static("uploads"));

// Server Start
app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});