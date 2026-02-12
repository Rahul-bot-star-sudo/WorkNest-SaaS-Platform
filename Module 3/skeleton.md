
# 📂 Project Structure

```
src/
 ├── workspace/
 │     ├── workspace.routes.js
 │     ├── workspace.controller.js
 │     ├── workspace.service.js
 │     ├── workspace.repository.js
 │
 ├── middlewares/
 │     ├── auth.middleware.js
 │     ├── role.middleware.js
 │
 ├── config/
 │     └── db.js
 │
 └── server.js
```

---

# 🟢 1️⃣ server.js

```js
const express = require("express");
const workspaceRoutes = require("./workspace/workspace.routes");

const app = express();

app.use(express.json());

// Mount routes
app.use("/api/workspaces", workspaceRoutes);

module.exports = app;
```

---

# 🟢 2️⃣ config/db.js

```js
// Setup PostgreSQL connection here

const db = {};

module.exports = db;
```

(Abhi empty object — baad me pg Pool add karna)

---

# 🟢 3️⃣ workspace/workspace.routes.js

```js
const express = require("express");
const router = express.Router();

const workspaceController = require("./workspace.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const allowRoles = require("../middlewares/role.middleware");

// Create workspace
router.post(
  "/",
  authMiddleware,
  allowRoles("ADMIN"),
  workspaceController.createWorkspace
);

// Get all workspaces
router.get(
  "/",
  authMiddleware,
  allowRoles("ADMIN"),
  workspaceController.getWorkspaces
);

// Get workspace types
router.get(
  "/types",
  authMiddleware,
  workspaceController.getWorkspaceTypes
);

module.exports = router;
```

---

# 🟢 4️⃣ workspace/workspace.controller.js

```js
const workspaceService = require("./workspace.service");

exports.createWorkspace = async (req, res) => {
  try {
    // 1. Validate request
    // 2. Extract body
    // 3. Call service

    res.json({ message: "Create workspace controller hit" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getWorkspaces = async (req, res) => {
  try {
    res.json({ message: "Get workspaces controller hit" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.getWorkspaceTypes = async (req, res) => {
  try {
    res.json({ message: "Get workspace types controller hit" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
```

---

# 🟢 5️⃣ workspace/workspace.service.js

```js
const workspaceRepository = require("./workspace.repository");

exports.createWorkspace = async (data) => {
  // 1. Insert workspace
  // 2. Insert workspace_users
  // 3. Return result

  return "Service layer createWorkspace executed";
};

exports.getWorkspaces = async () => {
  return "Service layer getWorkspaces executed";
};

exports.getWorkspaceTypes = async () => {
  return "Service layer getWorkspaceTypes executed";
};
```

---

# 🟢 6️⃣ workspace/workspace.repository.js

```js
const db = require("../config/db");

exports.insertWorkspace = async (workspaceData) => {
  // SQL insert query
};

exports.insertWorkspaceUser = async (workspaceId, userId) => {
  // SQL insert query
};

exports.fetchWorkspaces = async () => {
  // SQL select query
};

exports.fetchWorkspaceTypes = async () => {
  // SQL select query
};
```

---

# 🟢 7️⃣ middlewares/auth.middleware.js

```js
module.exports = (req, res, next) => {
  // 1. Verify JWT
  // 2. Attach user to req

  next();
};
```

---

# 🟢 8️⃣ middlewares/role.middleware.js

```js
const allowRoles = (...roles) => {
  return (req, res, next) => {
    // Check req.user.role
    // If not allowed → return 403

    next();
  };
};

module.exports = allowRoles;
```

---

# 🎯 Ab Kya Hoga?

Agar tum:

* JWT logic fill karo
* Service me repository call karo
* Repository me SQL likho

Toh pura feature run karega.

Architecture already ready hai 💯

---

# 🔥 Important

Ye structure:

* Clean hai
* Scalable hai
* Interview-ready hai
* Microservice friendly hai

---

