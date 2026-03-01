require("dotenv").config();

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const workspaceRoutes = require("./src/modules/workspace/workspace.routes");
const taskRoutes = require("./src/modules/task/task.routes");
const activityRoutes = require("./src/modules/activity/activity.routes");
const companyRoutes = require("./src/modules/company/company.routes");

const roleRoutes = require("./src/modules/role/role.routes");
const userRoutes = require("./src/modules/user/user.routes");
const authRoutes = require("./src/routes/auth.routes");
const setupRoutes = require("./src/routes/setup.routes");
const projectRoutes = require("./src/modules/project/project.routes");

const app = express();   // 🔥 पहले app बनाओ
console.log("🔥 APP FILE LOADED");

/* ✅ CORS */
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

/* ✅ JSON parser */
app.use(express.json());

/* ✅ Cookie parser */
app.use(cookieParser());   // 🔥 यहाँ move करो

app.use("/api/companies", companyRoutes);
/* ✅ Routes */
app.use("/api/roles", roleRoutes);
app.use("/api/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/setup", setupRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/projects", projectRoutes);

app.use("/api/activity", activityRoutes);
/* ✅ Health check */
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
