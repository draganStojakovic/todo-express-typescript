import express from "express";
import { logger } from "./middleware/logger";
import { todoRoute } from "./routes/api";
import cors from "cors";

const createApp = () => {
  const app = express();
  app.use(express.json());
  app.use(logger);
  app.use(cors());
  app.use("/api", todoRoute);
  return app;
};

export default createApp;
