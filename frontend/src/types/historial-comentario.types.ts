export interface HistorialComentario {

  id_historial_comentario: number;

  fecha_movimiento: string;

  observacion: string | null;

  usuario: {

    nombre_usuario: string;

  };

  estado_comentario_historial_comentario_estado_anterior_idToestado_comentario?: {

    nombre_estado: string;

  };

  estado_comentario_historial_comentario_estado_nuevo_idToestado_comentario: {

    nombre_estado: string;

  };

}