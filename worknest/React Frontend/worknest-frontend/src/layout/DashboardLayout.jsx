import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";

function DashboardLayout() {
  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Content Area */}
      <div style={{ padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
