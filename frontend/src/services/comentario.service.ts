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

  async crearComentario(
    payload: {
      documento_id: number;
      usuario_id: number;
      mensaje: string;
      archivo_adjunto?: string;
    },
  ) {
    const response =
      await api.post(
        "/comentario-documento",
        payload,
      );

    return response.data;
  },

  async atenderComentario(
    comentarioId: number,
    usuarioId: number,
  ) {
    const response =
      await api.patch(
        `/comentario-documento/${comentarioId}/atender`,
        {
          usuario_id: usuarioId,
        },
      );

    return response.data;
  },

  async cerrarComentario(
    comentarioId: number,
    usuarioId: number,
  ) {
    const response =
      await api.patch(
        `/comentario-documento/${comentarioId}/cerrar`,
        {
          usuario_id: usuarioId,
        },
      );

    return response.data;
  },

};