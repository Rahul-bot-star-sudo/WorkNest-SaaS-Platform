import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import LoginPage from "./pages/Login";
import DashboardLayout from "./layout/DashboardLayout";
import DashboardHome from "./pages/Dashboard";
import CreateUserPage from "./pages/CreateUserPage";
import RegisterUser from "./pages/RegisterUser";

import ProtectedRoute from "./auth/ProtectedRoute";
import RoleRoute from "./auth/RoleRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

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
