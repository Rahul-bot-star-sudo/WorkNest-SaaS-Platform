import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/Login";
import DashboardLayout from "./layout/DashboardLayout";
import DashboardHome from "./pages/Dashboard";
import CreateUserPage from "./pages/CreateUserPage";
import RegisterUser from "./pages/RegisterUser";
import UsersPage from "./pages/UsersPage";
import WorkspaceListPage from "./pages/WorkspaceListPage";
import CreateWorkspacePage from "./pages/CreateWorkspacePage";
import WorkspaceProjects from "./pages/WorkspaceProjects";
import CreateCompany from "./pages/CreateCompany";
import CompanyList from "./pages/CompanyList";
import ProtectedRoute from "./auth/ProtectedRoute";
import RoleRoute from "./auth/RoleRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginPage />} />
        
        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="create-company" element={<CreateCompany />} />
          <Route path="companies" element={<CompanyList />} />
          <Route path="create-user" element={<CreateUserPage />} />
          <Route path="users" element={<UsersPage />} />
          <Route path="workspaces" element={<WorkspaceListPage />} />
          <Route path="workspaces/create" element={<CreateWorkspacePage />} />
          <Route path="workspace/:id" element={<WorkspaceProjects />} />
        </Route>

        {/* Register Route */}
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

        {/* Default Redirect */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;