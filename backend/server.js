import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import tasksRoutes from "./routes/task.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/tasks", tasksRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log("servers started at local host:" + PORT);
});
