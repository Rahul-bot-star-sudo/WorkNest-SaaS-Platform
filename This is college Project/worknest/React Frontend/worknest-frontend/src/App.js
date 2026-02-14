import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/Login";
import DashboardLayout from "./layout/DashboardLayout";
import DashboardHome from "./pages/Dashboard";
import CreateUserPage from "./pages/CreateUserPage";
import RegisterUser from "./pages/RegisterUser";
import UsersPage from "./pages/UsersPage";
import WorkspaceListPage from './pages/WorkspaceListPage';
import CreateWorkspacePage from './pages/CreateWorkspacePage';
import WorkspaceProjects from "./pages/WorkspaceProjects";

import ProtectedRoute from "./auth/ProtectedRoute";
import RoleRoute from "./auth/RoleRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

<Route path="/workspace/:id" element={<WorkspaceProjects />} />

        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login */}
        <Route path="/login" element={<LoginPage />} />

        {/* Dashboard Layout (Protected) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />

          <Route path="create-user" element={<CreateUserPage />} />
          <Route path="users" element={<UsersPage />} />

          {/* Workspace Routes inside Layout */}
          <Route path="workspaces" element={<WorkspaceListPage />} />
          <Route path="workspaces/create" element={<CreateWorkspacePage />} />

        </Route>

        {/* Register (Role Based) */}
        <Route
          path="/register"
          element={
            <ProtectedRoute>
              <RoleRoute allowedRoles={["SUPER_ADMIN", "ADMIN"]}>
                <RegisterUser />
              </RoleRoute>
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
