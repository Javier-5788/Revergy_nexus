import { api } from "./api";

export interface ResumenProyecto {

  totalDocumentos: number;

  documentosAbiertos: number;

  documentosCerrados: number;

  documentosVencidos: number;

  documentosPendientesEntrega: number;

  comentariosAbiertos: number;

  comentariosAtendidos: number;

  comentariosCerrados: number;

  tmtEmitidos: number;

  tmtRecibidos: number;

}

export const dashboardService = {
  async obtenerResumen(proyectoId: number): Promise<ResumenProyecto> {
    const { data } = await api.get<ResumenProyecto>(
      `/proyecto/${proyectoId}/resumen`,
    );

    return data;
  },
};