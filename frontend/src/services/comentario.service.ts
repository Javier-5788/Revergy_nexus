import { api } from "./api";

import type {
  ComentarioDocumento,
} from "../types/comentario.types";

export const comentarioService = {

  async obtenerPorDocumento(
    documentoId: number,
  ) {

    const response =
      await api.get<
        ComentarioDocumento[]
      >(
        `/comentario-documento/documento/${documentoId}`,
      );

    return response.data;

  },

};