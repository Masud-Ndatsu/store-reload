import express from "express";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import connectDB from "./db/connection.js";
import { handle404, handleError } from "./middlewares/error.middlewares.js";
import appRoutes from "./routes/app/index.js";
import adminRoutes from "./routes/admin/index.js";
import limiter from "./middlewares/rate-limiter.js";
const app = express();

// Connect DB
connectDB();

if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
} else if (process.env.NODE_ENV === "prod") {
  app.use(morgan("common"));
}

app.set("trust-proxy", true);
app.use(cors());
app.use(compression());
app.use(express.json({ limit: "10kb" })); // This would limit the body size to 10kb
app.use(express.urlencoded({ extended: true, limit: "10kb" })); // This would limit the body size to 10kb
app.use(limiter);
app.use("/api/v1/app/", appRoutes);
app.use("/api/v1/admin/", adminRoutes);
app.use(handleError);
app.use(handle404);

export default app;
