import { api } from "./api";

import type {
  HistorialComentario,
} from "../types/historial-comentario.types";

export const historialComentarioService = {

  async obtenerPorComentario(
    comentarioId: number,
  ) {

    const response =
      await api.get<
        HistorialComentario[]
      >(
        `/historial-comentario/comentario/${comentarioId}`,
      );

    return response.data;

  },

};