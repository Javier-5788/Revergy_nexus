import { Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import DashboardPage from "../pages/dashboard/DashboardPage";
import DocumentoListPage from "../pages/documentos/DocumentoListPage";
import MisProyectosPage from "../pages/proyectos/MisProyectosPage";

export default function LayoutRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<MisProyectosPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/documentos" element={<DocumentoListPage />} />
      </Route>
    </Routes>
  );
}