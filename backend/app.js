import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./config/db.js";
import authRoutes from "./route/auth.routes.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;

const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://mansha-new.vercel.app",
  "https://www.manshagroup.in",
  "https://manshagroup.in",
  "https://www.manshagroup.com",
  "https://manshagroup.com",
  process.env.FRONTEND_URL,
].filter(Boolean);

const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;
  return /^https:\/\/[\w-]+\.vercel\.app$/.test(origin);
};

const corsOptions = {
  origin(origin, callback) {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
      return;
    }

    callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 204,
};

// CORS first so preflight always gets headers, even if later middleware fails.
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get("/", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "Mansha API is running",
  });
});

app.get("/health", (_req, res) => {
  res.status(200).json({ success: true, status: "ok" });
});

app.use("/api", authRoutes);
app.use("/uploads", express.static("uploads"));

app.use((err, _req, res, next) => {
  if (err?.message?.startsWith("CORS blocked")) {
    res.status(403).json({
      success: false,
      message: err.message,
    });
    return;
  }
  next(err);
});

// Do not block port binding on MongoDB — Render cold starts fail if listen is delayed.
connectDB();

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
