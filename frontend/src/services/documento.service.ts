import { api } from "./api";
import type { Documento } from "../types/documento.types";
import type { DocumentoDetalle } from "../types/documento.types";

export const documentoService = {
    async obtenerPorProyecto(proyectoId: number): Promise<Documento[]> {
        const { data } = await api.get<Documento[]>("/documento", {
            params: { proyecto_id: proyectoId },
        });

        return data;
    },

    async obtenerPorId(
        documentoId: number,
        proyectoId: number,
    ): Promise<DocumentoDetalle> {
        const { data } = await api.get<DocumentoDetalle>(
            `/documento/${documentoId}`,
            { params: { proyecto_id: proyectoId } },
        );

        return data;
    },
};