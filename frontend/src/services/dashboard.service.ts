import { api } from "./api";

export interface ResumenProyecto {
  totalDocumentos: number;
  comentariosAbiertos: number;
  comentariosAtendidos: number;
  totalTmt: number;
}

export const dashboardService = {
  async obtenerResumen(proyectoId: number): Promise<ResumenProyecto> {
    const { data } = await api.get<ResumenProyecto>(
      `/proyecto/${proyectoId}/resumen`,
    );

    return data;
  },
};