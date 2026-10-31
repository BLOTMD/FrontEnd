import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/sideBar/sideBar";

function MainLayout() {
  const location = useLocation();
  const mostrarSidebar = location.pathname === "/loja";

  return (
    <div style={{ display: "flex" }}>
      {mostrarSidebar && <Sidebar />}

      <main style={{ flex: 1, padding: "24px" }}>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;
