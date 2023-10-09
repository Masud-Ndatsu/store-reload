import express from "express";
import morgan from "morgan";
import cors from "cors";
import compression from "compression";
import connectDB from "./db/connection.js";
import { handle404, handleError } from "./middlewares/error.middlewares.js";
import appRoutes from "./routes/app/index.js";
import adminRoutes from "./routes/admin/index.js";
import limiter from "./middlewares/rate-limiter.js";
import config from "./config/index.js";
import { swaggerDocs } from "./swagger/index.js";
const app = express();

// Connect DB
connectDB();
// Swagger Docs
swaggerDocs(app, config.app.PORT);

app.use(express.json({ limit: "10kb" })); // This would limit the body size to 10kb
app.use(express.urlencoded({ extended: true, limit: "10kb" })); // This would limit the body size to 10kb
app.use(cors());
app.use(compression());
app.set("trust proxy", 1);
app.use(morgan(process.env.NODE_ENV === "prod" ? "combined" : "dev"));
app.use(limiter);
app.use("/api/v1/customer", appRoutes);
app.use("/api/v1/admin", adminRoutes);

app.use(handleError);
app.use(handle404);

export default app;
