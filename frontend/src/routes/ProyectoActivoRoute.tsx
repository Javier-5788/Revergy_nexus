import { Navigate, Outlet } from "react-router-dom";
import { useProyecto } from "../context/ProyectoContext";

export default function ProyectoActivoRoute() {
  const { proyectoActivo } = useProyecto();

  return proyectoActivo ? <Outlet /> : <Navigate to="/" replace />;
}