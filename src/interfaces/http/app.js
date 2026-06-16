import express from "express";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { setupSwagger } from "../../docs/swagger.js";

const app = express();

app.use(express.json());

setupSwagger(app);

app.use("/api", routes);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

app.use(errorHandler);

export default app;