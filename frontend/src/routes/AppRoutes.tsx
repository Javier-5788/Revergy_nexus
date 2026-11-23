import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import LoginPage from "../pages/auth/LoginPage";
import ComentariosPage from "../pages/comentarios/ComentariosPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import DocumentoListPage from "../pages/documentos/DocumentoListPage";
import MisProyectosPage from "../pages/proyectos/MisProyectosPage";
import TmtPage from "../pages/tmt/TmtPage";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import ProyectoActivoRoute from "./ProyectoActivoRoute";
import DocumentoDetallePage from "../pages/documentos/DocumentoDetallePage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route element={<MainLayout />}>
            <Route index element={<MisProyectosPage />} />
            <Route element={<ProyectoActivoRoute />}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="documentos" element={<DocumentoListPage />} />
              <Route path="comentarios" element={<ComentariosPage />} />
              <Route path="tmt" element={<TmtPage />} />
              <Route path="documentos/:id" element={<DocumentoDetallePage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}