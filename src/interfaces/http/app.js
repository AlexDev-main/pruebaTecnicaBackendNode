import routes from "./routes/index";
import express from "express";

const app = express();

app.use(express.json());

app.use("/api", routes);

app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

export default app;