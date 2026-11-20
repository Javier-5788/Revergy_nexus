import { api } from "./api";
import type {
  ProyectoActivo,
  ProyectoAsignado,
} from "../types/proyecto.types";

export const proyectoService = {
  async obtenerMisProyectos(): Promise<ProyectoAsignado[]> {
    const { data } = await api.get<ProyectoAsignado[]>("/auth/mis-proyectos");
    return data;
  },

  async seleccionarProyecto(id: number): Promise<ProyectoActivo> {
    const { data } = await api.post<ProyectoActivo>(
      "/auth/seleccionar-proyecto",
      { proyecto_id: id },
    );
    return data;
  },
};