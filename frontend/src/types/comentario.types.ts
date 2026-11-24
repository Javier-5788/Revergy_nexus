export interface ComentarioDocumento {

  id_com_doc: number;

  mensaje: string;

  fecha: string;

  estado_comentario?: {

    id_estado_comentario: number;

    nombre_estado: string;

    codigo_estado: string;

  };

  usuario?: {

    id_usuario: number;

    nombre_usuario: string;

  };

}
